import React, { useCallback, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Sheet from '../common/Sheet'
import Input from '../common/Input'
import Button from '../common/Button'
import classes from './LoginForm.module.css'

import { FcGoogle } from 'react-icons/fc'
import { RiKakaoTalkFill } from 'react-icons/ri'

import GoggleLogin from 'react-google-login'
import KakaoLogin from 'react-kakao-login'

import {
  emailLengthValidHandler,
  emailValidHandler,
} from '../utils/validation/emailValid'
import {
  passwordValidIncludeLetterHandler,
  passwordValidLengthHandler,
} from '../utils/validation/passwordValid'

import { inputObj } from '../utils/helper/inputObj'

import { useDispatch } from 'react-redux'
import { login } from '../../store/auth-thunkActions'
import {
  getLanguageData,
  getMyHeart,
  getUserData,
} from '../../store/user-thunkActions'

// 유효성 검사 설정
// useRef를 통한 현재 input 값 읽기
// useEffect를 통한 useRef 변경마다, 유효성 체크
// 디바운싱을 통한 최적화
// 조건에 따라, 부적합한 값인 경우, 그에 따른 알맞은 에러값 모두 송출
// 마음의 숙제 : 할 수 있다면 비즈니스 로직으로 빼서 처리하자!!

const emailValidObj = {
  func0: {
    func: inputValue => emailValidHandler(inputValue),
    message: '올바른 이메일 형식이 아닙니다.',
  },
  func1: {
    func: inputValue => emailLengthValidHandler(inputValue),
    message: '이메일을 입력해주세요.',
  },
}

const passwordValidObj = {
  func0: {
    func: inputValue => passwordValidLengthHandler(inputValue),
    message: '비밀번호는 8자 이상이어야 합니다.',
  },
  func1: {
    func: inputValue => passwordValidIncludeLetterHandler(inputValue),
    message: '비밀번호는 영문자,숫자,특수문자를 포함해야 합니다',
  },
}

function LoginForm() {
  const [email, setEmail] = useState(inputObj)
  const [password, setPassword] = useState(inputObj)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function routerPushHandler() {
    navigate('/signup')
  }

  const loginHandler = async () => {
    try {
      const userData = {
        email: email.value,
        password: password.value,
      }

      // 토큰 발급 받기
      const { payload } = await dispatch(login(userData))

      // User Data 가져오기
      await dispatch(getUserData(payload.data.accessToken))
      await dispatch(getLanguageData(payload.data.accessToken))
      await dispatch(getMyHeart(payload.data.accessToken))

      if (payload.data.accessToken) {
        navigate('/meeting')
      }
    } catch (error) {
      alert('로그인에 실패했습니다!')
    }
  }

  const loginErrorHandler = () => {
    alert('아이디 혹은 비밀번호가 유효하지 않습니다. 다시 작성해주세요')
  }

  return (
    <div>
      <Sheet size="large">
        <form
          onSubmit={e => {
            e.preventDefault()
            loginHandler()
          }}
        >
          <div className={classes.login_main}>
            <h2 className={classes.login_title}>로그인</h2>
            <div>
              <Input
                id="Email"
                type="email"
                placeholder="example@example.com"
                onValid={emailValidObj}
                onData={emailData => setEmail(emailData)}
              />
            </div>
            <div>
              <Input
                id="비밀번호"
                type="password"
                onValid={passwordValidObj}
                onData={passwordData => setPassword(passwordData)}
              />
            </div>
          </div>
          <div className={classes.login_btns}>
            <div>
              {email.valid && password.valid ? (
                <Button text="로그인" onEvent={loginHandler} />
              ) : (
                <Button
                  text="로그인"
                  color="neutral"
                  onEvent={loginErrorHandler}
                />
              )}
            </div>
            <div>
              <Button
                onEvent={routerPushHandler}
                color="recommend"
                text="회원가입"
              />
            </div>
          </div>
        </form>
        <div className={classes.auth_login_wrapper}>
          <GoggleLogin
            clientId="328089679872-9ta66fgsgan0e34jo3sflkcigcq29krt.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={response => console.log(response)}
            onFailure={response => console.log(response)}
            render={renderProps => (
              <button
                style={{
                  borderRadius: '25px',
                  width: '50px',
                  height: '50px',
                  border: 'none',
                  background: 'transparent',
                  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                }}
                onClick={renderProps.onClick}
              >
                <FcGoogle
                  style={{
                    fontSize: '1.3rem',
                    position: 'relative',
                    top: '3%',
                  }}
                />
              </button>
            )}
          ></GoggleLogin>
          <KakaoLogin
            clientId="d7451d7c4bae58ea8f09b10860ab199e"
            onSuccess={console.log}
            onFail={console.log}
            render={renderProps => (
              <button
                style={{
                  borderRadius: '25px',
                  width: '50px',
                  height: '50px',
                  border: 'none',
                  background: '#ffeb00',
                  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                }}
                onClick={renderProps.onClick}
              >
                <RiKakaoTalkFill
                  style={{
                    fontSize: '1.3rem',
                    position: 'relative',
                    top: '3%',
                  }}
                />
              </button>
            )}
          ></KakaoLogin>
        </div>
        <p className={classes.login_tip}>
          이메일이나 비밀번호를 잊었다면{' '}
          <NavLink to="/auth/find-info">
            <span className={classes.login_find_info}>여기</span>
          </NavLink>{' '}
          를 클릭하세요
        </p>
      </Sheet>
    </div>
  )
}

export default LoginForm
