import React, { useState, useEffect } from 'react'
import VideoDisplay from './VideoDisplay'
import VideoControlBtns from './VideoControlBtns'
import Chatting from './Chatting'
import classes from './Meeting.module.css'
import Button from '../common/Button'

import { useNavigate } from 'react-router-dom'

// import axios from 'axios'
import { OpenVidu } from 'openvidu-browser'
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

// let socket = new SockJS()
// let client = Stomp.over(socket)

const Meeting = () => {
  const navigate = useNavigate()

  const [openVidu, setOpenVidu] = useState({
    OV: null,
    mySessionId: 'SessionA',
    myUserName: 'Participant' + Math.floor(Math.random() * 100),
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: [],
  })

  const { OV, session, subscribers, publisher, myUserName, mySessionId } =
    openVidu

  useEffect(() => {
    const init = async () => {
      if (OV === null) {
        setOpenVidu(prevState => ({
          ...prevState,
          OV: new OpenVidu(),
        }))
      } else if (session === undefined) {
        setOpenVidu(prevState => ({
          ...prevState,
          session: OV.initSession(),
        }))
      } else {
        session.on('streamCreated', event => {
          let subscriber = session.subscribe(event.stream, undefined)

          subscribers.push(subscriber)
          setOpenVidu(prevState => ({
            ...prevState,
            subscribers,
          }))
        })

        session.on('streamDestroyed', event => {
          let index = subscribers.indexOf(event.stream.streamManager, 0)
          if (index > -1) {
            subscribers.splice(index, 1)
            setOpenVidu(prevState => ({
              ...prevState,
              subscribers,
            }))
          }
        })

        session.on('exception', exception => {
          console.warn(exception)
        })

        getToken(mySessionId)
          .then(token => {
            session
              .connect(token, { clientData: myUserName })
              .then(async () => {
                let devices = await OV.getDevices()
                let videoDevices = devices.filter(
                  device => device.kind === 'videoinput',
                )

                let publisher = OV.initPublisher(undefined, {
                  audioSource: undefined, // The source of audio. If undefined default microphone
                  videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                  publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                  publishVideo: true, // Whether you want to start publishing with your video enabled or not
                  resolution: '1280x720', // The resolution of your video
                  frameRate: 60, // The frame rate of your video
                  insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                  mirror: false, // Whether to mirror your local video
                })

                await session.publish(publisher)

                setOpenVidu(prevState => ({
                  ...prevState,
                  currentVideoDevice: videoDevices[0],
                  mainStreamManager: publisher,
                  publisher,
                }))
              })
          })
          .catch(error => {
            console.log(
              'There was an error connecting to the session:',
              error.code,
              error.message,
            )
          })
      }
    }
    init()
  }, [session, subscribers, myUserName, OV, mySessionId])

  function leaveSession(reMatching) {
    const mySession = openVidu.session
    if (mySession) {
      mySession.disconnect()
    }

    setOpenVidu({
      OV: null,
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionA',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    })

    reMatching
      ? navigate('/meeting', { state: { reMatching: true } })
      : navigate('/meeting')
  }

  async function switchCamera() {
    try {
      const devices = await OV.getDevices()
      let videoDevices = devices.filter(device => device.kind === 'videoinput')
      if (videoDevices && videoDevices.length > 1) {
        let newVideoDevice = videoDevices.filter(
          device => device.deviceId !== openVidu.currentVideoDevice.deviceId,
        )

        if (newVideoDevice.length > 0) {
          let newPublisher = OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          })

          await openVidu.session.unpublish(openVidu.mainStreamManager)

          await openVidu.session.publish(newPublisher)
          setOpenVidu(prevState => ({
            ...prevState,
            currentVideoDevice: newVideoDevice,
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          }))
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  async function toggleMic() {
    try {
      const devices = await OV.getDevices()
      console.log(devices)
      let videoDevices = devices.filter(device => device.kind === 'videoinput')
      if (videoDevices && videoDevices.length > 1) {
        let newVideoDevice = videoDevices.filter(
          device => device.deviceId !== openVidu.currentVideoDevice.deviceId,
        )

        if (newVideoDevice.length > 0) {
          let newPublisher = OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          })

          await openVidu.session.unpublish(openVidu.mainStreamManager)

          await openVidu.session.publish(newPublisher)
          setOpenVidu(prevState => ({
            ...prevState,
            currentVideoDevice: newVideoDevice,
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          }))
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className={classes.meeting_wrapper}>
      <div className={`${classes.meeting}`}>
        <VideoDisplay
          size="wide"
          userData={DUMMYUSER_1}
          streamManager={openVidu.subscribers[0]}
        />
        <div className={classes.right_display}>
          <div>
            <VideoDisplay
              size="narrow"
              userData={DUMMYUSER_2}
              streamManager={openVidu.publisher}
            />

            <VideoControlBtns onLeaveSession={leaveSession} />
          </div>
          <Chatting openVidu={openVidu} />
        </div>
      </div>
    </div>
  )
}

export default Meeting
