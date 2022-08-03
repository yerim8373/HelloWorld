import PropTypes from 'prop-types'
import Input from '../common/Input'
import RadioBtnGroup from '../common/RadioBtnGroup'
import classes from './SignupStep.module.css'

function SignupStep2({ step }) {
  return (
    <div className={`${classes.signupStepContainer} ${classes['step' + step]}`}>
      <Input id="이름" type="text" placeholder="본명을 입력해주세요" />
      <Input
        id="닉네임"
        type="text"
        placeholder="2자 이상을 입력해주세요. 특수문자를 입력할 수 없어요"
      />
      <Input
        id="휴대폰 번호"
        type="text"
        placeholder="전화번호 (하이픈 제외)"
      />
      <p className={classes.signup_input_label}>성별</p>
      <RadioBtnGroup
        name="gender"
        items={[
          { name: '남자', value: '남자' },
          { name: '여자', value: '여자' },
          { name: '그 외', value: '그 외' },
        ]}
      />
      <Input id="국적" type="text" placeholder="dropdown" />
    </div>
  )
}

SignupStep2.propTypes = {
  step: PropTypes.number,
}

export default SignupStep2
