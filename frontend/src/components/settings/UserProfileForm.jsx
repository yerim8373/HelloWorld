import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import {
  nickNameValidLengthHandler,
  nickNameValidOtherLetterHandler,
  nickNameValidStartLetterHandler,
} from '../utils/validation/nickNameValid'
import { languageValidHandler } from '../utils/validation/languageValid'
import {
  getLanguageData,
  getUserData,
  setImage,
  updateUser,
} from '../../store/user-thunkActions'

import countryData from '../utils/countries.json'
import languageData from '../utils/languages.json'

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

// 언어 리스트
const languages = languageData.map((lang, index) => ({
  value: index.toString(),
  label: lang,
}))

// 닉네임 확인
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

// 언어 유효성 확인
const languageValidObj = {
  func0: {
    func: dropdownValue => languageValidHandler(dropdownValue),
    message: '사용언어를 입력해주세요.',
  },
}

export default function UserProfileForm() {
  const user = useSelector(state => state.user)
  const { token } = useSelector(state => state.auth)

  const [profileImage, setProfileImage] = useState()
  const [description, setDescription] = useState(user.description || '')
  const [nickname, setNickname] = useState(user.nickname)
  const [gender, setGender] = useState(user.gender)
  const [age, setAge] = useState(user.age)
  const [callingCode, setCallingCode] = useState(
    user.mobileNumber.split(' ')[0],
  )
  const [mobileNumber, setMobileNumber] = useState(
    user.mobileNumber.split(' ')[1],
  )
  const [country, setCountry] = useState(user.country)
  const [language1, setLanguage1] = useState(
    user.languages[0].language.languageId.toString(),
  )
  const [language2, setLanguage2] = useState(
    user.languages[1]?.language.languageId.toString() ?? '0',
  )
  const [language3, setLanguage3] = useState(
    user.languages[2]?.language.languageId.toString() ?? '0',
  )

  const dispatch = useDispatch()

  const handleSubmit = async e => {
    try {
      e.preventDefault()

      // 사용 언어 정리
      const userLanList = []
      const myLanguages = [language1, language2, language3]
      for (let i = 1; i <= myLanguages.length; i++) {
        if (myLanguages[i - 1] === '0') continue
        const lang = {
          fluent: 100 - 30 * (i - 1),
          language: {
            lan: languageData[myLanguages[i - 1]],
            languageId: parseInt(myLanguages[i - 1]),
          },
          priority: i,
          userLanId: i,
        }
        userLanList.push(lang)
      }

      // 프로필 이미지 등록
      const res = await fetch(profileImage)
      const blob = await res.blob()
      const ext = blob.type.split('/')[1]
      const filename = new Date().getTime() + '.' + ext

      const imageFormData = new FormData()
      imageFormData.append('file', new File([blob], filename))

      const { payload: imagePayload } = await dispatch(setImage(imageFormData))

      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarSrc: imagePayload.data.src,
        description,
        nickname,
        gender,
        age,
        mobileNumber: `${callingCode} ${mobileNumber}`,
        country: countryData.find(c => c.code === country),
        userLanList,
        heart: user.heart,
      }

      // 서버로 전송
      const { payload } = await dispatch(updateUser({ token, userData }))
      if (!payload || payload.result !== 'success') {
        alert('서버에 문제가 발생했습니다. 잠시 후에 다시 시도해주세요.')
        return
      }

      // 사용자 정보 업데이트
      await dispatch(getUserData(token))
      await dispatch(getLanguageData(token))

      alert('프로필을 수정했습니다.')
    } catch (e) {
      console.error(e)
      alert('서버에 문제가 발생했습니다. 잠시 후에 다시 시도해주세요.')
    }
  }
  const handleReset = e => {
    e.preventDefault()
    if (window.confirm('초기화 하시겠습니까?')) {
      setDescription(user.description || '')
      setNickname(user.nickname)
      setGender(user.gender)
      setAge(user.age)
      setCallingCode(user.mobileNumber.split(' ')[0])
      setMobileNumber(user.mobileNumber.split(' ')[1])
      setCountry(user.country)
      setLanguage1(user.languages[0].language.languageId.toString())
      setLanguage2(user.languages[1]?.language.languageId.toString() ?? '0')
      setLanguage3(user.languages[2]?.language.languageId.toString() ?? '0')
    }
  }
  const handleClick = () => {
    const $file = document.querySelector('input[type="file"]')
    $file.click()
  }
  const handleImage = ({ target }) => {
    if (!target.files || !target.files[0]) return

    const reader = new FileReader()
    reader.onload = e => setProfileImage(e.target.result)
    reader.readAsDataURL(target.files[0])
  }

  useEffect(() => {
    const getProfileImage = async () => {
      setProfileImage(
        `${process.env.REACT_APP_API_URL}/api/v1/user/image/${user.avatar}`,
      )
    }
    getProfileImage()
  }, [user.avatar])

  return (
    <form className={classes.userProfileForm} onSubmit={e => e.preventDefault}>
      <h1>기본 프로필</h1>
      <div className={classes.mainProfileContainer}>
        <div className={classes.mainProfile}>
          <div className={classes.nameAndBadge}>
            <div className={classes.name}>{user.name}</div>
            <div className={classes.nickname}>{user.nickname}</div>
            {user.subscribe && <Badge />}
          </div>
          <Input
            id="자기소개"
            type="text"
            placeholder="한 줄 자기소개"
            defaultValue={description}
            onData={({ value, valid }) => valid && setDescription(value)}
          />
          <Heart count={user.heart} />
        </div>
        <div className={classes.profileImageContainer}>
          <ProfileImage src={profileImage} size="xLarge" />
          <div className={classes.profileImageCover} onClick={handleClick}>
            이미지 변경
            <input
              type="file"
              name="new-image"
              id="new-image"
              accept=".jpg,.png"
              onChange={handleImage}
            />
          </div>
        </div>
      </div>
      <div className={classes.subProfileContainer}>
        <Input
          id="이메일 주소"
          type="text"
          placeholder="이메일 주소"
          defaultValue={user.email}
          disabled
        />
        <Input
          id="닉네임"
          type="text"
          placeholder="닉네임"
          defaultValue={nickname}
          onValid={nicknameValidObj}
          onData={({ value, valid }) => valid && setNickname(value)}
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
          type="text"
          placeholder="나이"
          defaultValue={age}
          onValid={ageValidObj}
          onData={({ value, valid }) => valid && setAge(value)}
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
              defaultValue={mobileNumber}
              onValid={phoneValidObj}
              onData={({ value, valid }) => valid && setMobileNumber(value)}
              noLabel
            />
          </div>
        </div>
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
        <RenewDropdown
          id="1순위 사용 언어"
          value={language1}
          items={languages}
          onValid={languageValidObj}
          handleChange={e => setLanguage1(e.target.value)}
          placeholder="언어를 선택해주세요"
        />
        <RenewDropdown
          id="2순위 사용 언어"
          value={language2}
          items={languages}
          handleChange={e => setLanguage2(e.target.value)}
          placeholder="언어를 선택해주세요"
        />
        <RenewDropdown
          id="3순위 사용 언어"
          value={language3}
          items={languages}
          handleChange={e => setLanguage3(e.target.value)}
          placeholder="언어를 선택해주세요"
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
