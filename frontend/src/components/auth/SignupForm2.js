import { useState } from 'react'
import { inputObj } from '../utils/helper/inputObj'
import PropTypes from 'prop-types'
import Input from '../common/Input'
import RadioBtnGroup from '../common/RadioBtnGroup'
import classes from './SignupForm.module.css'
import {
  nameValidLengthHandler,
  nameValidHandler,
  nameValidOtherLetterHandler,
} from '../utils/validation/nameValid'
import {
  nickNameValidLengthHandler,
  nickNameValidOtherLetterHandler,
  nickNameValidStartLetterHandler,
} from '../utils/validation/nickNameValid'
import { phoneValidHandler } from '../utils/validation/phoneValid'
import {
  ageValidHandler,
  ageLengthValidHandler,
} from '../utils/validation/ageValid'

//이름 확인
const nameValidObj = {
  func0: {
    func: inputValue => nameValidLengthHandler(inputValue),
    message: '이름을 2자 이상 입력해주세요.',
  },
  func1: {
    func: inputValue => nameValidOtherLetterHandler(inputValue),
    message: '이름은 특수문자를 사용해서는 안됩니다.',
  },
  func2: {
    func: inputValue => nameValidHandler(inputValue),
    message: '이름은 한글 및 영어만 입력이 가능합니다',
  },
}

//닉네임 확인
const nicknameValidObj = {
  func0: {
    func: inputValue => nickNameValidLengthHandler(inputValue),
    message: '닉네임은 2자 이상이어야 합니다',
  },
  func1: {
    func: inputValue => nickNameValidOtherLetterHandler(inputValue),
    message: '닉네임은 특수문자를 사용해서는 안됩니다.',
  },
  func2: {
    func: inputValue => nickNameValidStartLetterHandler(inputValue),
    message: '닉네임의 첫문자는 영어 혹은 한글이어야 합니다.',
  },
}

//핸드폰 확인
const phoneValidObj = {
  func0: {
    func: inputValue => phoneValidHandler(inputValue),
    message: '휴대폰 번호는 숫자만 입력하실 수 있습니다.',
  },
}

//나이 확인
const ageValidObj = {
  func0: {
    func: inputValue => ageLengthValidHandler(inputValue),
    message: '나이를 입력해주세요.',
  },
  func1: {
    func: inputValue => ageValidHandler(inputValue),
    message: '나이는 숫자만 입력하실 수 있습니다.',
  },
}

const genderList = [
  { name: '남자', value: 'MALE' },
  { name: '여자', value: 'FEMALE' },
  { name: '그 외', value: 'ETC' },
]
function SignupStep2({ step }) {
  const [name, setName] = useState(inputObj)
  const [nickname, setNickname] = useState(inputObj)
  const [age, setAge] = useState(inputObj)
  const [gender, setGender] = useState(genderList[0].value)
  const [phone, setPhone] = useState(inputObj)

  return (
    <div className={`${classes.signupStepContainer} ${classes['step' + step]}`}>
      <Input
        id="이름"
        type="text"
        placeholder="본명을 입력해주세요"
        onValid={nameValidObj}
        onData={nameData => setName(nameData)}
        required
      />
      <Input
        id="닉네임"
        type="text"
        placeholder="2자 이상을 입력해주세요. 특수문자를 입력할 수 없어요"
        onValid={nicknameValidObj}
        onData={nicknameData => setNickname(nicknameData)}
        required
      />
      <Input
        id="휴대폰 번호"
        type="text"
        placeholder="전화번호 (하이픈 제외)"
        onValid={phoneValidObj}
        onData={phoneData => setPhone(phoneData)}
      />
      <RadioBtnGroup
        label="성별"
        name="gender"
        items={genderList}
        selected={gender}
        handleChange={e => setGender(e.target.value)}
      />
      <Input
        id="나이"
        type="number"
        placeholder="나이를 입력해주세요"
        onValid={ageValidObj}
        onData={ageData => setAge(ageData)}
        required
      />
    </div>
  )
}

SignupStep2.propTypes = {
  step: PropTypes.number,
}

export default SignupStep2
