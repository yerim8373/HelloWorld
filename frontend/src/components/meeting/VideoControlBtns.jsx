import { useState, useRef } from 'react'

import {
  BsFillMicFill,
  BsFillMicMuteFill,
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
  BsStopwatch,
  BsHeartFill,
  BsHeart,
} from 'react-icons/bs'
import classes from './VideoControlBtns.module.css'

import Button from '../common/Button'

import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ovActions } from '../../store/ov-slice'
import { useNavigate } from 'react-router-dom'
import { leaveRoom } from '../../store/room-thunkActions'
import { peerUserActions } from '../../store/peerUser-slice'
import Sheet from '../common/Sheet'
import { getMyHeart, heartEvent } from '../../store/user-thunkActions'

const VideoControlBtns = ({ onLeaveSession, onToggleDevice, devices }) => {
  const [mic, setMic] = useState(true)
  const [camera, setCamera] = useState(false)
  const [heart, setHeart] = useState(false)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(15)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(state => state.auth)
  const room = useSelector(state => state.room)
  const user = useSelector(state => state.user)
  const peerUser = useSelector(state => state.peerUser)
  const openvidu = useSelector(state => state.openvidu)

  useEffect(() => {
    onToggleDevice(mic, camera)
  }, [mic, camera])

  // 초기 설정

  // 방 입장자가 연장을 요청하는 경우 생성자의 시간을 채운다.

  useEffect(() => {
    if (room.isCreatedRoom) {
      openvidu.session.on('signal:restore', () => {
        setMinutes(5)
        setSeconds(0)
      })
    }
    if (openvidu.session) {
      openvidu.session.on('signal:rematching', event => {
        const timeEvent = setTimeout(() => {
          dispatch(leaveRoom({ roomId: room.roomId }))
          dispatch(ovActions.leaveSession())
          window.location.replace('/meeting?rematching=true')
        }, 2000)
        return () => clearInterval(timeEvent)
      })
    } else {
      // 세션 없이 여기까지 오는 것은 비정상적 접근으로 판단 강제 페이지 이동
      navigate('/meeting', { replace: true })
    }
  }, [])

  // 마이크 설정
  const toggleMicHandler = () => setMic(prevMic => !prevMic)

  // 비디오 설정
  const toggleCameraHandler = () => setCamera(prevCamera => !prevCamera)

  // 하트 설정
  const toggleHeartHandler = () => setHeart(prevHeart => !prevHeart)

  const reMatchingUserHandler = () => {
    openvidu.publisher.session.signal({
      type: 'rematching',
    })
    // dispatch(leaveRoom({ roomId: room.roomId }))
    dispatch(ovActions.leaveSession())
    window.location.replace('/meeting?rematching=true')
  }

  const exitRoomHandler = () => {
    openvidu.publisher.session.signal({
      type: 'rematching',
    })
    // dispatch(leaveRoom({ roomId: room.roomId }))
    dispatch(ovActions.leaveSession())
    window.location.replace('/meeting')
  }

  const restoreTimeHandler = () => {
    if (room.isCreatedRoom) {
      if (user.subscribe) {
        setMinutes(5)
        setSeconds(0)
      } else if (user.heart >= 5) {
        const heartData = {
          cnt: -5,
          fromUser: user.id,
          name: 'extention',
          route: 'extention',
          toUser: 1,
        }
        dispatch(heartEvent({ accessToken: auth.token, heartData }))
        dispatch(getMyHeart(auth.token))
        setMinutes(5)
        setSeconds(0)
      }
    } else {
      if (user.subscribe) {
        openvidu.publisher.session.signal({
          type: 'restore',
        })
      } else if (user.heart >= 5) {
        const heartData = {
          cnt: -5,
          fromUser: user.id,
          name: 'extention',
          route: 'extention',
          toUser: 1,
        }
        dispatch(heartEvent({ accessToken: auth.token, heartData }))
        dispatch(getMyHeart(auth.token))
        openvidu.publisher.session.signal({
          type: 'restore',
        })
      }
    }
  }

  let openvidu_timer_minites = useRef()
  let openvidu_timer_seconds = useRef()

  useEffect(() => {
    // timer 로직 요약 설명
    // 생성자 -> 입장자 이루어지는 단방향 로직 설정
    // timer는 방 생성자가 연산하고 관리한다.
    // 방 생성자는 1초마다 연산한 timer를 제공
    // 방 입장자는 1초마다 제공되는 timer를 렌더링만 해야한다.

    // 방 생성자용 timer 설정
    const countdown = setInterval(async () => {
      if (room.isCreatedRoom) {
        const data = {
          minutes: minutes,
          seconds: seconds,
        }

        openvidu_timer_minites.current.textContent = minutes
        openvidu_timer_seconds.current.textContent =
          seconds < 10 ? `0${seconds}` : seconds

        openvidu.publisher.session.signal({
          data: JSON.stringify(data),
          type: 'timerShare',
        })

        if (seconds >= 0) {
          setSeconds(seconds - 1)
        }
        if (seconds === 0) {
          if (minutes === 0) {
            if (heart) {
              const heartData = {
                cnt: 1,
                fromUser: user.id,
                name: 'like',
                route: 'like',
                toUser: peerUser.id,
              }
              await dispatch(heartEvent({ accessToken: auth.token, heartData }))
            }
            clearInterval(countdown)
            dispatch(ovActions.leaveSession())
            window.location.replace('/meeting?rematching=true')
          } else {
            setMinutes(parseInt(minutes) - 1)
            setSeconds(59)
          }
        }
      } else {
        // 방 입장자용 timer 렌더 설정
        openvidu.session.on('signal:timerShare', event => {
          const data = JSON.parse(event.data)

          openvidu_timer_minites.current.textContent = data.minutes
          openvidu_timer_seconds.current.textContent =
            data.seconds < 10 ? `0${data.seconds}` : data.seconds

          setMinutes(data.minutes)
          setSeconds(data.seconds)
        })

        if (minutes === 0 && seconds === 0) {
          if (heart) {
            const heartData = {
              cnt: 1,
              fromUser: user.id,
              name: 'like',
              route: 'like',
              toUser: peerUser.id,
            }
            dispatch(heartEvent({ accessToken: auth.token, heartData }))
          }
          clearInterval(countdown)
          dispatch(ovActions.leaveSession())
          window.location.replace('/meeting?rematching=true')
        }
      }
    }, 1000)
    return () => clearInterval(countdown)
  }, [minutes, seconds, heart])

  // 상대방이 방에서 떠나는 경우 나도 나가지도록

  return (
    <div className={`flex_row_space_between ${classes.btns_wrapper}`}>
      <Sheet>
        <div className={`flex_row_center ${classes.icons}`}>
          <span onClick={toggleHeartHandler} className={classes.icon}>
            {heart ? <BsHeartFill /> : <BsHeart />}
          </span>
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
          {user.subscribe || user.heart >= 5 ? (
            <Button
              size="small"
              text="시간연장"
              onEvent={restoreTimeHandler}
            ></Button>
          ) : (
            <Button size="small" text="시간연장" color="neutral"></Button>
          )}
        </div>
      </Sheet>
      <Sheet>
        <div className={`flex_row_center ${classes.matching_event}`}>
          <Button
            size="small"
            text="다음매칭"
            onEvent={reMatchingUserHandler}
          ></Button>
          <Button
            size="small"
            color="error"
            text="나가기"
            onEvent={exitRoomHandler}
          ></Button>
        </div>
      </Sheet>
    </div>
  )
}

VideoControlBtns.propTypes = {
  onLeaveSession: PropTypes.func,
  onToggleDevice: PropTypes.func,
  devices: PropTypes.object,
}

export default VideoControlBtns
