import React, { useCallback, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../common/Button'
import classes from './LoginForm.module.css'

import { useDispatch } from 'react-redux'
import { logout } from '../../store/auth-thunkActions'
import { getUserData, logout } from '../../store/user-thunkActions'
//13번째줄 이거는 그냥 유저 데이타를 가져오는 방식을 한다는건데 난 이미 store된 값을 가져와야하니까
//로그아웃에 유저 데이터가 필요하냐는 상반된 질문이 존재 u//그럼 어떻게만들어야하는거지??걍 이메일 비번 다빼도 괜찮은가??

// function Logout() {
//   const [email, setEmail] = useState(null)
//   const [password, setPassword] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = useCallback(async () => {
    const userData = {
      email: email.value,
      password: password.value,
    }

    // 토큰 발급 받기
    const { payload } = await dispatch(logout(userData))

    // User Data 가져오기
    await dispatch(getUserData(payload.data.accessToken))

    if (payload.data.accessToken) {
      navigate('/') //랜딩화면 ㄱ
    }
  }, [dispatch, email.value, navigate, password.value]) //이메일비번빼야하나??15번째줄참고

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          logoutHandler()
        }}
      >
        <div className={classes.login_btns}>
          <div>
            <Button text="로그아웃" color="neutral" onEvent={logoutHandler} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Logout
