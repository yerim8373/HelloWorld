import ProfileSection from './ProfileSection'
import Button from '../common/Button'
import classes from './MainLeftArea.module.css'

export default function MainLeftArea({ user }) {
  return (
    <div className={classes.mainLeftArea}>
      <ProfileSection user={user}></ProfileSection>
      <Button text="랜덤 매칭 시작하기"></Button>
    </div>
  )
}
