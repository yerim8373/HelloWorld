import LogoImage from "./LogoImage";
import classes from "./HeaderNavAuth.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const HeaderNavAuth = () => {
  const router = useRouter();
  console.log(router.pathname.includes("find"));
  return (
    <div className={classes.HeaderNav}>
      <nav className={classes.HeaderNav_nav}>
        <div className={classes.HeaderNav_link_btns}>
          <LogoImage
            color={router.pathname.includes("auth") ? "logoBlack" : "logoWhite"}
            width="50"
            height="50"
          ></LogoImage>
          <Link href="/">
            <h3
              className={
                router.pathname.includes("find")
                  ? classes.HeaderNav_brand_black
                  : classes.HeaderNav_brand_white
              }
            >
              HelloWorld
            </h3>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default HeaderNavAuth;
