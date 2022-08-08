import React from 'react'
import PropTypes from 'prop-types'

import classes from './ChattingLog.module.css'

const ChattingLog = ({ textData }) => {
  const check = textData.connectionId !== textData.myStreamId
  console.log(textData.connectionId, textData.myStreamId)
  return (
    <div
      className={`${classes.chatting_log} ${
        check ? '' : classes.right_aligned
      }`}
    >
      <span className={classes.chatting_log_text}> {textData.message}</span>
    </div>
  )
}

ChattingLog.propTypes = {
  textData: PropTypes.shape({
    myStreamId: PropTypes.string,
    connectionId: PropTypes.string,
    message: PropTypes.string,
  }),
}

export default ChattingLog
