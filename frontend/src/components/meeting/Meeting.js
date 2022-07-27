import React from 'react'
import VideoDisplay from './VideoDisplay'
import VideoControlBtns from './VideoControlBtns'

const Meeting = () => {
  return (
    <div className="flex_row_center">
      <div>
        <VideoDisplay size="wide" />
      </div>
      <div>
        <VideoDisplay size="narrow" />
        <VideoControlBtns />
      </div>
    </div>
  )
}

export default Meeting
