import { useState } from 'react'
import PropTypes from 'prop-types'

import classes from './Checkbox.module.css'

export default function Checkbox({ id, children, checked }) {
  const [checkState, setCheckState] = useState(checked ?? false)
  const handleChange = e => setCheckState(e.target.checked)

  return (
    <label htmlFor={id} className={classes.checkbox}>
      <input
        type="checkbox"
        id={id}
        className={classes.invisibleBox}
        checked={checkState}
        onChange={handleChange}
      />
      <div className={classes.visibleBox}>
        <div className={classes.backgroundBox} />
        <svg
          width="21"
          height="16"
          viewBox="0 0 21 16"
          xmlns="http://www.w3.org/2000/svg"
          className={`${classes.checkIcon} ${checkState && classes.checked}`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 11.4286L2.33333 6.85714L0 9.14286L7 16L21 2.28571L18.6667 0L7 11.4286Z"
          />
        </svg>
      </div>
      {children}
    </label>
  )
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.object,
  checked: PropTypes.bool,
}
