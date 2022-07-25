import LogoImage from "./LogoImage";
import classes from "./HeaderNavAuth.module.css";
import Link from "next/link";

const HeaderNavAuth = () => {
  return (
    <div className={classes.HeaderNav}>
      <nav className={classes.HeaderNav_nav}>
        <div className={classes.HeaderNav_link_btns}>
          <LogoImage color="logoBlack" width="50" height="50"></LogoImage>
          <h3 className={classes.HeaderNav_brand}>HelloWorld</h3>
        </div>
      </nav>
    </div>
  );
};

export default HeaderNavAuth;
