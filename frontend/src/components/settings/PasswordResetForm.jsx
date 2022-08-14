import { useState } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
import classes from './PasswordResetForm.module.css'
import {
  passwordValidConfirmHandler,
  passwordValidIncludeLetterHandler,
  passwordValidLengthHandler,
} from '../utils/validation/passwordValid'
import { passwordConfirmValidLengthHandler } from '../utils/validation/passwordConfirmValid'
import { useDispatch, useSelector } from 'react-redux'
import {
  getLanguageData,
  getUserData,
  updateUser,
} from '../../store/user-thunkActions'

import countryData from '../utils/countries.json'

// 비밀번호 유효성 검사 객체
const passwordValidObj = {
  func0: {
    func: inputValue => passwordValidLengthHandler(inputValue),
    message: '비밀번호는 8자 이상이어야 합니다.',
  },
  func1: {
    func: inputValue => passwordValidIncludeLetterHandler(inputValue),
    message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
  },
}

// 비밀번호 확인 유효성 검사 객체
const passwordConfirmValidObj = {
  func0: {
    func: inputValue => passwordConfirmValidLengthHandler(inputValue),
    message: '비밀번호 확인은 8자 이상이어야 합니다.',
  },
  func1: {
    func: inputValue => passwordValidIncludeLetterHandler(inputValue),
    message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
  },
  func2: {
    func: (inputValue, target) =>
      passwordValidConfirmHandler(inputValue, target),
    message: '비밀번호가 일치하지 않습니다.',
  },
}

export default function PasswordResetForm() {
  const user = useSelector(state => state.user)
  const { token } = useSelector(state => state.auth)

  const [currPassword, setCurrPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async e => {
    try {
      e.preventDefault()

      if (!currPassword || !newPassword || !newPasswordConfirm) {
        alert('모든 입력란을 채워주세요.')
        return
      }

      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarSrc: user.avatar,
        description: user.description,
        nickname: user.nickname,
        gender: user.gender,
        age: user.age,
        mobileNumber: user.mobileNumber,
        country: countryData.find(c => c.code === user.country),
        userLanList: user.languages,
        pw: newPassword,
      }
      console.log(userData)

      // 서버로 전송
      const { payload } = await dispatch(updateUser({ token, userData }))
      if (!payload || payload.result !== 'success') {
        alert('서버에 문제가 발생했습니다. 잠시 후에 다시 시도해주세요.')
        return
      }

      alert('비밀번호 변경이 완료되었습니다.')

      setCurrPassword('')
      setNewPassword('')
      setNewPasswordConfirm('')
    } catch (e) {
      console.error(e)
      alert('서버에 문제가 발생했습니다. 잠시 후에 다시 시도해주세요.')
    }
  }

  return (
    <form
      className={classes.passwordResetForm}
      onSubmit={e => e.preventDefault()}
    >
      <h1>비밀번호 변경</h1>
      <Input
        id="현재 비밀번호"
        type="password"
        placeholder="현재 비밀번호를 입력해주세요."
        onValid={passwordValidObj}
        onData={({ value, valid }) => valid && setCurrPassword(value)}
      />
      <Input
        id="새 비밀번호"
        type="password"
        placeholder="새 비밀번호를 입력해주세요."
        onValid={passwordValidObj}
        onData={({ value, valid }) => valid && setNewPassword(value)}
        required
      />
      <Input
        id="새 비밀번호 확인"
        type="password"
        placeholder="새 비밀번호를 한 번 더 입력해주세요."
        onValid={passwordConfirmValidObj}
        onData={({ value, valid }) => valid && setNewPasswordConfirm(value)}
        required
        meta={newPassword}
      />

      <Button size="small" text="변경하기" onEvent={handleSubmit} />
    </form>
  )
}
