import PropTypes from 'prop-types'
import { useState } from 'react'
import Input from '../common/Input'
import RadioBtnGroup from '../common/RadioBtnGroup'
import classes from './SignupForm.module.css'

const genderList = [
  { name: '남자', value: '남자' },
  { name: '여자', value: '여자' },
  { name: '직접 입력', value: '직접 입력' },
]
function SignupStep2({ step }) {
  const [gender, setGender] = useState(genderList[0].value)
  const handleChange = e => setGender(e.target.value)

  return (
    <div className={`${classes.signupStepContainer} ${classes['step' + step]}`}>
      <Input id="이름" type="text" placeholder="본명을 입력해주세요" required />
      <Input
        id="닉네임"
        type="text"
        placeholder="2자 이상을 입력해주세요. 특수문자를 입력할 수 없어요"
        required
      />
      <Input
        id="휴대폰 번호"
        type="text"
        placeholder="전화번호 (하이픈 제외)"
        required
      />
      <RadioBtnGroup
        id="성별"
        name="gender"
        items={genderList}
        selected={gender}
        handleChange={handleChange}
      />
      {/* "직접 입력"을 클릭했을 때 렌더링 */}
      {/* <Input id="기타 성별" type="text" placeholder="성별을 입력해주세요" /> */}
      <Input
        id="나이"
        type="number"
        placeholder="나이를 입력해주세요"
        required
      />
    </div>
  )
}

SignupStep2.propTypes = {
  step: PropTypes.number,
}

export default SignupStep2
