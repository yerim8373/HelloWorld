import { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SignupPicture from '../common/SignupPicture'
import SignupForm1 from './SignupForm1'
import SignupForm2 from './SignupForm2'
import SignupForm3 from './SignupForm3'
import SignupForm4 from './SignupForm4'
import StepIndicator from '../common/StepIndicator'
import Sheet from '../common/Sheet'
import Button from '../common/Button'
import classes from './SignupContainer.module.css'

const MAX_STEP = 4
const fieldsByStep = [
  // ['email', 'password', 'passwordConfirm'],
  ['email', 'password'],
  ['name', 'nickname', 'callingCode', 'phone', 'gender', 'age'],
  // ['country', 'languages'],
  ['country'],
  ['profileImage', 'accepted'],
]

export default function SignupContainer() {
  const [step, setStep] = useState(1)
  const [created, setCreated] = useState(false)
  const [formData, setFormData] = useState({})

  const { search } = useLocation()
  const navigate = useNavigate()

  const moveToNext = () => {
    let isAllValid = true
    for (const field of fieldsByStep[step - 1]) {
      if (!formData[field]) {
        isAllValid = false
        break
      }
    }
    if (isAllValid) navigate(`/signup?step=${step + 1}`)
    else alert('현재 페이지의 모든 값을 입력해주세요.')
  }
  const moveToPrev = () => navigate(`/signup?step=${step - 1}`)
  const moveToLogin = () => navigate('/login')

  const handleSubmit = e => {
    e.preventDefault()

    let fields = []
    for (const fieldList of fieldsByStep) fields = fields.concat(...fieldList)

    let isAllValid = true
    for (const field of fields) {
      if (!formData[field]) {
        isAllValid = false
        break
      }
    }
    if (isAllValid) setCreated(true)
    else alert('입력되지 않은 값이 있습니다. 모든 값을 입력해주세요.')
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

    // 쿼리스트링이 없거나 범위 밖이라면 리다이렉트
    if (!currStep || currStep < 1 || currStep > MAX_STEP)
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
