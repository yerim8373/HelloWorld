//지금 이 페이지는 회원가입 페이지로, auth/signup 이다.
//지금 복붙된 코드는 loginForm.js이다.
//이걸 피그마를 보고 하나씩 변경하면서 만들어야한다.
//css작업밖에없다는...데...?하지만 전혀아닌거같닫..

import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Sheet from '../common/Sheet'
import Input from '../common/Input'
import Button from '../common/Button'

import classes from './SignupForm.module.css'

//이제 다음페이지로 넘어갈 방법을 만들어주세요 나는 signup2라고 정해둠
function SignupForm() {
  const navigate = useNavigate()
  function routerPushHandler() {
    navigate('/auth/signup2')
  }

  return (
    <Sheet>
      <form onSubmit={e => e.preventDefault()}>
        <div className={classes.login_main}>
          <h2 className={classes.login_title}>회원가입</h2>
          <p className={classes.login_tip}>*은 필수 입력</p>
          <div>
            <Input id="Email" type="text" placeholder="example@example.com" />
          </div>
          <div>
            <Input id="비밀번호" type="password" />
          </div>
          <div>
            <Input
              id="비밀번호확인"
              type="password"
              placeholder="비밀번호 확인"
            />
          </div>
        </div>
        <div className={classes.login_btns}>
          <div>
            <Button text="다음" />
          </div>
        </div>
      </form>
    </Sheet>
  )
}

export default SignupForm
