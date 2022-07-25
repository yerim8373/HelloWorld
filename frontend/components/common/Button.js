import React from "react";
import classes from "./Button.module.css";

const Button = ({ size, color, onEvent, text, closable = false}) => {
  let className = "";
  switch (size) {
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

  switch (color) {
    case "error":
      className += classes.button_error + " ";
      break;
    case "neutral":
      className += classes.button_neutral + " ";
      break;
    default:
      className += classes.button + " ";
      break;
  }

  if (closable) className += 'closable '

  return (
    <button className={className} onClick={onEvent}>
      {text}
    </button>
  );
};

export default Button;
