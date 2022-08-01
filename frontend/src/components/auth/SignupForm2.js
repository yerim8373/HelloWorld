import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Sheet from '../common/Sheet'
import Input from '../common/Input'
import Button from '../common/Button'
import classes from './SignupForm.module.css'

import RadioBtnGroup from '../common/RadioBtnGroup'

//////////////////////////////////////////////////////////////////
function SignupForm2() {
  const navigate = useNavigate()
  function routerPushHandler() {
    navigate('/auth/signup3')
  }

  //////////////////////////////////////////////////////////////////
  return (
    <Sheet size="large">
      <form onSubmit={e => e.preventDefault()}>
        <div className={classes.signup_main}>
          <h2 className={classes.signup_title}>회원가입</h2>
          <div>
            <font size="3" color="#f0b622">
              {' '}
              *
              <font size="2" color="#7a8982">
                은 필수 입력
              </font>
            </font>
          </div>
          <p>이건 회원가입2인데요 아직 완성안했어요</p>
          <div>
            <Input id="이름" type="text" placeholder="본명을 입력해주세요" />
          </div>
          <div>
            <Input
              id="닉네임"
              type="text"
              placeholder="2자 이상을 입력해주세요. 특수문자를 입력할 수 없어요"
            />
          </div>
          <div>
            <Input
              id="휴대폰 번호"
              type="text"
              placeholder="전화번호 (하이픈 제외)"
            />
          </div>
          <div>
            <Input
              id="비밀번호확인"
              type="password"
              placeholder="비밀번호 확인"
            />
          </div>
          <div></div>
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
export default SignupForm2
