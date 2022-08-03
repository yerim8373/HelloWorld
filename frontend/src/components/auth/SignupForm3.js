import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Sheet from '../common/Sheet'
import Input from '../common/Input'
import Button from '../common/Button'
import classes from './SignupForm.module.css'
import SelectBox from '../common/SelectBox'
import ProfileImage from '../common/ProfileImage'
import ProfileImageSelector from '../common/ProfileImageSelector'
import Checkbox from '../common/Checkbox'
import Modal from '../common/Modal'

import PrivacyPolicyContainer from '../etc/PrivacyPolicyContainer'
//////////////////////////////////////////////////////////////////
function SignupForm3() {
  const navigate = useNavigate()
  function routerPushHandler() {
    navigate('/auth/signup4')
  }
  function routerPushHandler2() {
    navigate('/auth/signup2')
  }

  ///////////////////////
  const [modalState, setModalState] = useState(false)
  const handleModal = () => setModalState(!modalState)

  const contents = {
    content: (
      <PrivacyPolicyContainer
        handleModal={handleModal}
      ></PrivacyPolicyContainer>
    ),
  }

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
          <div>
            <p className={classes.signup_input_label}>사용 언어</p>
            <SelectBox></SelectBox>
          </div>
          <div>
            <p className={classes.signup_input_label}>프로필 이미지 </p>
            <ProfileImageSelector></ProfileImageSelector>
          </div>
          <div>
            <Checkbox>
              <p>
                {' '}
                <span
                  className={classes.signup_find_info}
                  onClick={() => {
                    handleModal(true)
                  }}
                >
                  {' '}
                  개인정보 처리방침
                </span>
                에 동의합니다
              </p>
              <Modal
                opened={modalState}
                handleModal={handleModal}
                contents={contents}
                locked
                scroll={true}
              />
            </Checkbox>
          </div>
        </div>
        <div>
          <div>
            <tr>
              <td className={classes.signup_table_width}>
                <Button
                  size="small"
                  color="neutral"
                  onEvent={routerPushHandler2}
                  text="이전"
                />
              </td>
              <td className={classes.signup_table_width2}>
                {' '}
                <Button size="small" onEvent={routerPushHandler} text="다음" />
              </td>
            </tr>
          </div>
        </div>
      </form>
    </Sheet>
  )
}
export default SignupForm3

/*
export default function MeetingEntrySection() {
  const [modalState, setModalState] = useState(false)
  const handleModal = () => setModalState(!modalState)

  const contents = {
    content: <LoadingContainer handleModal={handleModal}></LoadingContainer>,
  }

  return (
    <>
      <Button text="랜덤 매칭 시작하기" onEvent={handleModal}></Button>
      <Modal
        opened={modalState}
        handleModal={handleModal}
        contents={contents}
        locked
      />
    </>
  )
}

*/
