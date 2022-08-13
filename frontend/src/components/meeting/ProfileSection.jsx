import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { BsGear } from 'react-icons/bs'
import CountryFlag from 'react-country-flag'
import Sheet from '../common/Sheet'
import Badge from '../common/Badge'
import Heart from '../common/Heart'
import classes from './ProfileSection.module.css'
import { useSelector } from 'react-redux'

function ProfileSection({ user }) {
  // 한줄소개
  // 이미지 파일
  // 하트
  // 컨츄리
  // 아직 반영안됨, 추후 이슈 개선 전까지는 해당 부분은 더미 데이터 활용하겠음

  const state = useSelector(state => state.user)
  return (
    <Sheet size="large">
      <div className={classes.profileContainer}>
        <div className={classes.mainInfoContainer}>
          <div className={classes.mainInfo}>
            <div className={classes.title}>
              <h1 className="title">
                안녕하세요, <strong>{state.name}</strong>님!
              </h1>
              {state.subscribed && <Badge />}
            </div>
            <div className={classes.description}>{user.description}</div>
          </div>
          <img src={user.avatar} alt="avatar" className={classes.avatar} />
        </div>
        <div className={classes.subInfo}>
          <div className={classes.subInfoContents}>
            <Heart count={user.heart} />
            <div className={classes.countryAndLanguages}>
              <CountryFlag
                svg
                countryCode="KR"
                className={classes.CountryFlag}
                style={{
                  width: '3rem',
                  height: '2rem',
                }}
              />
              <div className={classes.languages}>
                {state.languages &&
                  state.languages.map(({ language }) => (
                    <div key={language.lan} className={classes.language}>
                      {language.lan}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <NavLink to="/settings/profile" className={classes.SettingsIcon}>
            <BsGear />
          </NavLink>
        </div>
      </div>
    </Sheet>
  )
}

ProfileSection.propTypes = {
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

export default ProfileSection
