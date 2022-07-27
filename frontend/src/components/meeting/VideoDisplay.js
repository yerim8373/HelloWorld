import React from 'react'
import Sheet from '../common/Sheet'
import PropTypes from 'prop-types'

import classes from './VideoDisplay.module.css'
const VideoDisplay = ({ size }) => {
  return (
    <div className="margin_small">
      <Sheet>
        <section
          className={
            size === 'wide'
              ? classes.section_size_wide
              : classes.section_size_narrow
          }
        >
          <div className={classes.user_info_section}>유저 정보</div>
          <div className={classes.video_section}>비디오 정보</div>
        </section>
      </Sheet>
    </div>
  )
}

VideoDisplay.propTypes = {
  size: PropTypes.string.isRequired,
}

export default VideoDisplay
