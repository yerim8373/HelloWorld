import classes from "./WelcomePicture.module.css";
import React from "react";
import Image from "next/image";
import WelcomePicture2 from "../../public/assets/images/WelcomePicture2.jpg";
import LogoImage from "./LogoImage";

const WelcomePicture = () => {
  return (
    <div className={classes.welcome_picture}>
      <div className={classes.back_drop}>
        <LogoImage color="logoBlack" width="100" height="100"></LogoImage>
        <h4 className={classes.title}>
          HelloWorld와 함께 <br /> 전세계 사람들과 대화를 시작해볼까요??
        </h4>
        <p>로그인을 통해 지금 바로 시작해보세요!</p>
      </div>

      <Image
        className={classes.image}
        src={WelcomePicture2}
        alt="welcomePicture"
        layout="fill"
      ></Image>
    </div>
  );
};

export default WelcomePicture;
