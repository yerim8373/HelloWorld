package com.ssafy.api.controller;

import com.ssafy.api.dto.RoomDto;
import com.ssafy.api.service.RoomService;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.common.util.RandomNumberUtil;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserLan;
import com.ssafy.db.repository.RoomRepository;
import com.ssafy.db.repository.UserLanRepository;
import com.ssafy.db.repository.UserRepository;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Api(value = "ROOM API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/room")
public class RoomController {

    private final int LIMIT = 2;
    private final RoomService roomService;
    private RoomRepository roomRepository;
    private UserRepository userRepository;
    private UserLanRepository userLanRepository;
    private JwtTokenUtil jwtTokenUtil;

    // 오픈비두 객체 SDK
    private OpenVidu openVidu;

    // 방 관리
    private Map<String, Integer> mapSessions = new ConcurrentHashMap<>();

    // 오픈비두 서버 관련 변수
    private String OPENVIDU_URL;
    private String SECRET;

    @Autowired
    public RoomController(RoomService roomService, @Value("${openvidu.url}") String openviduUrl, @Value("${openvidu.secret}") String secret) {
        this.roomService = roomService;
        this.SECRET = secret;
        this.OPENVIDU_URL = openviduUrl;
        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
    }

    @PostMapping("/quick")
    @ApiOperation(value = "빠른 시작을 할 때 사용", notes = "<strong>빠른 시작</strong>을 통해 선택한 종목의 방이 있으면 반환하고 없다면 새로 생성 후 토큰, 방이름, 게임종류, 닉네임 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "빠른 시작 성공"),
            @ApiResponse(code = 400, message = "input 오류"),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    // 아이디를 토큰에서 받아와서 유저 객체를 가져온다.
    public ResponseEntity<RoomDto> quickRoom(@RequestHeader("Authorization") String bearerToken) throws OpenViduJavaClientException, OpenViduHttpException {
        String email = jwtTokenUtil.getEmailFromBearerToken(bearerToken);
        User user = userRepository.findByEmail(email).get();

        List<RoomDto> rooms = roomService.findRoom();
        String language = null;

        /************ 참가할 방이 존재한다면 ************/
        // 돌면서 내 선호하는 언어와 겹치는 것이 있다
        if (!rooms.isEmpty()) {
            int max = LIMIT;
            String maxConnRoomId = null;

            // 방마다 참가할 수 있는지 확인
            for (RoomDto roomDto : rooms) {
                // 검색하는 방이 존재하지 않거나 인원초과일 경우
                if (this.mapSessions.get(roomDto.getRoomId()) == null || this.mapSessions.get(roomDto.getRoomId()) >= LIMIT) continue;

//                 유저 랭귀지 같은게 있는지 확인 하는 로직 필요
                List<UserLan> yourList = userLanRepository.findUserLanByEmailOrderByPriority(roomDto.getUserMake().getEmail());
                List<UserLan> myList = userLanRepository.findUserLanByEmailOrderByPriority(email);
                outer : for(UserLan yourUserLan : yourList){
                    for(UserLan myUserLan : myList){
                        if(yourUserLan.getLanguage().getLan().equals(myUserLan.getLanguage().getLan())){
                            language = myUserLan.getLanguage().getLan();
                            break outer;
                        }
                    }
                }
                if(language == null) continue;

                if (max > mapSessions.get(roomDto.getRoomId())) {
                    maxConnRoomId = roomDto.getRoomId();
                    break;
                }

            }

            // 참가할 수 있다면
            if (maxConnRoomId != null) {
                // 방 관리 map에 저장
                this.mapSessions.put(maxConnRoomId, 2);

                roomService.joinRoom(maxConnRoomId, email);

                return ResponseEntity.ok(roomService.getRoomDto(maxConnRoomId));
            }
        }

        /************ 참가할 방이 존재하지 않다면 ************/
        // 돌면서 내 선호하는 언어와 겹치는 것이 없다.
        // 방 번호 난수 생성
        String roomId = RandomNumberUtil.getRandomNumber();

        // 방 관리 map에 저장
        this.mapSessions.put(roomId, 1);

        // DB 저장
        roomService.makeRoom(roomId, email);

        return ResponseEntity.ok(roomService.getRoomDto(roomId));
    }

    @PutMapping("")
    @ApiOperation(value = "참가자가 방을 나갈 경우 사용", notes = "<strong>방 나가기</strong>를 통해 방 정보 OFF로 변경 및 방 관리 map에서 해당 정보 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "방 나가기 성공"),
            @ApiResponse(code = 400, message = "input 오류"),
            @ApiResponse(code = 401, message = "토큰 만료 or 토큰 없음 or 토큰 오류 -> 권한 인증 오류"),
            @ApiResponse(code = 404, message = "방 정보가 없습니다."),
            @ApiResponse(code = 500, message = "서버 에러")
    })
//    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity leaveRoom(@RequestBody RoomDto roomDto) {
        String roomId = roomDto.getRoomId();

        // 나가려는 방이 없다면
        if (this.mapSessions.get(roomId) == null || this.mapSessions.get(roomId) == null) {
//            throw new RoomNotFoundException(roomId);
            throw new RuntimeException();
        }

        int cnt = this.mapSessions.get(roomId);

        // 방 관리 map에서 삭제
        this.mapSessions.remove(roomId);

        roomRepository.deleteById(roomId);


        return new ResponseEntity<>(HttpStatus.OK);
    }
}
