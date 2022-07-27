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
// size: 시트 패딩의 크기 (small: 16px, medium(default): 32px, large: 64px)
// shallow: 시트 그림자 범위 축소

const Sheet = ({ children, size, shallow }) => {
  return (
    <section
      className={`${classes.sheet} ${size ? classes[size] : ''} ${
        shallow ? classes.shallow : ''
      }`}
    >
      {children}
    </section>
  )
}

Sheet.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default Sheet
