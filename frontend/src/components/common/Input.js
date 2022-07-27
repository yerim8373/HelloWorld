import classes from './Input.module.css'

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

function Input(props) {
  return (
    <div className={classes.input_wrapper}>
      <label className={classes.input_label} htmlFor={props.id}>
        {props.id}
      </label>
      <input
        className={classes.input}
        name={props.id}
        type={props.type ? props.type : 'text'}
        placeholder={props.placeholder && props.placeholder}
      />
    </div>
  )
}

export default Input
