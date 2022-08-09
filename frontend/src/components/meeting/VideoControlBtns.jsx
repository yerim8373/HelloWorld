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

const VideoControlBtns = ({ onLeaveSession, onToggleDevice, devices }) => {
  const [mic, setMic] = useState(true)
  const [camera, setCamera] = useState(true)

  useEffect(() => {
    onToggleDevice(mic, camera)
  }, [mic, camera])

  // 마이크 설정 로직
  const toggleMicHandler = () => {
    setMic(prevMic => !prevMic)
  }

  // 비디오 설정 로직
  const toggleCameraHandler = () => {
    setCamera(prevCamera => !prevCamera)
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
          onEvent={() => onLeaveSession(true)}
        ></Button>
        <Button
          size="small"
          color="error"
          text="나가기"
          onEvent={() => onLeaveSession(false)}
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
