import classes from './HeartHistory.module.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHeartHistory } from '../../store/hearthistory-thunkActions'

// const heartData = {
//   id: heart.heartHistoryId,
//   from: heart.from,
//   to: heart.to,
//   route: heart.route,
//   name: heart.name,
//   regDate: heart.regDate,
//   cnt: heart.cnt,
// }

export default function HeartHistory() {
  const heart = useSelector(state => state.heart)
  const { token } = useSelector(state => state.auth)

  const [histories, setHistories] = useState([])
  const dispatch = useDispatch()

  // const history = [
  //   {
  //     heartid: id,
  //     heartdate: regDate,
  //     heartopponent: from,
  //     heartaction: route,
  //     heartamount: cnt,
  //   },
  // ]

  const actionMsg = {
    RECEIVE: '님으로부터 하트를 받았습니다.',
    GIVE: '님에게 하트를 주었습니다.',
    EXTENTION: '대화 시간을 연장했습니다.',
    REVIEW: '미팅 평가를 하여 하트를 받았습니다.',
  }

  //EVENT(???), LIKE(+1), REVIEW(???), EXTENTION(시간연장이니까 -5);
  // 배열안에 받아오고싶은거였는데
  // 화면에 불러오는걸 보고싶은거임

  // 이 handleSubmit은 죽은코드
  // const handleSubmit = async e => {
  //   try {
  //     e.preventDefault()
  //     await dispatch(getHeartHistory(token))

  //     alert('하트이력을 불러옵니다')
  //   } catch (e) {
  //     console.error(e)
  //     alert('서버에 문제가 발생했습니다. 잠시 후에 다시 시도해주세요.')
  //   }
  // }

  useEffect(() => {
    const getHistory = async () => {
      const { payload } = await dispatch(getHeartHistory(token))
      setHistories(payload.data)
    }
    getHistory()
  }, [])

  return (
    <form onSubmit={e => e.preventDefault}>
      <div className={classes.heartHistory}>
        <h1>하트 이력</h1>
        <div className={classes.histories}>
          {histories.map(h => {
            // console.log('111')
            // console.log(h)
            // console.log('111')
            return (
              <div key={h.heartHistoryId} className={classes.history}>
                <div className={classes.dateAndMsg}>
                  <div className={classes.date}>{h.regDate}</div>
                  <div className={classes.msg}>
                    {h.route === 'extend' ? '' : h.heartopponent}
                    {actionMsg[h.route]}
                  </div>
                </div>
                <div
                  className={`${classes.amount} ${
                    h.route === 'recieve' ? classes.plus : classes.minus
                  }`}
                >
                  {h.route === 'recieve' ? '+' : '-'}
                  {h.cnt}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </form>
  )
}
