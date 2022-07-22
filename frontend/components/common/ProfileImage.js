import Image from "next/image";
import profile from "../../public/asset/images/profile.jpg";
import classes from "./ProfileImage.module.css";

const ProfileImage = (props) => {
  return (
    <Image
      className={classes.image}
      src={profile}
      width={props.width}
      height={props.height}
      alt="프로필 이미지"
    ></Image>
  );
};

export default ProfileImage;
