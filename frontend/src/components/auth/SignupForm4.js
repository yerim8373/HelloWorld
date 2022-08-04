import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../common/Checkbox'
import ProfileImageSelector from '../common/ProfileImageSelector'
import classes from './SignupForm.module.css'
import Modal from '../common/Modal'
import PrivacyPolicyContainer from '../etc/PrivacyPolicyContainer'

function SignupStep4({ step }) {
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
    <div className={`${classes.signupStepContainer} ${classes['step' + step]}`}>
      <p className={classes.signup_input_label}>프로필 이미지 </p>
      <ProfileImageSelector />
      <Checkbox id="privacy-policy">
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
  )
}

SignupStep4.propTypes = {
  step: PropTypes.number,
}

export default SignupStep4
