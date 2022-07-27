import logoBlack from "../../images/logo_black.svg";
import logoWhite from "../../images/logo_white.svg";
import logoBlackFill from "../../images/logo_black_fill.svg";

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
    default:
      break;
  }
  return (
    <>
      <img
        src={color}
        width={props.width}
        height={props.height}
        alt="로고 이미지"
      ></img>
    </>
  );
};

export default LogoImage;
