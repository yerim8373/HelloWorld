import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signup } from '../../store/user-thunkActions'

import SignupPicture from '../common/SignupPicture'
import SignupForm1 from './SignupForm1'
import SignupForm2 from './SignupForm2'
import SignupForm3 from './SignupForm3'
import SignupForm4 from './SignupForm4'
import StepIndicator from '../common/StepIndicator'
import Sheet from '../common/Sheet'
import Button from '../common/Button'
import classes from './SignupContainer.module.css'

import countryData from '../utils/countries.json'
import languageData from '../utils/languages.json'

const MAX_STEP = 4
const fieldsByStep = [
  ['email', 'password', 'passwordConfirm'],
  ['name', 'nickname', 'callingCode', 'phone', 'gender', 'age'],
  ['country', 'language1'],
  ['profileImage', 'accepted'],
]
const initialFormData = {
  description: '처음 뵙겠습니다. 잘 부탁드립니다.',
}

export default function SignupContainer() {
  const [step, setStep] = useState(1)
  const [created, setCreated] = useState(false)
  const [formData, setFormData] = useState(initialFormData)

  const { search } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const checkValidation = (fields, success, failure) => {
    console.log(formData)

    let isAllValid = true
    for (const field of fields) {
      if (!formData[field]) {
        isAllValid = false
        break
      }
    }
    if (isAllValid) success()
    else failure()
  }

  const moveToNext = () =>
    checkValidation(
      fieldsByStep[step - 1],
      () => navigate(`/signup?step=${step + 1}`),
      () => alert('현재 페이지의 모든 값을 입력해주세요.'),
    )
  const moveToPrev = () => navigate(`/signup?step=${step - 1}`)
  const moveToLogin = () => navigate('/login')

  const handleSubmit = e => {
    e.preventDefault()

    let fields = []
    for (const fieldList of fieldsByStep) fields = fields.concat(...fieldList)

    checkValidation(
      fields,
      async () => {
        try {
          // TODO: 사용 언어 리스트의 fluent, userLanId 수정
          const languageList = []
          for (let i = 1; i <= 3; i++) {
            if (formData[`language${i}`]) {
              const lang = {
                fluent: 100 - 30 * (i - 1),
                language: {
                  lan: languageData[formData[`language${i}`]],
                  languageId: parseInt(formData[`language${i}`]),
                },
                priority: i,
                userLanId: i,
              }
              languageList.push(lang)
            }
          }

          const userData = {
            age: parseInt(formData.age),
            avatar: formData.profileImage,
            country: countryData.find(c => c.code === formData.country).id,
            email: formData.email,
            gender: formData.gender,
            mobileNumber: formData.callingCode + ' ' + formData.phone,
            name: formData.name,
            nickName: formData.nickname,
            pw: formData.password,
            languageList,
          }

          console.log(userData)
          await dispatch(signup(userData))
          // setCreated(true)
          // navigate('/signup?step=1')
          console.log('성공')
        } catch (e) {
          console.error(e)
          alert('서버에 문제가 발생했습니다. 잠시 후에 다시 시도해주세요.')
        }
      },
      () => alert('입력되지 않은 값이 있습니다. 모든 값을 입력해주세요.'),
    )
  }

  const handleNext = data => {
    setFormData(prev => {
      return {
        ...prev,
        ...data,
      }
    })
  }

  useEffect(() => {
    const queryString = new URLSearchParams(search)
    const currStep = queryString.get('step')

    // 쿼리스트링이 없거나 숫자 값이 아니거나 범위 밖이라면 리다이렉트
    if (!currStep || isNaN(currStep) || currStep < 1 || currStep > MAX_STEP)
      navigate('/signup?step=1')

    setStep(parseInt(currStep))
  }, [search, navigate])

  return (
    <div className="flex_row">
      <SignupPicture />
      <div className={`${classes.signupContainer} flex_row_center width_50vw`}>
        {created || <StepIndicator path="/signup" step={step} max={MAX_STEP} />}
        <Sheet size="large">
          {created ? (
            <div className={classes.successContainer}>
              <h1>회원가입이 완료되었습니다!</h1>
              <p>지금 바로 시작해볼까요?</p>
              <Button onEvent={moveToLogin} text="로그인 페이지로 이동" />
            </div>
          ) : (
            <form
              className={classes.formContainer}
              onSubmit={e => e.preventDefault()}
              noValidate
            >
              <header className={classes.stepHeader}>
                <h1>회원가입</h1>
                <p>
                  <span className={classes.colored}>*</span>은 필수 입력
                </p>
              </header>
              <div className={classes.stepContainer}>
                <SignupForm1 step={step} handleNext={handleNext} />
                <SignupForm2 step={step} handleNext={handleNext} />
                <SignupForm3 step={step} handleNext={handleNext} />
                <SignupForm4 step={step} handleNext={handleNext} />
              </div>
              <div className={classes.stepActions}>
                {step > 1 && (
                  <Button onEvent={moveToPrev} text="이전" color="neutral" />
                )}
                {step === MAX_STEP ? (
                  <Button onEvent={handleSubmit} text="가입하기" />
                ) : (
                  <Button onEvent={moveToNext} text="다음" />
                )}
              </div>
            </form>
          )}
        </Sheet>
      </div>
    </div>
  )
}
