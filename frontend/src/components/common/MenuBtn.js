import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, useMatch } from 'react-router-dom'
import classes from './MenuBtn.module.css'

const MenuBtn = ({ link, text }) => {
  const match = useMatch(link)

  return (
    <NavLink
      to={link}
      className={`${classes.menuItem} ${match ? classes.active : ''}`}
    >
      {text}
    </NavLink>
  )
}

MenuBtn.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default MenuBtn
