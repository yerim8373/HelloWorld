import React, { useState, useEffect, useCallback } from 'react'
import VideoDisplay from './VideoDisplay'
import VideoControlBtns from './VideoControlBtns'
import Chatting from './Chatting'
import classes from './Meeting.module.css'
import { useAsync } from 'react-async'
// import SockJS from 'sockjs-client'
// import Stomp from 'stompjs'

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

// let socket = new SockJS()
// let client = Stomp.over(socket)

const Meeting = () => {
  const [myStream, setMyStream] = useState(null)
  // const getMedia = useCallback(async () => {
  //   const streamData = await navigator.mediaDevices.getUserMedia({
  //     audio: true,
  //     video: { facingMode: 'user' },
  //   })
  //   setMyStream(streamData)
  // }, [])

  // useAsync({ promiseFn: getMedia })

  // 내 비디오 연결

  useEffect(() => {
    // 서버 커넥트
    // client.connect({}, () => {
    //   console.log('connected to socket server!')
    //   client.send()
    //   client.subscibe()
    // })
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
              streamData={myStream}
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
