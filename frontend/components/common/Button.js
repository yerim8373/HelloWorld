import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  let className = "";
  switch (props.size) {
    case "large":
      className += classes.button_large + " ";
      break;
    case "middle":
      className += classes.button_middle + " ";
      break;
    case "small":
      className += classes.button_small + " ";
      break;
    default:
      className += classes.button_transparent + " ";
  }
  console.log(className);

  switch (props.color) {
    case "error":
      className += classes.button_error + " ";
      break;
    case "newtral":
      className += classes.button_newtral + " ";
      break;
    default:
      className += classes.button + " ";
      break;
  }
  console.log(className);

  return (
    <button className={className} onClick={props.onEvent}>
      {props.text}
    </button>
  );
};

export default Button;
