import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Sheet from '../common/Sheet'
import Input from '../common/Input'
import Button from '../common/Button'
import classes from './SignupForm.module.css'

import { emailValidHandler } from '../utils/validation/emailValid'
import {
  passwordValidIncludeLetterHandler,
  passwordValidLengthHandler,
} from '../utils/validation/passwordValid'

import { inputObj } from '../utils/helper/inputObj'

//pw 재확인이 필요합니다

/////////////////////////////////////////////////////////

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

//비밀번호 확인 추가해야합니다

//const password~~

//////////////////////////////////////////////////////////////////
function SignupForm() {
  const navigate = useNavigate()
  function routerPushHandler() {
    navigate('/auth/signup2')
  }

  //////////////////////////////////////////////////////////////////
  return (
    <Sheet size="large">
      <form onSubmit={e => e.preventDefault()}>
        <div className={classes.signup_main}>
          <h2 className={classes.signup_title}>회원가입</h2>
          <p className={classes.signup_tip}>*은 필수 입력</p>
          <div>
            <Input id="Email" type="text" placeholder="example@example.com" />
          </div>
          <div>
            <Input id="비밀번호" type="password" />
          </div>
          <div>
            <Input
              id="비밀번호확인"
              type="password"
              placeholder="비밀번호 확인"
            />
          </div>
        </div>
        <div className={classes.signup_btns}>
          <div>
            <Button onEvent={routerPushHandler} text="다음" />
          </div>
        </div>
      </form>
    </Sheet>
  )
}

export default SignupForm
