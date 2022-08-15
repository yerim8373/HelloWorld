import classes from './HeartHistory.module.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHeartHistory } from '../../store/hearthistory-thunkActions'

export default function HeartHistory() {
  const heart = useSelector(state => state.heart)
  const { token } = useSelector(state => state.auth)

  const [histories, setHistories] = useState([])
  const dispatch = useDispatch()

  const actionMsg = {
    recieve: '님으로부터 하트를 받았습니다.',
    give: '님에게 하트를 주었습니다.',
    extend: '대화 시간을 연장했습니다.',
  }

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
            console.log(h)
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
