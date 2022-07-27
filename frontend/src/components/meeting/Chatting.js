import React from 'react'
import Sheet from '../common/Sheet'
import classes from './Chatting.module.css'

const Chatting = () => {
  const chattingSubmitHandler = event => event.preventDefault()

  return (
    <div className={classes.chatting}>
      <div className={classes.flex_item_log}>
        <Sheet>
          <div className={classes.chatting_log}></div>
        </Sheet>
      </div>
      <div className={classes.flex_item_input}>
        <Sheet size="small">
          <form onSubmit={chattingSubmitHandler}>
            <input className={classes.chatting_input}></input>
          </form>
        </Sheet>
      </div>
    </div>
  )
}

export default Chatting
