import PropTypes from 'prop-types'
import Dropdown from '../common/Dropdown'
import SelectBox from '../common/SelectBox'
import classes from './SignupForm.module.css'

const options = [
  { value: 'value 1', label: 'value 1' },
  { value: 'value 2', label: 'value 2' },
  { value: 'value 3', label: 'value 3' },
  { value: 'value 4', label: 'value 4' },
  { value: 'value 5', label: 'value 5' },
]

function SignupStep3({ step }) {
  const handleChange = e => {
    console.log(e)
  }

  return (
    <div className={`${classes.signupStepContainer} ${classes['step' + step]}`}>
      <Dropdown id="국적" value="" data={options} onChange={handleChange} />
      <p className={classes.signup_input_label}>사용 언어</p>

      <SelectBox required />
    </div>
  )
}

SignupStep3.propTypes = {
  step: PropTypes.number,
}

export default SignupStep3
