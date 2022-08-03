import React from 'react'
import PropTypes from 'prop-types'

import classes from './ChattingLog.module.css'

const DUMMY_USER_ID = 'ssafy'

const ChattingLog = ({ textData }) => {
  const check = textData.userId !== DUMMY_USER_ID
  return (
    <div
      className={`${classes.chatting_log} ${
        check ? '' : classes.right_aligned
      }`}
    >
      <span className={classes.chatting_log_text}> {textData.text}</span>
    </div>
  )
}

ChattingLog.propTypes = {
  textData: PropTypes.shape({
    userId: PropTypes.string,
    text: PropTypes.string,
  }),
}

export default ChattingLog
