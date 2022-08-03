import PropTypes from 'prop-types'
import Input from '../common/Input'
import SelectBox from '../common/SelectBox'
import classes from './SignupForm.module.css'
import Modal from '../common/Modal'

import PrivacyPolicyContainer from '../etc/PrivacyPolicyContainer'

function SignupStep3({ step }) {
  return (
    <div className={`${classes.signupStepContainer} ${classes['step' + step]}`}>
      <Input id="국적" type="text" placeholder="dropdown" />
      <p className={classes.signup_input_label}>사용 언어</p>
      <SelectBox />
    </div>
  )
}

SignupStep3.propTypes = {
  step: PropTypes.number,
}

export default SignupStep3
