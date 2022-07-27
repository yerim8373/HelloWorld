/*추가작업 필요 */

import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Sheet from './Sheet'
import Button from './Button'
import classes from './FindInformationPage.module.css'

function FindInformationPage() {
  const navigate = useNavigate()
  function routerPushHandler() {
    navigate('/auth/find-email')
  }

  /*
  const contents = [
    {
      title: '찾고자 하는 정보를 선택해주세요',
      center: true,
    },
  ]
*/

  return (
    <form>
      <Sheet>
        <h2 className={classes.findinformationpage_title}>
          이메일을 잊어버리신 경우
        </h2>
        <Button
          onEvent={routerPushHandler.bind}
          color=""
          text="이메일 찾기로 이동"
        />
      </Sheet>
      <Sheet>
        <h2 className={classes.findinformationpage_title}>
          비밀번호를 잊어버리신 경우
        </h2>
        <Link to="/auth/find-password">
          <Button>비밀번호 찾기로 이동</Button>
        </Link>
      </Sheet>
      <>
        <p className={classes.login_tip}>
          데이터가 존재하지 않는 경우{' '}
          <NavLink to="/auth/sign-up">
            <span className={classes.find_info}>회원가입</span>
          </NavLink>{' '}
          을 진행해주세요
        </p>
        <p className={classes.login_tip}>
          로그인 페이지로 이동하시길 원하신다면{' '}
          <NavLink to="/auth">
            <span className={classes.find_info}>여기</span>
          </NavLink>{' '}
          를 눌러주세요
        </p>
      </>
    </form>
  )
}

export default FindInformationPage
