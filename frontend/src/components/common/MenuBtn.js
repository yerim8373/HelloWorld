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
      <h4
        className={
          match
            ? classes.logo_active + ' ' + classes.logo_brand
            : classes.logo_brand
        }
      >
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
