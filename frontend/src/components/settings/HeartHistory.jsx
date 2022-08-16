//만약 DB에 데이터가 없다면, 새로운 회원을 가입한 후 이걸 넣으세요!
//insert into heart_history value(2,'2022-08-19',1,'Event','RECEIVE',2,3);
//insert into heart_history value(3,'2022-08-19',1,'Event','LIKE',2,3);

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
    LIKE: ' 님으로부터 하트를 받았습니다.',
    EXTENTION: ' 님과의 대화 시간을 연장했습니다.',
  }

  useEffect(() => {
    const getHistory = async () => {
      const { payload } = await dispatch(getHeartHistory(token))
      setHistories(payload.data)
      console.log(payload)
    }
    getHistory()
  }, [])

  return (
    <form onSubmit={e => e.preventDefault}>
      <div className={classes.heartHistory}>
        <h1>하트 이력</h1>
        <div className={classes.histories}>
          {histories.map(h => {
            return (
              <div key={h.heartHistoryId} className={classes.history}>
                <div className={classes.dateAndMsg}>
                  <div className={classes.date}>{h.regDate}</div>
                  <div className={classes.msg}>
                    {'['}
                    {h.from.nickname}
                    {']'}
                    {h.route === 'extend' ? '' : h.heartopponent}
                    {actionMsg[h.route]}
                  </div>
                </div>
                <div
                  className={`${classes.amount} ${
                    h.route === 'LIKE' ? classes.plus : classes.minus
                  }`}
                >
                  {h.route === 'LIKE' ? '+' : '-'}
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
