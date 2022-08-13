import React, { useState, useEffect, useCallback } from 'react'
import VideoDisplay from './VideoDisplay'
import VideoControlBtns from './VideoControlBtns'
import Chatting from './Chatting'
import classes from './Meeting.module.css'
import Button from '../common/Button'

import { useNavigate } from 'react-router-dom'

// import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { ovActions } from '../../store/ov-slice'

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
  const user = useSelector(state => state.user)
  const openvidu = useSelector(state => state.openvidu)
  const dispatch = useDispatch()

  // const [openVidu, setOpenVidu] = useState({
  //   OV: null,
  //   mySessionId: 'I6TCOQCRCH',
  //   myUserName: state.nickname,
  //   session: undefined,
  //   mainStreamManager: undefined,
  //   publisher: undefined,
  //   subscribers: [],
  //   devices: undefined,
  // })

  // const {
  //   OV,
  //   session,
  //   subscribers,
  //   myUserName,
  //   mySessionId,
  //   mainStreamManager,
  //   devices,
  // } = openVidu

  // useEffect(() => {
  //   const init = async () => {
  //     if (OV === null) {
  //       setOpenVidu(prevState => ({
  //         ...prevState,
  //         OV: new OpenVidu(),
  //       }))
  //     }

  //     if (OV && session === undefined) {
  //       const initSession = await OV.initSession()
  //       const devices = await OV.getDevices()
  //       setOpenVidu(prevState => ({
  //         ...prevState,
  //         session: initSession,
  //         devices,
  //       }))
  //     }

  //     if (session) {
  //       session.on('streamCreated', event => {
  //         let subscriber = session.subscribe(event.stream, undefined)
  //         console.log(event.stream)
  //         subscribers.push(subscriber)
  //         setOpenVidu(prevState => ({
  //           ...prevState,
  //           subscribers,
  //         }))
  //       })

  //       session.on('streamDestroyed', event => {
  //         let index = subscribers.indexOf(event.stream.streamManager, 0)
  //         if (index > -1) {
  //           subscribers.splice(index, 1)
  //           setOpenVidu(prevState => ({
  //             ...prevState,
  //             subscribers,
  //           }))
  //         }
  //       })

  //       session.on('publisherStartSpeaking', event => {
  //         console.log('나지금 말하고 있다!!')
  //       })

  //       session.on('publisherStopSpeaking', event => {
  //         console.log('나지금 말 멈췄다!')
  //       })

  //       session.on('exception', exception => {
  //         console.warn(exception)
  //       })

  //       getToken(mySessionId)
  //         .then(token => {
  //           session
  //             .connect(token, { clientData: myUserName })
  //             .then(async () => {
  //               let devices = await OV.getDevices()
  //               let videoDevices = devices.filter(
  //                 device => device.kind === 'videoinput',
  //               )

  //               let publisher = OV.initPublisher(undefined, {
  //                 audioSource: undefined, // The source of audio. If undefined default microphone
  //                 videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
  //                 publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
  //                 publishVideo: true, // Whether you want to start publishing with your video enabled or not
  //                 resolution: '1280x720', // The resolution of your video
  //                 frameRate: 60, // The frame rate of your video
  //                 insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
  //                 mirror: false, // Whether to mirror your local video
  //                 oppnUserNickname: state.nickName,
  //                 oppnUserCountry: state.country,
  //               })

  //               await session.publish(publisher)

  //               setOpenVidu(prevState => ({
  //                 ...prevState,
  //                 currentVideoDevice: videoDevices[0],
  //                 mainStreamManager: publisher,
  //                 publisher,
  //               }))
  //             })
  //         })
  //         .catch(error => {
  //           console.log(
  //             'There was an error connecting to the session:',
  //             error.code,
  //             error.message,
  //           )
  //         })
  //     }
  //   }
  //   init()
  // }, [session, subscribers, myUserName, OV, mySessionId])

  // leaveSession(true) : 나가서 재매칭이 이루어진다.
  // leaveSession(false) : 나가서 재매칭이 이루어지지 않는다.
  // function leaveSession() {
  // dispatch(ovActions.leaveSession())

  // reMatching
  //   ? navigate('/meeting', { state: { reMatching: true } })
  //   : navigate('/meeting')
  // }

  // // 기기 껐다 켰다
  // const toggleDevice = useCallback(
  //   async (audio, video) => {
  //     try {
  //       let devices = await OV.getDevices()
  //       let videoDevices = devices.filter(
  //         device => device.kind === 'videoinput',
  //       )

  //       let newPublisher = OV.initPublisher(undefined, {
  //         audioSource: undefined, // The source of audio. If undefined default microphone
  //         videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
  //         publishAudio: audio, // Whether you want to start publishing with your audio unmuted or not
  //         publishVideo: video, // Whether you want to start publishing with your video enabled or not
  //         resolution: '1280x720', // The resolution of your video
  //         frameRate: 60, // The frame rate of your video
  //         insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
  //         mirror: false, // Whether to mirror your local video
  //       })

  //       await session.unpublish(mainStreamManager)

  //       await session.publish(newPublisher)

  //       setOpenVidu(prevState => ({
  //         ...prevState,
  //         currentVideoDevice: videoDevices[0],
  //         mainStreamManager: newPublisher,
  //         publisher: newPublisher,
  //       }))
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   },

  //   [OV, mainStreamManager, session],
  // )

  // async function switchDevice() {
  //   try {
  //     const devices = await OV.getDevices()
  //     let videoDevices = devices.filter(device => device.kind === 'videoinput')
  //     let audioDevices = devices.filter(device => device.kind === 'audioinput')

  //     if (videoDevices && videoDevices.length > 1) {
  //       let newVideoDevice = videoDevices.filter(
  //         device => device.deviceId !== openVidu.currentVideoDevice.deviceId,
  //       )

  //       if (newVideoDevice.length > 0) {
  //         let newPublisher = OV.initPublisher(undefined, {
  //           videoSource: newVideoDevice[0].deviceId,
  //           publishAudio: true,
  //           publishVideo: true,
  //           mirror: true,
  //         })

  //         await openVidu.session.unpublish(openVidu.mainStreamManager)

  //         await openVidu.session.publish(newPublisher)
  //         setOpenVidu(prevState => ({
  //           ...prevState,
  //           currentVideoDevice: newVideoDevice,
  //           mainStreamManager: newPublisher,
  //           publisher: newPublisher,
  //         }))
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  return (
    <div className={classes.meeting_wrapper}>
      <div className={`${classes.meeting}`}>
        <VideoDisplay
          size="wide"
          userData={DUMMYUSER_1}
          streamManager={openvidu.subscribers[0]}
        />
        <div className={classes.right_display}>
          <div>
            <VideoDisplay
              size="narrow"
              userData={DUMMYUSER_2}
              streamManager={openvidu.publisher}
            />
            <VideoControlBtns
            // devices={OV && OV.getDevices()}
            // onLeaveSession={leaveSession}
            // onToggleDevice={toggleDevice}
            />
          </div>
          <Chatting openVidu={openvidu} />
        </div>
      </div>
    </div>
  )
}

export default Meeting
