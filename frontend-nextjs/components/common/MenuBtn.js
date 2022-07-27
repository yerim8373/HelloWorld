import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classes from "./MenuBtn.module.css";
const MenuBtn = (props) => {
  const router = useRouter();

  return (
    <Link href={props.link}>
      <h4
        className={
          router.pathname === props.link
            ? classes.logo_active + " " + classes.logo_brand
            : classes.logo_brand
        }
      >
        {props.text}
      </h4>
    </Link>
  );
};

export default MenuBtn;
