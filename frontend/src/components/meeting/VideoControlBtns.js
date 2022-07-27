import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs'
import classes from './VideoControlBtns.module.css'

const VideoControlBtns = () => {
  return (
    <div className="margin_small flex_row_center">
      <span className={classes.mic_icon}>
        <BsFillMicFill />
      </span>
    </div>
  )
}

export default VideoControlBtns
