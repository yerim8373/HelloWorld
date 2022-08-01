import React from 'react'
import { NavLink } from 'react-router-dom'

const StepIndicator = () => {
  const steps = [
    {
      path: '/auth/signup1',
    },
    {
      path: '/auth/signup2',
    },
    {
      path: '/auth/signup3',
    },
  ]

  return (
    <div className="stepIndicator">
      {steps.map((step, index) => {
        return (
          <>
            <NavLink activeClassName="activeLink" key={index} to={step.path}>
              {index + 1}
            </NavLink>
            <hr />
          </>
        )
      })}
    </div>
  )
}

export default StepIndicator
