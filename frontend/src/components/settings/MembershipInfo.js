import { useState } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import Badge from '../common/Badge'
import Button from '../common/Button'
import classes from './MembershipInfo.module.css'

export default function MembershipInfo() {
  // TODO: SWR 적용 시 아래 부분을 교체할 것
  const [subscribed, setSubscribed] = useState(true)

  const handleSubscribe = () => {
    setSubscribed(true)
    console.log('subscribed')
  }
  const handleUnsubscribe = () => {
    setSubscribed(false)
    console.log('unsubscribed')
  }

  return (
    <div className={classes.membershipInfo}>
      <h1>멤버십 구독</h1>
      {subscribed ? (
        <h2 className="title">
          5분이 지나도 계속 대화할 수 있어요!
          <br />
          자, 이제 대화하러 갈까요?
        </h2>
      ) : (
        <h2 className="title">
          5분이 너무 짧다고요?
          <br />
          VIP가 되어서 끊임없이 얘기하세요!
        </h2>
      )}
      <table className={classes.table}>
        <thead className={classes.tableHead}>
          <tr>
            <th></th>
            <th className={!subscribed ? classes.currentState : ''}>BASIC</th>
            <th className={subscribed ? classes.currentState : ''}>VIP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={classes.columnHead}>랜덤 화상 채팅</td>
            <td className={`${classes.checkIcon} ${classes.content}`}>
              <BsCheckLg />
            </td>
            <td className={`${classes.checkIcon} ${classes.content}`}>
              <BsCheckLg />
            </td>
          </tr>
          <tr>
            <td className={classes.columnHead}>시간 연장 횟수</td>
            <td className={classes.content}>하트 5개 소모 (5분 추가) n회</td>
            <td className={classes.content}>하트 소모 없이 최대 n회</td>
          </tr>
          <tr>
            <td className={classes.columnHead}>대화 유도 질문 제공</td>
            <td className={`${classes.checkIcon} ${classes.content}`}></td>
            <td className={`${classes.checkIcon} ${classes.content}`}>
              <BsCheckLg />
            </td>
          </tr>
          <tr>
            <td className={classes.columnHead}>가상 배경 기능</td>
            <td className={`${classes.checkIcon} ${classes.content}`}></td>
            <td className={`${classes.checkIcon} ${classes.content}`}>
              <BsCheckLg />
            </td>
          </tr>
          <tr>
            <td className={classes.columnHead}>
              <Badge />
              배지 제공
            </td>
            <td className={`${classes.checkIcon} ${classes.content}`}></td>
            <td className={`${classes.checkIcon} ${classes.content}`}>
              <BsCheckLg />
            </td>
          </tr>
        </tbody>
      </table>
      <div className={classes.subscribeBtn}>
        {subscribed ? (
          <>
            <p>
              구독 해지 시, 계정의 상태가 BASIC으로 돌아갑니다. 정말 구독을
              해지하시겠다면 아래의 버튼을 눌러주세요.
            </p>
            <Button
              text="구독 해지"
              size="middle"
              color="error"
              onEvent={handleUnsubscribe}
            />
          </>
        ) : (
          <Button
            text="구독하기"
            size="middle"
            color="vip"
            onEvent={handleSubscribe}
          />
        )}
      </div>
    </div>
  )
}
