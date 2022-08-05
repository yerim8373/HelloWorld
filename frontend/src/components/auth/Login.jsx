import WelcomePicture from '../common/WelcomePicture'
import LoginForm from './LoginForm'

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
