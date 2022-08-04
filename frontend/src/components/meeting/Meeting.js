import React, { useState, useEffect, useCallback } from 'react'
import VideoDisplay from './VideoDisplay'
import VideoControlBtns from './VideoControlBtns'
import Chatting from './Chatting'
import classes from './Meeting.module.css'
import Button from '../common/Button'

import { ovActions } from '../../store/ov-slice'

import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getToken } from '../../store/ov-server'
// import axios from 'axios'
// import { OpenVidu } from 'openvidu-browser'
// import { Navigate } from 'react-router-dom'
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
  // const [myStream, setMyStream] = useState(null)
  // const getMedia = useCallback(async () => {
  //   const streamData = await navigator.mediaDevices.getUserMedia({
  //     audio: true,
  //     video: { facingMode: 'user' },
  //   })
  //   setMyStream(streamData)
  // }, [])

  // useAsync({ promiseFn: getMedia })

  // 내 비디오 연결

  // useEffect(() => {
  // 서버 커넥트
  // client.connect({}, () => {
  //   console.log('connected to socket server!')
  //   client.send()
  //   client.subscibe()
  // })
  // }, [])

  const navigate = useNavigate()
  // openvido

  // const [openVidu, setOpenVidu] = useState({
  //   mySessionId: 'SessionA',
  //   myUserName: 'Participant' + Math.floor(Math.random() * 100),
  //   session: undefined,
  //   mainStreamManager: undefined,
  //   publisher: undefined,
  //   subscribers: [],
  // })

  // const { session, subscribers, myUserName } = openVidu

  // let OV = null

  // useEffect(() => {
  //   const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443'
  //   const OPENVIDU_SERVER_SECRET = 'MY_SECRET'
  //   OV = new OpenVidu()
  //   if (session === undefined) {
  //     setOpenVidu(prevState => ({
  //       ...prevState,
  //       session: OV.initSession(),
  //     }))
  //   } else {
  //     let mySession = session

  //     mySession.on('streamCreated', event => {
  //       let subscriber = mySession.subscribe(event.stream, undefined)
  //       subscribers.push(subscriber)
  //       setOpenVidu(prevState => ({
  //         ...prevState,
  //         subscribers,
  //       }))
  //     })

  //     mySession.on('streamDestroyed', event => {
  //       deleteSubscriber(event.stream.streamManager)
  //     })

  //     mySession.on('exception', exception => {
  //       console.warn(exception)
  //     })

  //     getToken(openVidu.mySessionId)
  //       .then(token => {
  //         mySession
  //           .connect(token, { clientData: myUserName })
  //           .then(async () => {
  //             let devices = await OV.getDevices()
  //             let videoDevices = devices.filter(
  //               device => device.kind === 'videoinput',
  //             )

  //             let publisher = OV.initPublisher(undefined, {
  //               audioSource: undefined, // The source of audio. If undefined default microphone
  //               videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
  //               publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
  //               publishVideo: true, // Whether you want to start publishing with your video enabled or not
  //               resolution: '640x480', // The resolution of your video
  //               frameRate: 30, // The frame rate of your video
  //               insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
  //               mirror: false, // Whether to mirror your local video
  //             })

  //             mySession.publish(publisher)

  //             setOpenVidu(prevState => ({
  //               ...prevState,
  //               currentVideoDevice: videoDevices[0],
  //               mainStreamManager: publisher,
  //               publisher,
  //             }))
  //           })
  //       })
  //       .catch(error => {
  //         console.log(
  //           'There was an error connecting to the session:',
  //           error.code,
  //           error.message,
  //         )
  //       })
  //   }

  //   function deleteSubscriber(streamManager) {
  //     let index = subscribers.indexOf(streamManager, 0)
  //     if (index > -1) {
  //       subscribers.splice(index, 1)
  //       setOpenVidu(prevState => ({
  //         ...prevState,
  //         subscribers,
  //       }))
  //     }
  //   }

  //   // SERVER_SIDE
  //   async function getToken(mySessionId) {
  //     const sessionId = await createSession(mySessionId)
  //     const token = await createToken(sessionId)
  //     return token
  //   }

  //   function createSession(sessionId) {
  //     return new Promise(async (resolve, reject) => {
  //       let data = JSON.stringify({ customSessionId: sessionId })
  //       try {
  //         const response = await axios.post(
  //           OPENVIDU_SERVER_URL + '/openvidu/api/sessions',
  //           data,
  //           {
  //             headers: {
  //               Authorization:
  //                 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
  //               'Content-Type': 'application/json',
  //             },
  //           },
  //         )
  //         return response
  //       } catch (response) {
  //         let error = Object.assign({}, response)
  //         if (error?.response?.status === 409) {
  //           return resolve(sessionId)
  //         }
  //       }
  //     })
  //   }

  //   function createToken(sessionId) {
  //     return new Promise(async (resolve, reject) => {
  //       var data = {}
  //       try {
  //         const response = await axios.post(
  //           OPENVIDU_SERVER_URL +
  //             '/openvidu/api/sessions/' +
  //             sessionId +
  //             '/connection',
  //           data,
  //           {
  //             headers: {
  //               Authorization:
  //                 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
  //               'Content-Type': 'application/json',
  //             },
  //           },
  //         )
  //         return resolve(response.data.token)
  //       } catch (error) {
  //         return reject(error)
  //       }
  //     })
  //   }
  // }, [session, subscribers, myUserName])

  // function leaveSession() {
  //   const mySession = openVidu.session
  //   if (mySession) {
  //     mySession.disconnect()
  //   }

  //   OV = null
  //   setOpenVidu({
  //     session: undefined,
  //     subscribers: [],
  //     mySessionId: 'SessionA',
  //     myUserName: 'Participant' + Math.floor(Math.random() * 100),
  //     mainStreamManager: undefined,
  //     publisher: undefined,
  //   })

  //   navigate('/meeting')
  // }

  // async function switchCamera() {
  //   try {
  //     const devices = await OV.getDevices()
  //     let videoDevices = devices.filter(device => device.kind === 'videoinput')
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

  const dispatch = useDispatch()
  const { publisher, subscribers, OV, session, mySessionId, myUserName } =
    useSelector(state => state.openvidu)

  useEffect(() => {
    async function init() {
      // console.log(OV, session)
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
      // console.log(paylaod)
      dispatch(ovActions.createPublisher(paylaod))

      session.on('streamCreated', event => {
        let subscriber = session.subscribe(event.stream, undefined)
        // subscribers.push(subscriber)
        dispatch(ovActions.enteredSubscriber(subscriber))
      })

      session.on('streamDestroyed', event => {
        dispatch(ovActions.deleteSubscriber(event.stream.streamManager))
        // deleteSubscriber(event.stream.streamManager)
      })

      session.on('exception', exception => {
        console.warn(exception)
      })
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
