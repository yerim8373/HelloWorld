import React, { useState, useEffect, useCallback } from 'react'
import VideoDisplay from './VideoDisplay'
import VideoControlBtns from './VideoControlBtns'
import Chatting from './Chatting'
import QuestionSection from './QuestionSection'
import classes from './Meeting.module.css'
import Button from '../common/Button'

import { useNavigate } from 'react-router-dom'

// import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { ovActions } from '../../store/ov-slice'
import {} from 'react-icons/'

// const DUMMYUSER_1 = {
//   country: '🇰🇷',
//   nickName: '싸피조아조아',
//   hearts: 2300,
// }

// const DUMMYUSER_2 = {
//   country: '🇨🇦',
//   nickName: '만수르',
//   hearts: 200,
// }

const Meeting = () => {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const openvidu = useSelector(state => state.openvidu)
  const peerUser = useSelector(state => state.peerUser)
  const dispatch = useDispatch()

  // // 기기 껐다 켰다
  const toggleDevice = useCallback(async (audio, video) => {
    try {
      let devices = await openvidu.OV.getDevices()
      let videoDevices = devices.filter(device => device.kind === 'videoinput')

      let newPublisher = openvidu.OV.initPublisher(undefined, {
        audioSource: undefined, // The source of audio. If undefined default microphone
        videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
        publishAudio: audio, // Whether you want to start publishing with your audio unmuted or not
        publishVideo: video, // Whether you want to start publishing with your video enabled or not
        resolution: '640x480', // The resolution of your video
        frameRate: 30, // The frame rate of your video
        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
        mirror: false, // Whether to mirror your local video
      })

      await openvidu.session.unpublish(openvidu.mainStreamManager)

      await openvidu.session.publish(newPublisher)

      const dataObj = {
        currentVideoDevice: videoDevices[0],
        publisher: newPublisher,
      }
      dispatch(ovActions.createPublisher(dataObj))
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    const userData = {
      nickname: user.nickname,
      heart: user.heart,
      country: user.country,
      email: user.email,
      id: user.id,
    }
    openvidu.publisher.session.signal({
      data: JSON.stringify(userData),
      type: 'peerUser',
    })
  })

  const myData = {
    nickname: user.nickname,
    country: user.country,
    heart: user.heart,
  }

  const peerData = {
    nickname: peerUser.nickname,
    country: peerUser.country,
    heart: peerUser.heart,
  }

  return (
    <div className={classes.meeting_wrapper}>
      <div className={`${classes.meeting}`}>
        <div className={classes.left_display}>
          <VideoDisplay
            size="wide"
            userData={peerData}
            streamManager={openvidu.subscribers[0]}
          />
          <QuestionSection />
        </div>
        <div className={classes.right_display}>
          <div>
            <VideoDisplay
              size="narrow"
              userData={myData}
              streamManager={openvidu.publisher}
            />
            <VideoControlBtns
              // devices={OV && OV.getDevices()}
              // onLeaveSession={leaveSession}
              onToggleDevice={toggleDevice}
            />
          </div>
          <Chatting />
        </div>
      </div>
    </div>
  )
}

export default Meeting
