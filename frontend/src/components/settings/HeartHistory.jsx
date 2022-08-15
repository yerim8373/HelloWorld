import classes from './HeartHistory.module.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHeartHistory } from '../../store/hearthistory-thunkActions'

// const histories = [
// {
//   id: 3,
//   date: '2022-07-05',
//   opponent: 'John',
//   action: 'extend',
//   amount: 5,
// },
// {
//   id: 2,
//   date: '2022-07-05',
//   opponent: 'Emily',
//   action: 'give',
//   amount: 1,
// },
// {
//   id: 1,
//   date: '2022-07-03',
//   opponent: 'Jason',
//   action: 'recieve',
//   amount: 1,
// },
// ]

export default function HeartHistory() {
  const heart = useSelector(state => state.heart)
  // const { token } = useSelector(state => state.auth)

  const [id, setId] = useState(heart.heartHistoryId)
  const [from, setFrom] = useState(heart.from)
  const [to, setTo] = useState(heart.to)
  const [route, setRoute] = useState(heart.route)
  const [name, setName] = useState(heart.name)
  const [regDate, setRegDate] = useState(heart.regDate)
  const [cnt, setCnt] = useState(heart.cnt)
  const dispatch = useDispatch()

  const actionMsg = {
    recieve: '님으로부터 하트를 받았습니다.',
    give: '님에게 하트를 주었습니다.',
    extend: '대화 시간을 연장했습니다.',
  }

  // const heartData = {
  //   id: heart.heartHistoryId,
  //   from: heart.from,
  //   to: heart.to,
  //   route: heart.route,
  //   name: heart.name,
  //   regDate: heart.regDate,
  //   cnt: heart.cnt,
  // }

  //이 배열안에 받아오고싶은거였는데
  const histories = [
    {
      heartid: id,
      heartdate: regDate,
      heartopponent: from,
      heartaction: route,
      heartamount: cnt,
    },
  ]

  // 화면에 불러오는걸 보고싶은거임

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

  dispatch(getHeartHistory(histories))

  return (
    <form onSubmit={e => e.preventDefault}>
      <div className={classes.heartHistory}>
        <h1>하트 이력</h1>
        <div className={classes.histories}>
          {histories.map(h =>
            console.log(h)
            return (
              <div key={h.heartid} className={classes.history}>
                <div className={classes.dateAndMsg}>
                  <div className={classes.date}>{h.heartdate}</div>
                  <div className={classes.msg}>
                    {h.heartaction === 'extend' ? '' : h.heartopponent}
                    {actionMsg[h.heartaction]}
                  </div>
                </div>
                <div
                  className={`${classes.amount} ${
                    h.heartaction === 'recieve' ? classes.plus : classes.minus
                  }`}
                >
                  {h.heartaction === 'recieve' ? '+' : '-'}
                  {h.heartamount}
                </div>
              </div>,
            ),
          )}
        </div>
      </div>
    </form>
  )
}
