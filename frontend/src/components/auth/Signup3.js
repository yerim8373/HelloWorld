import SignupPicture from '../../components/common/SignupPicture'
import SignupForm3 from '../../components/auth/SignupForm3.js'

const Signup3 = () => {
  return (
    <div className="flex_row">
      <SignupPicture></SignupPicture>
      <div className="flex_row_center width_50vw">
        <SignupForm3 />
      </div>
    </div>
  )
}

export default Signup3
