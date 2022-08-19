import React, { useEffect, useRef } from 'react'
import Sheet from '../common/Sheet'
import PropTypes from 'prop-types'

import classes from './VideoDisplay.module.css'

import CountryFlag from 'react-country-flag'
import { useDispatch, useSelector } from 'react-redux'
import { peerUserActions } from '../../store/peerUser-slice'

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
              <CountryFlag
                svg
                countryCode={userData.country}
                style={{ width: '2rem', height: '1rem' }}
              ></CountryFlag>
              <span>{userData.nickname}</span>
            </div>
            <div className={classes.hearts_info}>
              <span className={classes.heart_icon}>❤ </span>
              <span>{userData.heart}</span>
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
    country: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    heart: PropTypes.number.isRequired,
  }),
  streamManager: PropTypes.object,
}

export default VideoDisplay
