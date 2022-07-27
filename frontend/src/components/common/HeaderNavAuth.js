import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import LogoImage from './LogoImage'
import classes from './HeaderNavAuth.module.css'

function HeaderNavAuth({ fixed = false, color }) {
  return (
    <nav className={fixed ? classes.HeaderNav_fixed : classes.HeaderNav_nav}>
      <div className={classes.HeaderNav_link_btns}>
        <LogoImage
          color={color === 'white' ? 'logoBlack' : 'logoWhite'}
          width="50"
          height="50"
        />
        <NavLink to="/">
          <h3
            className={
              color === 'white'
                ? classes.HeaderNav_brand_white
                : classes.HeaderNav_brand_black
            }
          >
            HelloWorld
          </h3>
        </NavLink>
      </div>
    </nav>
  )
}

HeaderNavAuth.propTypes = {
  fixed: PropTypes.bool,
  color: PropTypes.string.isRequired,
}

export default HeaderNavAuth
