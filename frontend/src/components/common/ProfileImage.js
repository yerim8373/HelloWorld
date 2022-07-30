/**
 * 사용자 프로필 이미지 컴포넌트
 *
 * src {string}: 프로필 이미지 경로 혹은 URL
 * size {string}: 이미지 크기 (xSmall, small, medium, large, xLarge)
 */

import PropTypes from 'prop-types'
import classes from './ProfileImage.module.css'

const ProfileImage = ({ src, size }) => {
  return (
    <img
      className={`${classes.image} ${size ? classes[size] : ''}`}
      src={src}
      alt="프로필 이미지"
    />
  )
}

ProfileImage.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['xSmall', 'small', 'medium', 'large', 'xLarge']),
}

export default ProfileImage
