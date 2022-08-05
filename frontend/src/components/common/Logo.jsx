import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import classes from './Logo.module.css'

import logoBlack from '../../images/logo-black.svg'
import logoWhite from '../../images/logo-white.svg'
import logoTextBlack from '../../images/logo-text-black.svg'
import logoTextWhite from '../../images/logo-text-white.svg'

const LogoImage = ({ color, size, withText }) => {
  let logo, textLogo

  if (color === 'white') {
    logo = logoWhite
    textLogo = logoTextWhite
  } else {
    logo = logoBlack
    textLogo = logoTextBlack
  }

  return (
    <div className={classes.logoContainer}>
      <img
        src={logo}
        alt="HelloWorld Logo"
        className={`${classes.logo} ${classes[size]}`}
      />
      {withText && (
        <NavLink to="/" className={classes.logoTextContainer}>
          <img
            src={textLogo}
            alt="HelloWorld Text"
            className={`${classes.logoText} ${classes[size]}`}
          />
        </NavLink>
      )}
    </div>
  )
}

LogoImage.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOf(['small', 'large']),
  withText: PropTypes.bool,
}

export default LogoImage
