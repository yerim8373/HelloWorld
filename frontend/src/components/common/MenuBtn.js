import React from 'react'
import PropTypes from 'prop-types'
// import Link from "next/link";
// import { useRouter } from "next/router";

import { NavLink, useMatch } from 'react-router-dom'

import classes from './MenuBtn.module.css'
const MenuBtn = ({ link, text }) => {
  const match = useMatch(link)

  return (
    <NavLink to={link}>
      <h4 className={`${classes.menuItem} ${match ? classes.active : ''}`}>
        {text}
      </h4>
    </NavLink>
  )
}

MenuBtn.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default MenuBtn
