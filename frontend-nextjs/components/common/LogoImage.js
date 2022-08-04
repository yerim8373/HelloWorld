import Image from "next/image";
import logoBlack from "../../public/assets/images/logo_black.svg";
import logoWhite from "../../public/assets/images/Logo_white.svg";
import logoBlackFill from "../../public/assets/images/logo_black_fill.svg";

const LogoImage = (props) => {
  let color = "";
  switch (props.color) {
    case "logoBlack": {
      color = logoBlack;
      break;
    }
    case "logoWhite": {
      color = logoWhite;
      break;
    }
    case "logoBlackFill": {
      color = logoBlackFill;
      break;
    }
  }
  return (
    <Image
      src={color}
      width={props.width}
      height={props.height}
      alt="로고 이미지"
    ></Image>
  );
};

export default LogoImage;
