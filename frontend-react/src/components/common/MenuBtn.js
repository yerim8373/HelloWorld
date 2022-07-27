import React from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";

import { NavLink, useMatch } from "react-router-dom";

import classes from "./MenuBtn.module.css";
const MenuBtn = (props) => {
  const match = useMatch(props.link);

  return (
    <NavLink to={props.link}>
      <h4
        className={
          match
            ? classes.logo_active + " " + classes.logo_brand
            : classes.logo_brand
        }
      >
        {props.text}
      </h4>
    </NavLink>
  );
};

export default MenuBtn;
