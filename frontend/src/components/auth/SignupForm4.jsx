import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../common/Checkbox'
import ProfileImageSelector from '../common/ProfileImageSelector'
import classes from './SignupForm.module.css'
import Modal from '../common/Modal'
import PrivacyPolicyContainer from '../etc/PrivacyPolicyContainer'

import default1 from '../../images/profile-default-1.png'
import default2 from '../../images/profile-default-2.png'
import default3 from '../../images/profile-default-3.png'
import default4 from '../../images/profile-default-4.png'
import default5 from '../../images/profile-default-5.png'
import default6 from '../../images/profile-default-6.png'

const imageList = [default1, default2, default3, default4, default5, default6]

function SignupStep4({ step, handleNext }) {
  const [profileImage, setProfileImage] = useState(imageList[0])
  const [accepted, setAccepted] = useState(false)
  const [modalState, setModalState] = useState(false)

  const handleChange = () => setAccepted(!accepted)
  const handleModal = () => setModalState(!modalState)
  const handleAccept = () => {
    if (modalState) setAccepted(!accepted)
    setModalState(!modalState)
  }

  useEffect(() => {
    handleNext({ profileImage, accepted })
  }, [profileImage, accepted])

  const contents = {
    content: (
      <PrivacyPolicyContainer accepted={accepted} handleModal={handleAccept} />
    ),
    actions: [],
  }

  return (
    <div className={`${classes.signupStepContainer} ${classes['step' + step]}`}>
      <ProfileImageSelector
        label="프로필 이미지"
        images={imageList}
        currImage={profileImage}
        handleImage={setProfileImage}
      />
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
  step: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
}

export default SignupStep4
