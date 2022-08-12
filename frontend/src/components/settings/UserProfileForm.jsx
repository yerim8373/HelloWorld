import { useState } from 'react'
import { useSelector } from 'react-redux'
import codes from 'country-calling-code'
import CountryFlag from 'react-country-flag'
import ProfileImage from '../common/ProfileImage'
import Badge from '../common/Badge'
import Input from '../common/Input'
import Button from '../common/Button'
import Heart from '../common/Heart'
import classes from './UserProfileForm.module.css'
import RadioBtnGroup from '../common/RadioBtnGroup'
import {
  ageLengthValidHandler,
  ageValidHandler,
} from '../utils/validation/ageValid'
import { phoneValidHandler } from '../utils/validation/phoneValid'
import Dropdown from '../common/Dropdown'
import RenewDropdown from '../common/RenewDropdown'
import { countryValidHandler } from '../utils/validation/countryValid'

import countryData from '../utils/countries.json'
import languageData from '../utils/languages.json'

const dummy = {
  name: '김싸피',
  nickname: 'HELLOWORLD',
  description: '처음 뵙겠습니다. 잘 부탁드립니다.',
  gender: '남자',
  age: 27,
  countryId: 82,
  mobileNumber: '010-0000-0000',
  email: 'example@example.com',
  birthday: '19950714',
  heart: 31,
  avatar: 'https://picsum.photos/128',
  subscribed: true,
  languages: ['한국어', '영어', '스페인어'],
}

// 성별 리스트
const genderList = [
  { name: '남자', value: 'MALE' },
  { name: '여자', value: 'FEMALE' },
  { name: '그 외', value: 'ETC' },
]

// 국제전화 코드 리스트
const callingCodes = codes.map(c => ({
  label: `+${c.countryCodes} (${c.country})`,
  value: `+${c.countryCodes[0]}`,
}))

// 국가 리스트
const countries = codes
  .filter(c => countryData.find(cl => cl.code === c.isoCode2))
  .map(c => ({
    label: c.country,
    value: c.isoCode2,
  }))

// 나이 확인
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

// 핸드폰 확인
const phoneValidObj = {
  func0: {
    func: inputValue => phoneValidHandler(inputValue),
    message: '휴대폰 번호는 숫자만 입력하실 수 있습니다.',
  },
}

// 국가 유효성 확인
const countryValidObj = {
  func0: {
    func: dropdownValue => countryValidHandler(dropdownValue),
    message: '국가를 입력해주세요.',
  },
}

export default function UserProfileForm() {
  const state = useSelector(state => state.user)
  const [description, setDescription] = useState(dummy.description)
  const [gender, setGender] = useState(state.gender)
  const [age, setAge] = useState(state.age)
  const [callingCode, setCallingCode] = useState(
    state.mobileNumber.split(' ')[0],
  )
  const [mobileNumber, setMobileNumber] = useState(
    state.mobileNumber.split(' ')[1],
  )
  const [country, setCountry] = useState(state.country)

  const handleSubmit = e => {
    e.preventDefault()

    const formData = {
      description,
      gender,
      age,
      mobileNumber: `+${callingCode} ${mobileNumber}`,
      country,
    }
    console.log(formData)
  }
  const handleReset = e => {
    e.preventDefault()
    if (window.confirm('초기화 하시겠습니까?')) {
      setDescription(dummy.description)
      setGender(state.gender)
      setAge(state.age)
      setCallingCode(state.mobileNumber.split(' ')[0])
      setMobileNumber(state.mobileNumber.split(' ')[1])
      setCountry(state.country)
    }
  }

  return (
    <form className={classes.userProfileForm} onSubmit={e => e.preventDefault}>
      <h1>기본 프로필</h1>
      <div className={classes.mainProfileContainer}>
        <div className={classes.mainProfile}>
          <div className={classes.nameAndBadge}>
            <div className={classes.name}>{state.name}</div>
            <div className={classes.nickname}>{state.nickname}</div>
            {state.subscribe && <Badge />}
          </div>
          <Input
            id="자기소개"
            type="text"
            placeholder="한 줄 자기소개"
            defaultValue={dummy.description}
            onData={data => setDescription(data)}
          />
          <Heart count={dummy.heart} />
        </div>
        <ProfileImage src={dummy.avatar} size="xLarge" />
      </div>
      <div className={classes.subProfileContainer}>
        <RadioBtnGroup
          label="성별"
          name="gender"
          items={genderList}
          selected={gender}
          handleChange={e => setGender(e.target.value)}
        />
        <Input
          id="나이"
          type="text"
          placeholder="나이"
          defaultValue={state.age}
          onValid={ageValidObj}
          onData={data => setAge(data)}
        />
        <div className={classes.phoneInput}>
          <Dropdown
            id="휴대폰 번호"
            value={callingCode}
            items={callingCodes}
            handleChange={e => setCallingCode(e.target.value)}
            placeholder="국제전화 코드"
            required
          />
          <div className={classes.phoneNumber}>
            <Input
              id="휴대폰 번호 (실제 입력)"
              type="text"
              placeholder="휴대폰 번호 (하이픈 제외)"
              defaultValue={state.mobileNumber.split(' ')[1]}
              onValid={phoneValidObj}
              onData={data => setMobileNumber(data)}
              noLabel
            />
          </div>
        </div>
        <Input
          id="이메일 주소"
          type="text"
          placeholder="이메일 주소"
          defaultValue={state.email}
          disabled
        />
        <div className={classes.countryContainer}>
          <RenewDropdown
            id="국적"
            value={country}
            items={countries}
            handleChange={e => setCountry(e.target.value)}
            onValid={countryValidObj}
            placeholder="국적을 선택해주세요"
            onData={countryData => setCountry(countryData)}
          />
          {country ? (
            <CountryFlag
              countryCode={country}
              svg
              style={{
                width: '3rem',
                height: '2rem',
              }}
              title={country}
              className={classes.countryFlag}
            />
          ) : (
            <div className={classes.countryFlag}></div>
          )}
        </div>
        <Input
          id="언어"
          type="text"
          placeholder="언어"
          defaultValue={state.languages
            .map(({ language }) => language.lan)
            .join(', ')}
        />
      </div>
      <div className={classes.buttons}>
        <Button text="수정" size="small" onEvent={handleSubmit} />
        <Button
          text="초기화"
          size="small"
          color="neutral"
          onEvent={handleReset}
        />
      </div>
    </form>
  )
}
