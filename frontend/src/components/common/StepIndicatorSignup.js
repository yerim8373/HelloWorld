// 코드의 StepIndicatorSignup = 영상 Signup.js
// 참고자료 : https://www.youtube.com/watch?v=F9sxRapfSsw

import React from 'react'
import { Route, Link } from 'react-router-dom'
import StepIndicator from './StepIndicator'

const StepIndicatorSignup = () => {
  return (
    <div className="signup">
      <div className="mainContainer">
        <StepIndicator />
        <div className="output">
          <Route exact path="/auth/signup">
            First step
          </Route>
          <Route exact path="/auth/signup2">
            Second step
          </Route>
          <Route exact path="/auth/signup3">
            Third step
          </Route>
        </div>
      </div>
    </div>
  )
}

export default StepIndicatorSignup
