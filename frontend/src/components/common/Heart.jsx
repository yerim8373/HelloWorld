import PropTypes from 'prop-types'
import { BsHeartFill } from 'react-icons/bs'
import classes from './Heart.module.css'

function Heart({ count }) {
  return (
    <div className={classes.heartContainer}>
      <div className={classes.heartIcon}>
        <BsHeartFill />
      </div>
      <div className="subtitle">{count}</div>
    </div>
  )
}

Heart.propTypes = {
  count: PropTypes.number.isRequired,
}

export default Heart
