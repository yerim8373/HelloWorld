import { Outlet } from 'react-router-dom'
import Sheet from '../common/Sheet'
import MenuBtn from '../common/MenuBtn'
import classes from './SettingsContainer.module.css'

export default function SettingsContainer() {
  const links = [
    {
      name: '프로필 수정',
      link: '/settings/profile',
    },
    {
      name: '비밀번호 변경',
      link: '/settings/password',
    },
    {
      name: '멤버십 구독',
      link: '/settings/subscribe',
    },
    {
      name: '하트 이력',
      link: '/settings/heart',
    },
  ]

  return (
    <div className={classes.settingsContainer}>
      <div className={classes.leftContainer}>
        <Sheet size="large">
          <div className={classes.menuContainer}>
            <div className={classes.safeItems}>
              {links.map(link => (
                <MenuBtn key={link.link} link={link.link} text={link.name} />
              ))}
            </div>
            <div className={classes.unsafeItem}>
              <MenuBtn link="/settings/withdrawal" text="회원 탈퇴" warning />
            </div>
          </div>
        </Sheet>
      </div>
      <div className={classes.rightContainer}>
        <Sheet size="large">
          <Outlet />
        </Sheet>
      </div>
    </div>
  )
}
