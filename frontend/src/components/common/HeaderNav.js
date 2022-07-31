import { useState } from 'react'

import { NavLink, useNavigate } from 'react-router-dom'
import MenuBtn from './MenuBtn'
import classes from './HeaderNav.module.css'
import LogoImage from './LogoImage'
import ProfileImage from './ProfileImage'
import Button from './Button'

// import Link from "next/link";
// import { useRouter } from "next/router";

function HeaderNav() {
  // 임시 로그인 용 useStaet
  // 후에 redux 공유객체로 바뀔 예정!

  // eslint-disable-next-line no-unused-vars
  const [isLogined, setIsLogin] = useState(true)
  const navigate = useNavigate()

  function routerPushHandler() {
    // router.push("/auth/signup");
    navigate('/auth/signup')
  }

  return (
    <nav className={classes.HeaderNav_nav}>
      <div className={classes.HeaderNav_link_btns}>
        <LogoImage color="logoWhite" width="50" height="50" />
        {isLogined ? (
          <div
            className={`${classes.HeaderNav_link_btns} ${classes.hover_color}`}
          >
            <MenuBtn text="홈" link="/meeting" />

            <MenuBtn
              className={classes.HeaderNav_link_focus}
              text="랜덤매칭"
              link="/meeting/loading"
            />
          </div>
        ) : (
          <NavLink to="/">
            <h3 className={classes.HeaderNav_brand}>HelloWorld</h3>
          </NavLink>
        )}
      </div>

      {isLogined ? (
        <ProfileImage src={profile} size="small" />
      ) : (
        <div
          className={`${classes.HeaderNav_link_btns} ${classes.hover_color}`}
        >
          <MenuBtn text="로그인" link="/auth" />
          <Button
            size="small"
            text="회원가입"
            color="success"
            onEvent={routerPushHandler}
          />
          {/* <MenuBtn text="회원가입" link="/auth/signup"></MenuBtn> */}
        </div>
      )}
    </nav>
  )
}

export default HeaderNav
