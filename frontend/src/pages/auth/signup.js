import SignupPicture from '../../components/common/SignupPicture'
import SignupForm from '../../components/auth/SignupForm.js'

export default function SignupPage() {
  return (
    <div className="flex_row">
      <SignupPicture></SignupPicture>
      <div className="flex_row_center width_50">
        <SignupForm />
      </div>
    </div>
  )
}

/*
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



*/
