import logoBlack from '../../images/logo_black.svg'
import logoWhite from '../../images/logo_white.svg'
import logoBlackFill from '../../images/logo_black_fill.svg'

import PropTypes from 'prop-types'

const LogoImage = ({ color, width, height }) => {
  let currColor = ''
  switch (color) {
    case 'logoBlack': {
      currColor = logoBlack
      break
    }
    case 'logoWhite': {
      currColor = logoWhite
      break
    }
    case 'logoBlackFill': {
      currColor = logoBlackFill
      break
    }
    default:
      break
  }
  return (
    <>
      <img
        src={currColor}
        width={width}
        height={height}
        alt="로고 이미지"
      ></img>
    </>
  )
}

LogoImage.propTypes = {
  color: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
}

export default LogoImage
