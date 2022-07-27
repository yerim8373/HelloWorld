import profile from "../../images/profile.jpg";
import classes from "./ProfileImage.module.css";

const ProfileImage = (props) => {
  return (
    <img
      className={classes.image}
      src={profile}
      width={props.width}
      height={props.height}
      alt="프로필 이미지"
    ></img>
  );
};

export default ProfileImage;
