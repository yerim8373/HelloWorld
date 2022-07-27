import React from 'react'
import classes from './Sheet.module.css'

// Sheet-Component //////////////////////
////////////////////////////////////////
////////////////////////////////////////

// 컴포지션 전용 래퍼 컴포넌트
// 컴포지션이란 ??
// 참고
// https://velog.io/@beberiche/React-props-props.children

// size: 시트 패딩의 크기 (small: 16px, medium: 32px, large: 64px)
// shallow: 시트 그림자 범위 축소

const Sheet = ({ children, size, shallow }) => {
  let padding
  switch (size) {
    case 'small':
      padding = '1rem'
      break
    case 'medium':
      padding = '2rem'
      break
    case 'large':
      padding = '4rem'
      break
    default:
      padding = '2rem'
  }

  return (
    <div
      className={`${classes.sheet} ${shallow && classes.shallow}`}
      style={{ padding }}
    >
      {children}
    </div>
  )
}

export default Sheet
