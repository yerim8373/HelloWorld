import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../common/Checkbox'
import ProfileImageSelector from '../common/ProfileImageSelector'
import classes from './SignupForm.module.css'
import Modal from '../common/Modal'
import PrivacyPolicyContainer from '../etc/PrivacyPolicyContainer'

function SignupStep4({ step }) {
  const [accepted, setAccepted] = useState(false)
  const [modalState, setModalState] = useState(false)

  const handleChange = () => setAccepted(!accepted)
  const handleModal = () => setModalState(!modalState)
  const handleAccept = () => {
    if (modalState) setAccepted(!accepted)
    setModalState(!modalState)
  }

  const contents = {
    content: (
      <PrivacyPolicyContainer accepted={accepted} handleModal={handleAccept} />
    ),
    actions: [],
  }

  return (
    <div className={`${classes.signupStepContainer} ${classes['step' + step]}`}>
      <ProfileImageSelector label="프로필 이미지" />
      <Checkbox
        id="privacy-policy"
        checked={accepted}
        handleChange={handleChange}
        locked
      >
        <span
          className={classes.privacyPolicyLink}
          onClick={() => handleModal(true)}
        >
          개인정보 처리방침
        </span>
        에 동의합니다
        <Modal
          opened={modalState}
          handleModal={handleModal}
          contents={contents}
          scroll
        />
      </Checkbox>
    </div>
  )
}

SignupStep4.propTypes = {
  step: PropTypes.number,
}

export default SignupStep4
