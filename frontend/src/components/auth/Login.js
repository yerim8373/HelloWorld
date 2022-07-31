import WelcomePicture from '../../components/common/WelcomePicture'
import LoginForm from '../../components/auth/LoginForm'

const Login = () => {
  return (
    <div className="flex_row">
      <WelcomePicture></WelcomePicture>
      <div className="flex_row_center width_50vw">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
