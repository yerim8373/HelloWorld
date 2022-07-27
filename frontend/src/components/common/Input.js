import classes from './Input.module.css'
import PropTypes from 'prop-types'
// Input-Component /////////////////////////
/// /////////////////////////////////////////
/// /////////////////////////////////////////

// props 설정
// props.id
// label 이름, input name 속성, label for 속성 설정
// props.type (선택)
// 해당 input의 type 설정, 적용x 시 기본 값은 text
// props.placeHolder (선택)
// placeHolder 적용

function Input({ id, type = 'text', placeholder = '' }) {
  return (
    <div className={classes.input_wrapper}>
      <label className={classes.input_label} htmlFor={id}>
        {id}
      </label>
      <input
        className={classes.input}
        name={id}
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
}

export default Input
