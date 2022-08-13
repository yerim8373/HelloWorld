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
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector(state => state.auth)
  const room = useSelector(state => state.room)

  // useEffect(() => {
  //   onToggleDevice(mic, camera)
  // }, [mic, camera])

  // 마이크 설정 로직
  const toggleMicHandler = () => {
    onToggleDevice(!mic, camera)
    setMic(prevMic => !prevMic)
  }

  // 비디오 설정 로직
  const toggleCameraHandler = () => {
    onToggleDevice(mic, !camera)
    setCamera(prevCamera => !prevCamera)
  }

  const reMatchingUserHandler = async () => {
    await dispatch(leaveRoom({ accessToken: auth.token, roomId: room.roomId }))
    dispatch(ovActions.leaveSession())
    navigate('/meeting', { state: { reMatching: true } })
  }

  const exitRoomHandler = () => {
    dispatch(leaveRoom({ roomId: room.roomId }))
    dispatch(ovActions.leaveSession())
    navigate('/meeting')
  }

  return (
    <div className={`flex_row_space_evenly ${classes.btns_wrapper}`}>
      <div>
        <span onClick={toggleMicHandler} className={classes.icon}>
          {mic ? <BsFillMicFill /> : <BsFillMicMuteFill />}
        </span>
        <span onClick={toggleCameraHandler} className={classes.icon}>
          {camera ? <BsFillCameraVideoFill /> : <BsFillCameraVideoOffFill />}
        </span>
      </div>
      <div>
        <span className={classes.icon}>
          <BsStopwatch />
        </span>
      </div>
      <div className={'flex_row'}>
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
