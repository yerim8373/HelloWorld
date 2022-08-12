import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import MenuBtn from './MenuBtn'
import classes from './HeaderNav.module.css'
import Logo from './Logo'
import ProfileImage from './ProfileImage'
import Button from './Button'

import profile from '../../images/profile.jpg'
import DropdownMenu from './DropdownMenu'

function HeaderNav() {
  // const state = useSelector(state => state.user)
  const state = {
    id: 'test',
  }
  const [showMenu, setShowMenu] = useState(false)

  const navigate = useNavigate()
  const routerPushHandler = () => navigate('/signup')

  const globalClickHandler = ({ target }) => {
    if (!target.classList.contains('click-blocked')) setShowMenu(!showMenu)
  }
  const handleClick = () => setShowMenu(!showMenu)

  const items = [
    {
      text: '설정',
      action() {
        navigate('/settings/profile')
        setShowMenu(!showMenu)
      },
    },
    {
      text: '로그아웃',
      color: 'error',
      action() {
        console.log('로그아웃')
        setShowMenu(!showMenu)
      },
    },
  ]

  useEffect(() => {
    if (showMenu) {
      window.addEventListener('click', globalClickHandler)
    }

    return () => {
      window.removeEventListener('click', globalClickHandler)
    }
  }, [showMenu])

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
          <div className={classes.profileImageContainer}>
            <Button
              size="small"
              text="회원가입"
              color="success"
              onEvent={routerPushHandler}
            />
            <ProfileImage
              src={profile}
              size="small"
              handleClick={handleClick}
            />
            {showMenu && <DropdownMenu items={items} />}
          </div>
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
