import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Sheet from '../common/Sheet'
import Input from '../common/Input'
import Button from '../common/Button'
import classes from './SignupForm.module.css'

//////////////////////////////////////////////////////////////////
function SignupForm3() {
  const navigate = useNavigate()
  function routerPushHandler() {
    navigate('/auth/signup4')
  }

  //////////////////////////////////////////////////////////////////
  return (
    <Sheet size="large">
      <form onSubmit={e => e.preventDefault()}>
        <div className={classes.signup_main}>
          <h2 className={classes.signup_title}>회원가입</h2>
          <div>
            <font text-align="center" size="3" color="#f0b622">
              {' '}
              *
              <font size="2" color="#7a8982">
                은 필수 입력
              </font>
            </font>
          </div>
          <p>이건 회원가입 333333</p>
          <div>
            <Input id="이름" type="text" placeholder="example@example.com" />
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
export default SignupForm3
