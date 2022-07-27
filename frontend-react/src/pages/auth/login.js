import WelcomePicture from "../../components/common/WelcomePicture";
import LoginForm from "../../components/auth/LoginForm";
export default function LoginPage() {
  return (
    <div className="flex_row">
      <WelcomePicture></WelcomePicture>
      <div className="flex_row_center width_50">
        <LoginForm />
      </div>
    </div>
  );
}
