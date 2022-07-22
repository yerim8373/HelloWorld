import { useCallback, useState } from "react";

import MenuBtn from "./MenuBtn";
import classes from "./HeaderNav.module.css";
import LogoImage from "./LogoImage";
import ProfileImage from "./ProfileImage";
import Button from "./Button";

import Link from "next/link";
import { useRouter } from "next/router";

const HeaderNav = () => {
  // 임시 로그인 용 useStaet
  // 후에 redux 공유객체로 바뀔 예정!
  const [isLogined, setIsLogin] = useState(false);
  const router = useRouter();

  function routerPushHandler() {
    router.push("/auth/signup");
  }

  return (
    <div className={classes.HeaderNav}>
      <nav className={classes.HeaderNav_nav}>
        <div className={classes.HeaderNav_link_btns}>
          <LogoImage color="black" width="50" height="50"></LogoImage>
          {isLogined ? (
            <div
              className={`${classes.HeaderNav_link_btns} ${classes.hover_color}`}
            >
              <MenuBtn text="홈" link="/meeting"></MenuBtn>
              <MenuBtn
                className={classes.HeaderNav_link_focus}
                text="랜덤매칭"
                link="/meeting/loading"
              ></MenuBtn>
            </div>
          ) : (
            <Link href="/">
              <h2 className={classes.HeaderNav_brand}>HelloWorld</h2>
            </Link>
          )}
        </div>

        {isLogined ? (
          <ProfileImage width="70" height="70" src="" />
        ) : (
          <div
            className={`${classes.HeaderNav_link_btns} ${classes.hover_color}`}
          >
            <MenuBtn text="로그인" link="/auth"></MenuBtn>
            <Button
              size="small"
              text="회원가입"
              onEvent={routerPushHandler}
            ></Button>
            {/* <MenuBtn text="회원가입" link="/auth/signup"></MenuBtn> */}
          </div>
        )}
      </nav>
    </div>
  );
};

export default HeaderNav;
