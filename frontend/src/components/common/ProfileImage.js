import profile from '../../images/profile.jpg'
import classes from './ProfileImage.module.css'

import PropTypes from 'prop-types'

const ProfileImage = ({ width, height }) => {
  return (
    <img
      className={classes.image}
      src={profile}
      width={width}
      height={height}
      alt="프로필 이미지"
    ></img>
  )
}

ProfileImage.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
}

export default ProfileImage
