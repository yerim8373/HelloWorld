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
    navigate('/auth')
  }

  //////////////////////////////////////////////////////////////////
  return (
    <Sheet size="large">
      <form onSubmit={e => e.preventDefault()}>
        <div className={classes.signup_main}>
          <h2 className={classes.signup_title}>회원가입이 완료되었습니다! </h2>
          <h2 className={classes.signup_title}>지금바로 시작해볼까요? </h2>
        </div>
        <div className={classes.signup_btns}>
          <div>
            <Button onEvent={routerPushHandler} text="로그인 페이지로 이동" />
          </div>
        </div>
      </form>
    </Sheet>
  )
}
export default SignupForm3
