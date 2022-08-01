import SignupPicture from '../../components/common/SignupPicture'
import SignupForm from '../../components/auth/SignupForm.js'
/*import StepIndicatorSignup from '../common/StepIndicatorSignup'*/

//나중에 여기에 stepindicator_signup.js import하기

const Signup = () => {
  return (
    <div className="flex_row">
      <SignupPicture></SignupPicture>
      <div className="flex_row_center width_50vw">
        <SignupForm />
      </div>
    </div>
  )
}

export default Signup

//우린 페이지를 정리정돈하고 여기에 넣는 거임 그니까 복잡하면 ㄴㄴ해
////////////////////
/*
import React from 'react'
import {Route, Link} from 'react-router-dom'
import StepIndicator from '../../components/common/StepIndicator'

const Signup = () => {
  return (
    <div className="signup">
      
  )
}
*/
