import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={classes.input_wrapper}>
      <label className={classes.input_label} htmlFor={props.id}>
        {props.id}
      </label>
      <input
        className={classes.input}
        name={props.id}
        type={props.type ? props.type : "text"}
        placeholder={props.placeholder && props.placeholder}
      />
    </div>
  );
};

export default Input;
