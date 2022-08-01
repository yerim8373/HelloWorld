import SignupPicture from '../../components/common/SignupPicture'
import SignupForm from '../../components/auth/SignupForm.js'

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
