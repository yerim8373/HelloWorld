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

const VideoControlBtns = ({ onLeaveSession }) => {
  const [mic, setMic] = useState(true)
  const [camera, setCamera] = useState(true)

  // 마이크 설정 로직
  const checkMicHandler = () => {
    return setMic(prevMic => !prevMic)
  }

  // 비디오 설정 로직
  const checkCameraHandler = () => {
    return setCamera(prevCamera => !prevCamera)
  }

  return (
    <div className={`flex_row_space_evenly ${classes.btns_wrapper}`}>
      <div>
        <span onClick={checkMicHandler} className={classes.icon}>
          {mic ? <BsFillMicFill /> : <BsFillMicMuteFill />}
        </span>
        <span onClick={checkCameraHandler} className={classes.icon}>
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
}

export default VideoControlBtns
