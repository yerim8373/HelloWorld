import { BsCheckLg } from 'react-icons/bs'
import Badge from '../common/Badge'
import classes from './VipTable.module.css'

export default function VipTable() {
  return (
    <table className={classes.table}>
      <thead className={classes.tableHead}>
        <tr>
          <th></th>
          <th>BASIC</th>
          <th>VIP</th>
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
          <td
            className={`${classes.checkIcon} ${classes.content} ${classes.bottomRight}`}
          >
            <BsCheckLg />
          </td>
        </tr>
      </tbody>
    </table>
  )
}
