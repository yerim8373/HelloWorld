//index.js = Dropdown.js
//app.js = auth/Findinfotestpage.js

import React from 'react'
import PropTypes from 'prop-types'

const Dropdown = ({ value, data, placeholder, onChange }) => {
  const handleChange = event => {
    const [value] = event.target
    onChange(value)
  }
  return (
    <div>
      <select value={value} className="form-control" onChange={handleChange}>
        <option value="">{placeholder}</option>
        {data.map((item, key) => (
          <option key={key} value={item.value}>
            {item.lable}
          </option>
        ))}
      </select>
    </div>
  )
}

Dropdown.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

Dropdown.defaultProps = {
  value: '',
  placeholder: '',
}
export default Dropdown
