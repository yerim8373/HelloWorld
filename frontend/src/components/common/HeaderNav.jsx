import { useState } from 'react'

import { NavLink, useNavigate } from 'react-router-dom'
import MenuBtn from './MenuBtn'
import classes from './HeaderNav.module.css'
import Logo from './Logo'
import ProfileImage from './ProfileImage'
import Button from './Button'

import profile from '../../images/profile.jpg'
import { useSelector } from 'react-redux'

// import Link from "next/link";
// import { useRouter } from "next/router";

function HeaderNav() {
  const state = useSelector(state => state.user)

  // eslint-disable-next-line no-unused-vars
  // const [isLogined, setIsLogin] = useState(false)
  const navigate = useNavigate()

  function routerPushHandler() {
    navigate('/signup')
  }

  return (
    <nav className={`${classes.headerNav} ${state.id ? classes.auth : ''}`}>
      <div className={classes.navWrapper}>
        <div className={classes.HeaderNav_link_btns}>
          <Logo withText={!state.id} />
          {state.id && (
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
          )}
        </div>

        {state.id ? (
          // eslint-disable-next-line
          <ProfileImage src={profile} size="small" />
        ) : (
          <div
            className={`${classes.HeaderNav_link_btns} ${classes.hover_color}`}
          >
            <MenuBtn text="로그인" link="/login" />
            <Button
              size="small"
              text="회원가입"
              color="success"
              onEvent={routerPushHandler}
            />
            {/* <MenuBtn text="회원가입" link="/auth/signup"></MenuBtn> */}
          </div>
        )}
      </div>
    </nav>
  )
}

export default HeaderNav