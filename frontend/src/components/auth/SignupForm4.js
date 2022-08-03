import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import Checkbox from '../common/Checkbox'
import ProfileImageSelector from '../common/ProfileImageSelector'
import classes from './SignupForm.module.css'

function SignupStep3({ step }) {
  return (
    <div className={`${classes.signupStepContainer} ${classes['step' + step]}`}>
      <p className={classes.signup_input_label}>프로필 이미지 </p>
      <ProfileImageSelector />
      <Checkbox id="privacy-policy">
        <p>
          {' '}
          <NavLink to="/auth/find-info">
            <span className={classes.signup_find_info}> 개인정보 처리방침</span>
          </NavLink>
          에 동의합니다
        </p>
      </Checkbox>
    </div>
  )
}

SignupStep3.propTypes = {
  step: PropTypes.number,
}

export default SignupStep3
