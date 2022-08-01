import SignupPicture from '../../components/common/SignupPicture'
import SignupForm2 from '../../components/auth/SignupForm2.js'

const Signup2 = () => {
  return (
    <div className="flex_row">
      <SignupPicture></SignupPicture>
      <div className="flex_row_center width_50vw">
        <SignupForm2 />
      </div>
    </div>
  )
}

export default Signup2
