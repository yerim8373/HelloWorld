import { useState } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import classes from './PasswordResetForm.module.css'
import {
  passwordValidIncludeLetterHandler,
  passwordValidLengthHandler,
} from '../utils/validation/passwordValid'
import { inputObj } from '../utils/helper/inputObj'

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

export default function PasswordResetForm() {
  const [currPassword, setCurrPassword] = useState(inputObj)
  const [newPassword, setNewPassword] = useState(inputObj)
  const [newPasswordConfirm, setNewPasswordConfirm] = useState(inputObj)

  const isValid = obj => obj.value && obj.valid

  // TODO: 비밀번호 일치 여부 유효성 검사 추가
  const handleSubmit = e => {
    e.preventDefault()
    if (
      isValid(currPassword) &&
      isValid(newPassword) &&
      isValid(newPasswordConfirm)
    ) {
      console.log('비밀번호 변경 가능')
    } else {
      console.log('비밀번호 변경 불가능')
    }
  }

  return (
    <form className={classes.passwordResetForm} onSubmit={handleSubmit}>
      <h1>비밀번호 변경</h1>
      <Input
        id="현재 비밀번호"
        type="password"
        placeholder="현재 비밀번호를 입력해주세요."
        onValid={passwordValidObj}
        onData={pwd => setCurrPassword(pwd)}
      />
      <Input
        id="새 비밀번호"
        type="password"
        placeholder="새 비밀번호를 입력해주세요."
        onValid={passwordValidObj}
        onData={pwd => setNewPassword(pwd)}
      />
      <Input
        id="새 비밀번호 확인"
        type="password"
        placeholder="새 비밀번호를 한 번 더 입력해주세요."
        onValid={passwordValidObj}
        onData={pwd => setNewPasswordConfirm(pwd)}
      />
      <Button size="small" text="변경하기" />
    </form>
  )
}
