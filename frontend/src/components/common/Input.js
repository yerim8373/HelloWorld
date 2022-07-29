//email input 맞춤형 컴포넌트 진행

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classes from './Input.module.css'

function Input({ email, type, placeholder }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    if (email.length === 0) {
      setError(true)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={classes.input_wrapper}>
          <label className={classes.input_label} htmlFor={email}>
            {email}
          </label>

          <input
            className={classes.input}
            name={email}
            type={type ? type : 'text'}
            placeholder={placeholder && placeholder}
            onChange={e => setValue(e.target.value)}
          />
        </div>
        {error && email.length <= 0 ? (
          <label>Email은 필수 입력칸입니다</label>
        ) : (
          ''
        )}
      </form>
    </>
  )
}

Input.propTypes = {
  email: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
}

export default Input

/*
import classes from './Input.module.css'
// import { Component, PropTypes } from 'react'
import React from 'react'
// Input-Component /////////////////////////
/// /////////////////////////////////////////
/// /////////////////////////////////////////
// 설정
// props.id
// label 이름, input name 속성, label for 속성 설정
// props.type (선택)
// 해당 input의 type 설정, 적용x 시 기본 값은 text
// props.placeHolder (선택)
// placeHolder 적용

function Input(props) {
  return (
    <div className={classes.input_wrapper}>
      <label className={classes.input_label} htmlFor={props.email}>
        {props.email}
      </label>
      <input
        className={classes.input}
        name={props.email}
        type={props.type ? props.type : 'text'}
        placeholder={props.placeholder && props.placeholder}
      />
    </div>
  )
}

export default Input

*/
