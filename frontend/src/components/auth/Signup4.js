import SignupPicture from '../../components/common/SignupPicture'
import SignupForm4 from '../../components/auth/SignupForm4'

const Signup4 = () => {
  return (
    <div className="flex_row">
      <SignupPicture></SignupPicture>
      <div className="flex_row_center width_50vw">
        <SignupForm4 />
      </div>
    </div>
  )
}

export default Signup4
