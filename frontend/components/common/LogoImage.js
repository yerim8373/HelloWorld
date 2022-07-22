import Image from "next/image";
import logo from "../../public/asset/images/logo.svg";
import logoWhite from "../../public/asset/images/Logo_white.svg";

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
