import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import classes from './Input.module.css'
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
// required 필수 입력 여부 (레이블 옆에 * 표시 추가)
// noLabel 레이블 표시 비활성화 여부

function Input({
  id,
  type = 'text',
  placeholder = '',
  onValid,
  onData,
  required,
  noLabel,
}) {
  const inputRef = useRef()
  const [errorComponent, setErrorComponent] = useState(null)

  let colorInputClass = ''
  let colorLabelClass = ''

  switch (errorComponent) {
    case null:
      colorInputClass = ''
      colorLabelClass = ''
      break
    case '':
      colorInputClass = classes.validInput
      colorLabelClass = classes.validLabel
      break
    default:
      colorInputClass = classes.invalidInput
      colorLabelClass = classes.invalidLabel
  }

  let checkValid
  function inputValidHandler() {
    clearTimeout(checkValid)
    checkValid = setTimeout(() => {
      let errorComponent = ''
      for (let func in onValid) {
        if (!onValid[func].func(inputRef.current.value)) {
          errorComponent = <ErrorComponent text={onValid[func].message} />
          break
        }
      }
      console.log('유효성 체크')
      setErrorComponent(errorComponent)
      onData({
        value: inputRef.current.value,
        valid: errorComponent === '' ? true : false,
      })
    }, 500)
  }

  return (
    <div className={classes.inputContainer}>
      {noLabel || (
        <label
          className={`${classes.inputLabel} ${colorLabelClass}`}
          htmlFor={id}
        >
          {id}
          {required && <span className={classes.requiredMark}>*</span>}
        </label>
      )}
      <input
        className={`${classes.input} ${colorInputClass}`}
        name={id}
        type={type}
        placeholder={placeholder}
        onKeyUp={inputValidHandler}
        ref={inputRef}
        tabIndex="-1"
      />
      {/* 에러가 렌더링 되는 창 */}
      {errorComponent && errorComponent}
    </div>
  )
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onValid: PropTypes.object,
  onData: PropTypes.func,
  required: PropTypes.bool,
  noLabel: PropTypes.bool,
}

export default Input

function ErrorComponent({ text }) {
  return <div className={classes.errorComponent}>{text}</div>
}

ErrorComponent.propTypes = {
  text: PropTypes.string.isRequired,
}
