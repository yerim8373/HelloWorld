import React from 'react'
import classes from './Sheet.module.css'
import PropTypes from 'prop-types'

// Sheet-Component //////////////////////
////////////////////////////////////////
////////////////////////////////////////

// 컴포지션 전용 래퍼 컴포넌트
// 컴포지션이란 ??
// 참고
// https://velog.io/@beberiche/React-props-props.children

const Sheet = ({ children }) => {
  return <div className={classes.sheet}>{children}</div>
}

Sheet.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default Sheet
