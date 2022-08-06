import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import codes from 'country-calling-code'
import CountryFlag from 'react-country-flag'
import Dropdown from '../common/Dropdown'
import SelectBox from '../common/SelectBox'
import classes from './SignupForm.module.css'

const countries = codes.map(c => ({
  label: c.country,
  value: c.isoCode2,
}))

function SignupStep3({ step, handleNext }) {
  const [country, setCountry] = useState(countries[0].value)
  const handleChange = e => setCountry(e.target.value)

  useEffect(() => {
    handleNext({ country })
  }, [country])

  return (
    <div className={`${classes.signupStepContainer} ${classes['step' + step]}`}>
      <div className={classes.countryContainer}>
        <Dropdown
          id="국적"
          value={country}
          items={countries}
          handleChange={handleChange}
          placeholder="국적을 선택해주세요"
        />
        {country ? (
          <CountryFlag
            countryCode={country}
            svg
            style={{
              width: '3rem',
              height: '2rem',
            }}
            title={country}
            className={classes.countryFlag}
          />
        ) : (
          <div className={classes.countryFlag}></div>
        )}
      </div>

      <p className={classes.signup_input_label}>사용 언어</p>
      <SelectBox required />
    </div>
  )
}

SignupStep3.propTypes = {
  step: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
}

export default SignupStep3
