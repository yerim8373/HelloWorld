import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Sheet from '../common/Sheet'
import Input from '../common/Input'
import Button from '../common/Button'
import classes from './SignupForm.module.css'

import Dropdown from '../common/Dropdown'

import RadioBtnGroup from '../common/RadioBtnGroup'
//단순히 넣기만 해도 오류뜹니다 => 다시확인하기

//////////////////////////////////////////////////////////////////
function SignupForm2() {
  const navigate = useNavigate()
  function routerPushHandler() {
    navigate('/auth/signup3')
  }
  function routerPushHandler2() {
    navigate('/auth/signup')
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
          <div></div>
          <p className={classes.signup_input_label}>성별</p>
          <div>
            <tr>
              <td>
                <RadioBtnGroup
                  items={[
                    { name: '남자', value: '남자' },
                    { name: '여자', value: '여자' },
                    { name: '그 외', value: '그 외' },
                  ]}
                ></RadioBtnGroup>
              </td>
            </tr>
          </div>
          <div>
            <tr>
              <td>
                <Input id="국적" type="text" placeholder="dropdown" />
              </td>
              <td>
                {/* <Input id="나이" type="text" placeholder="나이" /> */}
              </td>
            </tr>
          </div>
        </div>
        <div>
          <div>
            <tr>
              <td className={classes.signup_table_width}>
                <Button
                  size="small"
                  color="neutral"
                  className={classes.button_error}
                  onEvent={routerPushHandler2}
                  text="이전"
                />
              </td>
              <td className={classes.signup_table_width2}>
                <Button size="small" onEvent={routerPushHandler} text="다음" />
              </td>
            </tr>
          </div>
        </div>
      </form>
    </Sheet>
  )
}
export default SignupForm2
