import React from "react";
import classes from "./Button.module.css";

// Button-Component ///////////////////////
///////////////////////////////////////////
///////////////////////////////////////////

// props
// size - large, middle, small, inherit(기본값, 부모 컴포넌트 크기 상속) 버튼 크기 조정
// color - error, neutral, success(기본값) 버튼 색 조정
// text - 버튼 이름 설정
// onEvent - 적용된 함수 실행
// closable (모달전용) - 모달이 보일 때 버튼이 안보이도록, 모달이 꺼지면 다시 버튼이 보임

const Button = ({ size, color, onEvent, text, closable = false }) => {
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
      className += classes.button_inherit + " ";
  }

  switch (color) {
    case "error":
      className += classes.button_error + " ";
      break;
    case "neutral":
      className += classes.button_neutral + " ";
      break;
    case "recommend":
      className += classes.button_recommend + " ";
      break;
    default:
      className += classes.button_success + " ";
  }

  if (closable) className += "closable ";

  return (
    <button className={className} onClick={onEvent}>
      {text}
    </button>
  );
};

export default Button;
