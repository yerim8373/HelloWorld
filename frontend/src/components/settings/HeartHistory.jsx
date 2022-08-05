import classes from './HeartHistory.module.css'

const histories = [
  {
    id: 3,
    date: '2022-07-05',
    opponent: 'John',
    action: 'extend',
    amount: 5,
  },
  {
    id: 2,
    date: '2022-07-05',
    opponent: 'Emily',
    action: 'give',
    amount: 1,
  },
  {
    id: 1,
    date: '2022-07-03',
    opponent: 'Jason',
    action: 'recieve',
    amount: 1,
  },
]
const actionMsg = {
  recieve: '님으로부터 하트를 받았습니다.',
  give: '님에게 하트를 주었습니다.',
  extend: '대화 시간을 연장했습니다.',
}

export default function HeartHistory() {
  return (
    <div className={classes.heartHistory}>
      <h1>하트 이력</h1>
      <div className={classes.histories}>
        {histories.map(h => (
          <div key={h.id} className={classes.history}>
            <div className={classes.dateAndMsg}>
              <div className={classes.date}>{h.date}</div>
              <div className={classes.msg}>
                {h.action === 'extend' ? '' : h.opponent}
                {actionMsg[h.action]}
              </div>
            </div>
            <div
              className={`${classes.amount} ${
                h.action === 'recieve' ? classes.plus : classes.minus
              }`}
            >
              {h.action === 'recieve' ? '+' : '-'}
              {h.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
