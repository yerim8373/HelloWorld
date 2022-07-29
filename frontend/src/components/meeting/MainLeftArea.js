import PropTypes from 'prop-types'
import ProfileSection from './ProfileSection'
import Button from '../common/Button'
import classes from './MainLeftArea.module.css'

function MainLeftArea({ user }) {
  return (
    <div className={classes.mainLeftArea}>
      <ProfileSection user={user}></ProfileSection>
      <Button text="랜덤 매칭 시작하기"></Button>
    </div>
  )
}

MainLeftArea.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    countryId: PropTypes.number.isRequired,
    mobileNumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    heart: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired,
    subscribed: PropTypes.bool.isRequired,
    languages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
}

export default MainLeftArea
