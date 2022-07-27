import React from 'react'
import VideoDisplay from './VideoDisplay'
import VideoControlBtns from './VideoControlBtns'
import Chatting from './Chatting'
import classes from './Meeting.module.css'

const DUMMYUSER_1 = {
  country: '🇰🇷',
  nickName: '싸피조아조아',
  hearts: 2300,
}

const DUMMYUSER_2 = {
  country: '🇨🇦',
  nickName: '만수르',
  hearts: 200,
}

const Meeting = () => {
  return (
    <div className={classes.meeting_wrapper}>
      <div className={`${classes.meeting}`}>
        <div>
          <VideoDisplay size="wide" userData={DUMMYUSER_1} />
        </div>
        <div className={classes.right_display}>
          <VideoDisplay size="narrow" userData={DUMMYUSER_2} />
          <VideoControlBtns />
          <Chatting />
        </div>
      </div>
    </div>
  )
}

export default Meeting
