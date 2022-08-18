import { NavLink } from 'react-router-dom'
import { BsGear } from 'react-icons/bs'
import CountryFlag from 'react-country-flag'
import Sheet from '../common/Sheet'
import Badge from '../common/Badge'
import Heart from '../common/Heart'
import classes from './ProfileSection.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getMyHeart } from '../../store/user-thunkActions'

function ProfileSection() {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    dispatch(getMyHeart(auth.token))
  }, [])

  return (
    <Sheet size="medium_large">
      <div className={classes.profileContainer}>
        <div className={classes.mainInfoContainer}>
          <div className={classes.mainInfo}>
            <div className={classes.title}>
              <h1 className="title">
                안녕하세요, <strong>{user.nickname}</strong>님!
              </h1>
              {user.subscribe && <Badge />}
            </div>
            <div className={classes.description}>
              {user.description
                ? user.description
                : '처음 뵙겠습니다. 잘 부탁드립니다.'}
            </div>
          </div>
          <img
            src={`${process.env.REACT_APP_API_URL}/api/v1/user/image/${user.avatar}`}
            alt="avatar"
            className={classes.avatar}
          />
        </div>
        <div className={classes.subInfo}>
          <div className={classes.subInfoContents}>
            <Heart count={user.heart} />
            <div className={classes.countryAndLanguages}>
              <CountryFlag
                svg
                countryCode={user.country}
                className={classes.CountryFlag}
                style={{
                  width: '3rem',
                  height: '2rem',
                }}
              />
              <div className={classes.languages}>
                {user.languages &&
                  user.languages.map(({ language }) => (
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

// user-slice 에서 받아오기 때문에 더이상 필요없음
// ProfileSection.propTypes = {
//   user: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     nickname: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     gender: PropTypes.string.isRequired,
//     age: PropTypes.number.isRequired,
//     countryId: PropTypes.number.isRequired,
//     mobileNumber: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     birthday: PropTypes.string.isRequired,
//     heart: PropTypes.number.isRequired,
//     avatar: PropTypes.string.isRequired,
//     subscribed: PropTypes.bool.isRequired,
//     languages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
//   }).isRequired,
// }

export default ProfileSection
