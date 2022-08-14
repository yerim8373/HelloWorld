import { useState, useRef } from 'react'

import {
  BsFillMicFill,
  BsFillMicMuteFill,
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
  BsStopwatch,
} from 'react-icons/bs'
import classes from './VideoControlBtns.module.css'

import Button from '../common/Button'

import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ovActions } from '../../store/ov-slice'
import { useNavigate } from 'react-router-dom'
import { leaveRoom } from '../../store/room-thunkActions'

const VideoControlBtns = ({ onLeaveSession, onToggleDevice, devices }) => {
  const [mic, setMic] = useState(true)
  const [camera, setCamera] = useState(false)
  const [minutes, setMinutes] = useState(2)
  const [seconds, setSeconds] = useState(30)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(state => state.auth)
  const room = useSelector(state => state.room)
  const openvidu = useSelector(state => state.openvidu)

  useEffect(() => {
    onToggleDevice(mic, camera)
  }, [mic, camera])

  // 마이크 설정 로직
  const toggleMicHandler = () => setMic(prevMic => !prevMic)

  // 비디오 설정 로직
  const toggleCameraHandler = () => setCamera(prevCamera => !prevCamera)

  const reMatchingUserHandler = () => {
    dispatch(leaveRoom({ roomId: room.roomId }))
    dispatch(ovActions.leaveSession())
    window.location.replace('/meeting?rematching=true')
    // navigate('/meeting', { state: { reMatching: true } })
  }

  const exitRoomHandler = () => {
    dispatch(leaveRoom({ roomId: room.roomId }))
    dispatch(ovActions.leaveSession())
    window.location.replace('/meeting')
  }

  let openvidu_timer_minites = useRef()
  let openvidu_timer_seconds = useRef()
  // 시계 카운트
  useEffect(() => {
    // timer 로직 요약 설명
    // 생성자 -> 입장자 이루어지는 단방향 로직 설정
    // timer는 방 생성자가 연산하고 관리한다.
    // 방 생성자는 1초마다 연산한 timer를 제공
    // 방 입장자는 1초마다 제공되는 timer를 렌더링만 해야한다.

    // 방 생성자용 timer 설정
    const countdown = setInterval(() => {
      if (room.isCreatedRoom) {
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1)
        }
        if (parseInt(seconds) === 0) {
          if (parseInt(minutes) === 0) {
            exitRoomHandler()
            clearInterval(countdown)
          } else {
            setMinutes(parseInt(minutes) - 1)
            setSeconds(59)
          }
        }

        const data = {
          minutes: minutes,
          seconds: seconds,
        }

        openvidu_timer_minites.current.textContent = minutes
        openvidu_timer_seconds.current.textContent =
          seconds < 10 ? `0${seconds}` : seconds

        openvidu.publisher.session.signal({
          data: JSON.stringify(data),
          type: 'timer',
        })
      } else {
        // 방 입장자용 timer 렌더 설정
        openvidu.session.on('signal:timer', event => {
          const data = JSON.parse(event.data)
          const { minutes, seconds } = data
          openvidu_timer_minites.current.textContent = minutes
          openvidu_timer_seconds.current.textContent =
            seconds < 10 ? `0${seconds}` : seconds
          if (parseInt(minutes) === 0 && parseInt(seconds) <= 1) {
            exitRoomHandler()
            clearInterval(countdown)
          }
        })
      }
    }, 1000)
    return () => clearInterval(countdown)
  }, [minutes, seconds])

  // useEffect(() => {
  //   if (openvidu.publisher) {
  //     openvidu.session.on('signal:chat', event => {
  //       const data = JSON.parse(event.data)
  //       messageList.push({
  //         connectionId: event.from.connectionId,
  //         nickname: data.nickname,
  //         message: data.message,
  //       })
  //       setChat(prev => ({ ...prev, messageList }))
  //       scrollToBottom()
  //     })
  //   }
  // }, [messageList])

  return (
    <div className={`flex_row_space_evenly ${classes.btns_wrapper}`}>
      <div>
        <span onClick={toggleMicHandler} className={classes.icon}>
          {mic ? <BsFillMicFill /> : <BsFillMicMuteFill />}
        </span>
        <span onClick={toggleCameraHandler} className={classes.icon}>
          {camera ? <BsFillCameraVideoFill /> : <BsFillCameraVideoOffFill />}
        </span>
        <span className={classes.icon}>
          <BsStopwatch />
        </span>
        <span className={classes.timer}>
          <span ref={openvidu_timer_minites}></span>
          <span> : </span>
          <span ref={openvidu_timer_seconds}></span>
        </span>
      </div>

      <div className={`flex_row ${classes.matching_event}`}>
        <Button
          size="small"
          text="다음으로"
          onEvent={reMatchingUserHandler}
        ></Button>
        <Button
          size="small"
          color="error"
          text="나가기"
          onEvent={exitRoomHandler}
        ></Button>
      </div>
    </div>
  )
}

VideoControlBtns.propTypes = {
  onLeaveSession: PropTypes.func,
  onToggleDevice: PropTypes.func,
  devices: PropTypes.object,
}

export default VideoControlBtns
