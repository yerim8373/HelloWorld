import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import MenuBtn from './MenuBtn'
import classes from './HeaderNav.module.css'
import Logo from './Logo'
import ProfileImage from './ProfileImage'
import Button from './Button'

import profile from '../../images/profile.jpg'
import DropdownMenu from './DropdownMenu'

import { logout } from '../../store/auth-thunkActions'
import { logout2 } from '../../store/user-thunkActions'

//로그아웃 작성때 참고할 것 : 로그인과 로그아웃 핸들러 작성해둔 곳

function HeaderNav() {
  // const state = useSelector(state => state.user)
  const state = {
    id: 'test',
  }
  const [showMenu, setShowMenu] = useState(false)
  const [renewed, setRenewed] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const routerPushHandler = () => navigate('/signup')

  const LogouthandleSubmit = e => {
    e.preventDefault()

    logout(async () => {
      try {
        // 프로필 이미지를 제외한 나머지를 서버로 요청
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
          languageList: undefined,
        }

        await dispatch(logout(resetData))
        await dispatch(logout2(resetData))

        setRenewed(true)
      } catch (e) {
        console.error(e)
        alert('잠시 후에 다시 시도해주세요.')
      }
    })
  }

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
        navigate('/')
        console.log('로그아웃')
        setRenewed(renewed)
        //onClick = LogouthandleSubmit 이런식으로 누르면 작동되게됐으면좋겠는데??

        setShowMenu(!showMenu)
        //headernav가 이제 바뀌어야하는데...?????
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
