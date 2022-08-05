import { useState } from 'react'
import PropTypes from 'prop-types'
import Input from '../common/Input'
import { inputObj } from '../utils/helper/inputObj'
import {
  emailValidHandler,
  emailLengthValidHandler,
} from '../utils/validation/emailValid'
import {
  passwordValidIncludeLetterHandler,
  passwordValidLengthHandler,
} from '../utils/validation/passwordValid'
import { passwordConfirmValidLengthHandler } from '../utils/validation/passwordConfirmValid'
import classes from './SignupForm.module.css'

//이메일 확인
const emailValidObj = {
  func0: {
    func: inputValue => emailLengthValidHandler(inputValue),
    message: '사용할 이메일을 입력해주세요.',
  },
  func1: {
    func: inputValue => emailValidHandler(inputValue),
    message: '올바른 이메일 형식이 아닙니다.',
  },
}

//비밀번호 확인
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

//비밀번호 동일한지 확인
const passwordConfirmValidObj = {
  func0: {
    func: inputValue => passwordConfirmValidLengthHandler(inputValue),
    message: '비밀번호 확인은 8자 이상이어야 합니다.',
  },
  func1: {
    //이 안에 비밀번호 확인ㅇ
  },
}

function SignupStep1({ step }) {
  const [email, setEmail] = useState(inputObj)
  const [password, setPassword] = useState(inputObj)
  const [passwordConfirm, setPasswordConfirm] = useState(inputObj)

  return (
    <div className={`${classes.signupStepContainer} ${classes['step' + step]}`}>
      <Input
        id="Email"
        type="email"
        placeholder="example@example.com"
        onValid={emailValidObj}
        onData={emailData => setEmail(emailData)}
        required
      />
      <Input
        id="비밀번호"
        type="password"
        onValid={passwordValidObj}
        onData={passwordData => setPassword(passwordData)}
        required
      />
      <Input
        id="비밀번호 확인"
        type="password"
        placeholder="비밀번호 확인"
        onValid={passwordConfirmValidObj}
        onData={passwordConfirmData => setPasswordConfirm(passwordConfirmData)}
        required
      />
    </div>
  )
}

SignupStep1.propTypes = {
  step: PropTypes.number,
}

export default SignupStep1
