/* 죽은코드

import React, { useCallback, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../common/Button'
import classes from './LoginForm.module.css'

import { useDispatch } from 'react-redux'
import { logout } from '../../store/auth-thunkActions'
import { logout2 } from '../../store/user-thunkActions'


const [renewed, setRenewed] = useState(false)
const [resetData, setResetData] = useState(initialUserData)

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
          if (userData[`language${i}`]) {
            const lang = {
              fluent: 100 - 30 * (i - 1),
              language: {
                lan: languageData[userData[`language${i}`]],
                languageId: parseInt(userData[`language${i}`]),
              },
              priority: i,
              userLanId: i,
            }
            languageList.push(lang)
          }
        }

        // 프로필 이미지를 제외한 나머지를 객체로 통합 후 서버로 요청
        const resetData = {
          age: undefined,
          avatar: undefined,
          country: undefined,
          email: undefined,
          gender: undefined,
          mobileNumber: undefined,
          name: undefined,
          nickName: undefined,
          pw: undefined,
          languageList : undefined
        }

        await dispatch(signout(resetData))

        setRenewed(true)
      } catch (e) {
        console.error(e)
        alert('서버에 문제가 발생했습니다. 잠시 후에 다시 시도해주세요.')
      }
    },
  )
}

const handleNext = data => {
  setUserData(prev => {
    return {
      ...prev,
      ...data,
    }
  })
}

























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

    if (payload.data.accessToken) {
      navigate('/') //랜딩화면 ㄱ
    }
  }, [dispatch, email.value, navigate, password.value]) 
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
*/
