import WelcomePicture from "../../components/common/WelcomePicture";
import Login from "../../components/auth/Login";
export default function LoginPage() {
  return (
    <div className="flex_row">
      <WelcomePicture></WelcomePicture>
      <div className="flex_row_center width_50">
        <Login />
      </div>
    </div>
  );
}
