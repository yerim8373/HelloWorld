import { useState } from 'react'
import PropTypes from 'prop-types'
import Input from '../common/Input'
import { inputObj } from '../utils/helper/inputObj'
import { emailValidHandler } from '../utils/validation/emailValid'
import {
  passwordValidIncludeLetterHandler,
  passwordValidLengthHandler,
} from '../utils/validation/passwordValid'
import classes from './SignupForm.module.css'

//이메일 확인
const emailValidObj = {
  func0: {
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
      />
      <Input
        id="비밀번호"
        type="password"
        onValid={passwordValidObj}
        onData={passwordData => setPassword(passwordData)}
      />
      <Input
        id="비밀번호 확인"
        type="password"
        placeholder="비밀번호 확인"
        onValid={passwordValidObj}
        onData={passwordData => setPassword(passwordData)}
      />
    </div>
  )
}

SignupStep1.propTypes = {
  step: PropTypes.number,
}

export default SignupStep1
