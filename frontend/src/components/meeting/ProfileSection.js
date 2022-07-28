import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { BsHeart, BsGear } from 'react-icons/bs'
import Sheet from '../common/Sheet'
import classes from './ProfileSection.module.css'

function ProfileSection({ user }) {
  return (
    <Sheet size="large">
      <div className={classes.profileContainer}>
        <div className={classes.mainInfoContainer}>
          <div className={classes.mainInfo}>
            <div className={classes.title}>
              <h1 className="title">
                안녕하세요, <strong>{user.name}</strong>님!
              </h1>
              {user.subscribed && (
                <div className={classes.vipBadgeContainer}>
                  <div className={classes.vipBadge}>VIP</div>
                </div>
              )}
            </div>
            <div className={classes.description}>{user.description}</div>
          </div>
          <img src={user.avatar} alt="avatar" className={classes.avatar} />
        </div>
        <div className={classes.subInfo}>
          <div className={classes.subInfoContents}>
            <div className={classes.heartContainer}>
              <div className={classes.HeartIcon}>
                <BsHeart />
              </div>
              <div className="subtitle">{user.heart}</div>
            </div>
            <div className={classes.countryAndLanguages}>
              <div className={classes.tempCountryFlag}></div>
              <div className={classes.languages}>
                {user.languages.map(lang => (
                  <div key={lang} className={classes.language}>
                    {lang}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <NavLink to="/setting" className={classes.SettingsIcon}>
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
