import React from "react";
import classes from "./Sheet.module.css";

// Sheet-Component //////////////////////
////////////////////////////////////////
////////////////////////////////////////

// 컴포지션 전용 래퍼 컴포넌트
// 컴포지션이란 ??
// 참고
// https://velog.io/@beberiche/React-props-props.children

const Sheet = (props) => {
  return <div className={classes.sheet}>{props.children}</div>;
};

export default Sheet;
