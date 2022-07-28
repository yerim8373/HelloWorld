import { useState } from 'react'

import {
  BsFillMicFill,
  BsFillMicMuteFill,
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
  BsStopwatch,
} from 'react-icons/bs'
import classes from './VideoControlBtns.module.css'

const VideoControlBtns = () => {
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
    </div>
  )
}

export default VideoControlBtns
