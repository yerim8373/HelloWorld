import PropTypes from 'prop-types'
import classes from './Dropdown.module.css'

const Dropdown = ({ id, value, data, placeholder, onChange }) => {
  const handleChange = event => {
    const { value } = event.target
    onChange(value)
  }
  return (
    <div className={classes.dropdownContainer}>
      <label htmlFor={id}>{id}</label>
      <select
        id={id}
        value={value}
        className="form-control"
        onChange={handleChange}
      >
        <option value="">{placeholder}</option>
        {data.map((item, key) => (
          <option key={key} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}

Dropdown.propTypes = {
  id: PropTypes.string,
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
