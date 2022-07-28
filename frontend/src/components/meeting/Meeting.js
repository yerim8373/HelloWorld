import React, { useState, useEffect } from 'react'
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
  const [currStream, setStream] = useState(null)
  useEffect(() => {
    async function fetchVideo() {
      const myStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { facingMode: 'user' },
      })
      setStream(myStream)
    }
    fetchVideo()
  }, [])
  return (
    <div className={classes.meeting_wrapper}>
      <div className={`${classes.meeting}`}>
        <VideoDisplay size="wide" userData={DUMMYUSER_1} />
        <div className={classes.right_display}>
          <div>
            <VideoDisplay
              size="narrow"
              userData={DUMMYUSER_2}
              streamData={currStream}
            />
            <VideoControlBtns />
          </div>
          <Chatting />
        </div>
      </div>
    </div>
  )
}

export default Meeting
