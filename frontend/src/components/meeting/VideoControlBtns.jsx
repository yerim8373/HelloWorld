import { useState } from 'react'

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
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(30)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(state => state.auth)
  const room = useSelector(state => state.room)

  useEffect(() => {
    onToggleDevice(mic, camera)
  }, [mic, camera])

  // 마이크 설정 로직
  const toggleMicHandler = () => setMic(prevMic => !prevMic)

  // 비디오 설정 로직
  const toggleCameraHandler = () => setCamera(prevCamera => !prevCamera)

  const reMatchingUserHandler = async () => {
    await dispatch(leaveRoom({ accessToken: auth.token, roomId: room.roomId }))
    dispatch(ovActions.leaveSession())
    navigate('/meeting', { state: { reMatching: true } })
  }

  const exitRoomHandler = () => {
    dispatch(leaveRoom({ roomId: room.roomId }))
    dispatch(ovActions.leaveSession())
    window.location.replace('/meeting')
  }

  // 시계 카운트
  useEffect(() => {
    const countdown = setInterval(() => {
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
    }, 1000)
    return () => clearInterval(countdown)
  }, [minutes, seconds])

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
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
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
