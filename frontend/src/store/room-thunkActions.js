import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// openvidu 시작전 룸 매칭을 해줘야 한다.
// 1.findRoom()을 실행한다.
// 2.룸이 존재하는 경우 : 룸이 있으며, 아직 방에 1명인 경우라면 해당 룸을 채우고 들어가면 된다.
// 3.룸이 존재하지 않는 경우 : 룸이 있으나 2명이 차지거나, 혹은 룸이 언어랑 맞지 않아 못들어간다면, 룸을 생성하여 들어간다.
// ex) user: 김싸피, languages : eng, jpn, kor 인 경우
// language가 eng이면서, 룸이 아직 1명인 곳을 찾는다. (시간은 한 일단 10초 정도, 찾는도중 누가 생성할 수 있으니, 또 보고 또 보고 또 탐색하자 (멀티 쓰레드로 가능한가? ))
// eng 방이 없다면, language가 eng || jpn이면서, 룸이 아직 1명인 곳을 찾는다. (동일하게 10초 정도)
// jpn 방이 없다면, language가 eng || jpn || kor 이면서, 룸이 아직 1명인 곳을 찾는다. (역시 동일하게 10초 정도)
// 30초를 경과 해도 없다면, 룸을 생성한다. (이때도 client는 여전히 loading 중)

// 4.룸을 찾거나, 룸을 만들어서 2명이 채워진 경우에 opnnvidu-server를 통해 비디오 렌더링과 채팅이 이루어지게 한다!

export const findRoom = createAsyncThunk('room/findRoom', async accessToken => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/room/quick`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.log(error)
    // console.log('방이 존재하지 않습니다!, 방을 생성합니다.')
  }
})

// export const makeRoom = createAsyncThunk('room/makeRoom', async accessToken => {
//   try {
//     const response = await axios.post(
//       `${process.env.REACT_APP_API_URL}/api/v1/make`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       },
//     )
//     return response.data
//   } catch (error) {
//     console.log(error)
//   }
// })

export const leaveRoom = createAsyncThunk(
  'room/leaveRoom',
  async ({ accessToken, roomId }) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/room/leave`,
        { roomId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
)
// export const login = createAsyncThunk('auth/login', async userData => {
//   try {
//     const response = await axios.post(
//       `${process.env.REACT_APP_API_URL}/api/v1/auth/signin`,
//       {
//         email: userData.email,
//         pw: userData.password,
//       },
//     )
//     return response.data
//   } catch (error) {
//     console.log(error)
//   }
// })

// export const validToken = createAsyncThunk('auth/validToken', async token => {
//   try {
//     const response = await axios.post(
//       `${process.env.REACT_APP_API_URL}/api/v1/auth/reissue`,
//       {
//         refreshToken: token,
//       },
//     )
//     return response.data
//   } catch (error) {
//     console.log(error)
//   }
// })
