import LogoImage from "./LogoImage";
import classes from "./HeaderNavAuth.module.css";
import { NavLink } from "react-router-dom";

const HeaderNavAuth = (props) => {
  return (
    <nav
      className={props.fixed ? classes.HeaderNav_fixed : classes.HeaderNav_nav}
    >
      <div className={classes.HeaderNav_link_btns}>
        <LogoImage
          color={props.color === "white" ? "logoBlack" : "logoWhite"}
          width="50"
          height="50"
        ></LogoImage>
        <NavLink to="/">
          <h3
            className={
              props.color === "white"
                ? classes.HeaderNav_brand_white
                : classes.HeaderNav_brand_black
            }
          >
            HelloWorld
          </h3>
        </NavLink>
      </div>
    </nav>
  );
};

export default HeaderNavAuth;
