import PropTypes from 'prop-types'
import { BsHeart } from 'react-icons/bs'
import classes from './Heart.module.css'

function Heart({ count }) {
  return (
    <div className={classes.heartContainer}>
      <div className={classes.heartIcon}>
        <BsHeart />
      </div>
      <div className="subtitle">{count}</div>
    </div>
  )
}

Heart.propTypes = {
  count: PropTypes.number.isRequired,
}

export default Heart
