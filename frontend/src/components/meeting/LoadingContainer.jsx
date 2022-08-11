import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../common/LoadingSpinner'
import Button from '../common/Button'
import classes from './LoadingContainer.module.css'
import { findRoom } from '../../store/room-thunkActions'

import { useDispatch, useSelector } from 'react-redux/es/exports'
import { func } from 'prop-types'
import { useCallback } from 'react'

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

function LoadingContainer({ handleModal }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const auth = useSelector(state => state.auth)
  const room = useSelector(state => state.room)
  const [loading, setLoading] = useState(true)
  const [openvidu, setOpenVidu] = useState({
    OV: null,
    mySessionId: undefined,
    myUserName: user.nickname,
    session: undefined,
    mainStreamManager: undefined,
    publisher: undefined,
    subscribers: [],
    devices: undefined,
  })

  const { token } = auth
  const { mySessionId } = openvidu
  const moveToMeetingPage = () => navigate(`/meeting/${mySessionId}`)

  useEffect(() => {
    dispatch(findRoom(token))
  }, [])

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
