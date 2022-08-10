import { useNavigate } from 'react-router-dom'
import MenuBtn from './MenuBtn'
import classes from './HeaderNav.module.css'
import Logo from './Logo'
import ProfileImage from './ProfileImage'
import Button from './Button'

import profile from '../../images/profile.jpg'
import { useSelector } from 'react-redux'

function HeaderNav() {
  const state = useSelector(state => state.user)

  const navigate = useNavigate()

  function routerPushHandler() {
    navigate('/signup')
  }
  function routerPushHandler2() {
    navigate('/')
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
          <>
            <Button size="small" text="Logout" onEvent={routerPushHandler2} />
            <ProfileImage src={profile} size="small" />
          </>
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
