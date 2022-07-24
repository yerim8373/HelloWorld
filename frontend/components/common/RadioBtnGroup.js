import { useState } from 'react'
import classes from './RadioBtnGroup.module.css'

function RadioBtn({ id, name, children, selectedValue, handleChange }) {
  return (
    <label htmlFor={id} className={classes.radioBtn}>
      <input type="radio" name={name} id={id} value={id} checked={selectedValue === id} onChange={handleChange} className={classes.invisibleRadio} />
      <div className={classes.visibleRadio}>
        <div className={classes.outer}>
          <div className={classes.inner}></div>
        </div>
      </div>
      {children}
    </label>
  )
}

export default function RadioBtnGroup({ name, items }) {
  const [value, setValue] = useState(items[0].value)
  const handleChange = e => {
    console.log(e.target.value)
    setValue(e.target.value)
  }

  return (
    <div className={classes.radioBtnGroup}>
      {items.map(item => (
        <RadioBtn key={item.value} id={item.value} name={name} selectedValue={value} handleChange={handleChange}>{item.name}</RadioBtn>
      ))}
    </div>
  )
}
