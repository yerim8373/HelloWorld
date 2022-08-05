import React, { useEffect } from 'react'
import VideoDisplay from './VideoDisplay'
import VideoControlBtns from './VideoControlBtns'
import Chatting from './Chatting'
import classes from './Meeting.module.css'
import Button from '../common/Button'

import { ovActions } from '../../store/ov-slice'

import { useSelector, useDispatch } from 'react-redux'
import { getToken } from '../utils/helper/ovServer'

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
  const dispatch = useDispatch()

  const { publisher, subscribers, OV, session, mySessionId, myUserName } =
    useSelector(state => state.openvidu)

  useEffect(() => {
    async function init() {
      if (!OV) {
        dispatch(ovActions.createOpenvidu())
      }

      session.on('streamCreated', event => {
        dispatch(ovActions.enteredSubscriber(event.stream))
      })

      session.on('streamDestroyed', event => {
        dispatch(ovActions.deleteSubscriber(event.stream.streamManager))
      })

      session.on('exception', exception => {
        console.warn(exception)
      })

      const token = await getToken(mySessionId)
      await session.connect(token, { clientData: myUserName })

      let devices = await OV.getDevices()
      let videoDevices = devices.filter(device => device.kind === 'videoinput')

      let publisher = OV.initPublisher(undefined, {
        audioSource: undefined, // The source of audio. If undefined default microphone
        videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
        publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
        publishVideo: true, // Whether you want to start publishing with your video enabled or not
        resolution: '640x480', // The resolution of your video
        frameRate: 30, // The frame rate of your video
        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
        mirror: false, // Whether to mirror your local video
      })

      const paylaod = [videoDevices[0], publisher]

      dispatch(ovActions.createPublisher(paylaod))
    }
    init()
  }, [dispatch, session, OV, mySessionId, myUserName])

  return (
    <div className={classes.meeting_wrapper}>
      <div className={`${classes.meeting}`}>
        <VideoDisplay
          size="wide"
          userData={DUMMYUSER_1}
          streamManager={subscribers[0]}
        />
        <div className={classes.right_display}>
          <div>
            <VideoDisplay
              size="narrow"
              userData={DUMMYUSER_2}
              streamManager={publisher}
            />

            <VideoControlBtns />
            <Button
              text="나가기"
              // onEvent={dispatch(ovActions.leaveSession)}
            ></Button>
          </div>
          <Chatting />
        </div>
      </div>
    </div>
  )
}

export default Meeting
