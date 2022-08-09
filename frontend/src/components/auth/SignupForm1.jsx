import PropTypes from 'prop-types'
import Input from '../common/Input'
import {
  emailValidHandler,
  emailLengthValidHandler,
} from '../utils/validation/emailValid'
import {
  passwordValidIncludeLetterHandler,
  passwordValidLengthHandler,
  passwordValidConfirmHandler,
} from '../utils/validation/passwordValid'
import { passwordConfirmValidLengthHandler } from '../utils/validation/passwordConfirmValid'
import classes from './SignupForm.module.css'
import { useState } from 'react'

// 이메일 유효성 검사 객체
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

function SignupStep1({ step, handleNext }) {
  const [password, setPassword] = useState('')

  return (
    <div className={`${classes.signupStepContainer} ${classes['step' + step]}`}>
      <Input
        id="Email"
        type="email"
        placeholder="example@example.com"
        onValid={emailValidObj}
        onData={data =>
          handleNext({ email: data.valid ? data.value : undefined })
        }
        required
      />
      <Input
        id="비밀번호"
        type="password"
        placeholder="영문, 숫자, 특수문자를 포함하여 8자 이상"
        onValid={passwordValidObj}
        onData={data => {
          setPassword(data.value)
          handleNext({ password: data.valid ? data.value : undefined })
        }}
        required
      />
      <Input
        id="비밀번호 확인"
        type="password"
        placeholder="영문, 숫자, 특수문자를 포함하여 8자 이상"
        onValid={passwordConfirmValidObj}
        onData={data =>
          handleNext({ passwordConfirm: data.valid ? data.value : undefined })
        }
        required
        meta={password}
      />
    </div>
  )
}

SignupStep1.propTypes = {
  step: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
}

export default SignupStep1
