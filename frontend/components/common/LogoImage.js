import Image from "next/image";
import logo from "../../public/assets/images/logo.svg";
import logoWhite from "../../public/assets/images/Logo_white.svg";

const LogoImage = (props) => {
  return (
    <Image
      src={props.color === "white" ? logoWhite : logo}
      width={props.width}
      height={props.height}
      alt="로고 이미지"
    ></Image>
  );
};

export default LogoImage;
