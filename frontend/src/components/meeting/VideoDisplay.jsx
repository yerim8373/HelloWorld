import React, { useEffect, useRef } from 'react'
import Sheet from '../common/Sheet'
import PropTypes from 'prop-types'

import classes from './VideoDisplay.module.css'

// VideoDisplay /////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

const VideoDisplay = ({ size, userData, streamManager }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    if (!streamManager) return
    streamManager.addVideoElement(videoRef.current)
  }, [streamManager])

  return (
    <div className={classes.video_display}>
      <Sheet size="medium">
        <section
          className={
            size === 'wide'
              ? classes.section_size_wide
              : classes.section_size_narrow
          }
        >
          <div className={classes.user_info_section}>
            <div className={classes.user_info}>
              <span>{userData.country}</span>
              <span>{userData.nickName}</span>
            </div>
            <div className={classes.hearts_info}>
              <span className={classes.heart_icon}>❤</span>
              <span>{userData.hearts}</span>
            </div>
          </div>
          <div className={classes.video_section}>
            <div className={classes.video_wrapper}>
              <video
                className={classes.video}
                ref={videoRef}
                autoPlay
                playsInline
              ></video>
            </div>
          </div>
        </section>
      </Sheet>
    </div>
  )
}

VideoDisplay.propTypes = {
  size: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    // 국가 아이콘으로 바꿀 예정
    country: PropTypes.string.isRequired,
    nickName: PropTypes.string.isRequired,
    hearts: PropTypes.number.isRequired,
  }),
  streamManager: PropTypes.object,
}

export default VideoDisplay
