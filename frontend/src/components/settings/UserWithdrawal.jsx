import RadioBtnGroup from '../common/RadioBtnGroup'
import Input from '../common/Input'
import Button from '../common/Button'
import classes from './UserWithdrawal.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  passwordValidIncludeLetterHandler,
  passwordValidLengthHandler,
} from '../utils/validation/passwordValid'
import { inputObj } from '../utils/helper/inputObj'
import { useState, useCallback } from 'react'

import { withDrawal } from '../../store/user-thunkActions'
import { logout } from '../../store/auth-thunkActions'
import { clear } from '../../store/user-slice'
const reasons = [
  {
    name: '삭제하고 싶은 기록이 있어요',
    value: '1',
  },
  {
    name: '이용이 불편하고 장애가 많아요',
    value: '2',
  },
  {
    name: '구독 결제 비용이 비싸요',
    value: '3',
  },
  {
    name: '다른 사이트가 더 좋아요',
    value: '4',
  },
  {
    name: '사용 빈도가 낮아요',
    value: '5',
  },
  {
    name: '기타',
    value: '6',
  },
]

const passwordValidObj = {
  func0: {
    func: inputValue => passwordValidLengthHandler(inputValue),
    message: '비밀번호는 8자 이상이어야 합니다.',
  },
  func1: {
    func: inputValue => passwordValidIncludeLetterHandler(inputValue),
    message: '비밀번호는 영문자,숫자,특수문자를 포함해야 합니다',
  },
}

export default function UserWithdrawal() {
  const [password, setPassword] = useState(inputObj)
  const [reason, setReason] = useState(reasons[0].value)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isValid = obj => obj.value && obj.valid
  const handleSubmit = e => {
    e.preventDefault()
    if (isValid(password)) {
      console.log('회원 탈퇴 API 호출')
    }
  }
  const handleChange = e => setReason(e.target.value)

  ////////////////////////////////////////////////////////////////////
  const state = useSelector(state => state.auth)
  const deleteHandler = useCallback(async () => {
    try {
      await dispatch(withDrawal(state.token))
      await dispatch(logout())
      dispatch(clear())
      navigate('/')
    } catch (error) {
      alert('서버 문제로 회원탈퇴에 실패했습니다!')
    }
  }, [dispatch, navigate])
  //////////////////////////////////////////////////////////////////////////////

  return (
    <form className={classes.userWithdrawal} onSubmit={handleSubmit}>
      <h1>회원 탈퇴</h1>
      <div className={classes.msgContainer}>
        <h2 className="title">
          정말 떠나시는 건가요?
          <br />한 번 더 생각해 보지 않으시겠어요?
        </h2>
        <p className="label">
          계정을 삭제하시려는 이유를 말씀해주세요. 제품 개선에 중요 자료로
          활용하겠습니다.
        </p>
      </div>
      <div className={classes.radioBtnContainer}>
        <RadioBtnGroup
          name="reason"
          items={reasons}
          vertical
          selected={reason}
          handleChange={handleChange}
        />
      </div>
      <p className={classes.warning}>
        계정을 삭제하면 회원님의 모든 콘텐츠와 활동 기록, 구독 정보, 적립 사용
        내역이 삭제됩니다. 삭제된 정보는 복구할 수 없으니 신중하게 결정해주세요.
        <br />
        구독을 한 계정 삭제 시, 환불 신청 후 환불 처리가 완료되기 전 계정을
        삭제하는 경우 구독 기록을 확인할 수 없으므로 환불이 불가합니다.
      </p>
      <div className={classes.passwordContainer}>
        <Input
          id="사용 중인 비밀번호"
          type="password"
          placeholder="현재 비밀번호를 입력해주세요."
          onValid={passwordValidObj}
          onData={pwd => setPassword(pwd)}
        />
      </div>
      {isValid(password) ? (
        <Button
          text="탈퇴하기"
          size="small"
          color="error"
          onEvent={deleteHandler}
        />
      ) : (
        <Button text="탈퇴하기" size="small" color="neutral" />
      )}
    </form>
  )
}
