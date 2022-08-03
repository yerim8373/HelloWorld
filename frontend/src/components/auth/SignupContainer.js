import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SignupPicture from '../../components/common/SignupPicture'
import SignupStep1 from './SignupStep1'
import SignupStep2 from './SignupStep2'
import SignupStep3 from './SignupStep3'
/*import StepIndicatorSignup from '../common/StepIndicatorSignup'*/
import Sheet from '../common/Sheet'
import Button from '../common/Button'
import classes from './SignupContainer.module.css'

//나중에 여기에 stepindicator_signup.js import하기

export default function SignupContainer() {
  const [step, setStep] = useState(1)
  const [created, setCreated] = useState(false)

  const { search } = useLocation()
  const navigate = useNavigate()

  const moveToNext = () => navigate(`/signup?step=${step + 1}`)
  const moveToPrev = () => navigate(`/signup?step=${step - 1}`)
  const moveToLogin = () => navigate('/auth')

  const handleSubmit = e => {
    e.preventDefault()
    console.log('대충 전체 유효성을 검사하는 로직')
    setCreated(true)
  }

  useEffect(() => {
    const queryString = new URLSearchParams(search)
    const currStep = queryString.get('step')

    // 쿼리스트링이 없거나 범위 밖이라면 리다이렉트
    if (!currStep || currStep < 1 || currStep > 3) navigate('/signup?step=1')

    setStep(parseInt(currStep))
  }, [search, navigate])

  return (
    <div className="flex_row">
      <SignupPicture></SignupPicture>
      <div className="flex_row_center width_50vw">
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
                <h1>회원가입 {step}</h1>
                <p>
                  <span className={classes.colored}>*</span>은 필수 입력
                </p>
              </header>
              <div className={classes.stepContainer}>
                <SignupStep1 step={step} />
                <SignupStep2 step={step} />
                <SignupStep3 step={step} />
              </div>
              <div className={classes.stepActions}>
                {step > 1 && (
                  <Button onEvent={moveToPrev} text="이전" color="neutral" />
                )}
                {step === 3 ? (
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
