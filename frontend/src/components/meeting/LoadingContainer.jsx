import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Navigate, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../common/LoadingSpinner'
import Button from '../common/Button'
import classes from './LoadingContainer.module.css'
import { findRoom } from '../../store/room-thunkActions'

import { useDispatch, useSelector } from 'react-redux/es/exports'

import { ovActions } from '../../store/ov-slice'
import { getToken } from '../utils/helper/ovServer'

const tips = [
  '초면이라 무슨 대화를 할지 모르겠다구요?\nHelloWorld의 “키워드” 기능을 사용해보세요!',
  '테스트용 TIP 메시지입니다.\n로딩은 5초 후에 끝납니다.',
]
const getRandomTip = () => {
  const idx = Math.floor(Math.random() * tips.length)
  return tips[idx]
}

//
// 출처: https://velog.io/@jakeseo_me/%EB%B2%88%EC%97%AD-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%9B%85%EC%8A%A4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%97%90%EC%84%9C-setInterval-%EC%82%AC%EC%9A%A9-%EC%8B%9C%EC%9D%98-%EB%AC%B8%EC%A0%9C%EC%A0%90#interval-%EC%9D%BC%EC%8B%9C%EC%A0%95%EC%A7%80%ED%95%98%EA%B8%B0
// function useInterval(callback, delay) {
//   const savedCallback = useRef()

//   // Remember the latest callback.
//   useEffect(() => {
//     savedCallback.current = callback
//   }, [callback])

//   // Set up the interval.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current()
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay)
//       return () => clearInterval(id)
//     }
//   }, [delay])
// }

// const OPENVIDU = new OpenVidu()

function LoadingContainer({ handleModal }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const auth = useSelector(state => state.auth)
  const room = useSelector(state => state.room)
  const openvidu = useSelector(state => state.openvidu)
  const [loading, setLoading] = useState(true)

  const { token } = auth
  const { mySessionId, OV, session, myUserName } = openvidu
  const { roomId } = room
  const { nickname } = user
  const moveToMeetingPage = () => navigate(`/meeting/${mySessionId}`)

  useEffect(() => {
    dispatch(findRoom(token))
  }, [])

  useEffect(() => {
    const initRoom = async () => {
      if (roomId) {
        const dataObj = {
          roomId,
          nickname,
        }
        dispatch(ovActions.createOpenvidu(dataObj))
      }
    }
    initRoom()
  }, [roomId])

  useEffect(() => {
    const initToken = async () => {
      getToken(mySessionId)
        .then(token => {
          session.connect(token, { clientData: myUserName }).then(async () => {
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

            const dataObj = {
              currentVideoDevice: videoDevices[0],
              publisher,
            }

            dispatch(ovActions.createPublisher(dataObj))
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
    initToken()
  }, [mySessionId])

  useEffect(() => {
    const initSession = async () => {
      if (session) {
        session.on('streamCreated', event => {
          dispatch(ovActions.enteredSubscriber(event.stream))
          setLoading(false)
        })

        session.on('streamDestroyed', event => {
          dispatch(ovActions.deleteSubscriber(event.stream.streamManager))
          // setTimeout(() => {
          //   alert('사용자가 나갔습니다. 다음 매칭이 이루어집니다')
          //   dispatch(ovActions.leaveSession())
          //   setLoading(true)
          // }, 5000)
        })

        session.on('publisherStartSpeaking', event => {
          console.log('나지금 말하고 있다!!')
        })

        session.on('publisherStopSpeaking', event => {
          console.log('나지금 말 멈췄다!')
        })

        session.on('exception', exception => {
          console.warn(exception)
        })
      }
    }
    initSession()
  }, [session])

  // connectSocket()

  return (
    <div className={classes.loadingContainer}>
      {loading ? (
        <>
          <h1>전세계의 대화 상대를 찾고 있는 중이에요.</h1>
          <LoadingSpinner></LoadingSpinner>
        </>
      ) : (
        <>
          <h1>당신과 이야기 하기를 원하는 대화 상대를 찾았어요!</h1>
          <div className={classes.buttons}>
            <Button text="대화 시작하기" onEvent={moveToMeetingPage}></Button>
            <Button
              text="취소하기"
              color="error"
              onEvent={handleModal}
            ></Button>
          </div>
        </>
      )}
      <p className={classes.tip}>TIP. {getRandomTip()}</p>
    </div>
  )
}

LoadingContainer.propTypes = {
  handleModal: PropTypes.func.isRequired,
}

export default LoadingContainer
