import { useRef } from 'react'
import Sheet from '../common/Sheet'
import classes from './Chatting.module.css'
import ChattingLog from './ChattingLog'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useState } from 'react'

const Chatting = ({ openVidu }) => {
  const input = useRef()
  const [chat, setChat] = useState({
    messageList: [],
    message: '',
  })

  const { messageList, message } = chat
  // console.log(openVidu)

  useEffect(() => {
    if (openVidu.publisher) {
      openVidu.session.on('signal:chat', event => {
        const data = JSON.parse(event.data)
        messageList.push({
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          message: data.message,
        })
        setChat(prev => ({ ...prev, messageList }))
        console.log(messageList)
      })
    }
  }, [openVidu.publisher])

  function handleChange(event) {
    // console.log(chat.message)
    setChat(prev => ({
      ...prev,
      message: event.target.value,
    }))
  }

  function handlePresskey(event) {
    if (event.key === 'Enter') {
      sendMessage()
      event.target.value = ''
    }
  }

  function sendMessage() {
    if (chat.message) {
      const data = {
        message: chat.message,
        nickname: openVidu.myUserName,
      }
      openVidu.publisher.session.signal({
        data: JSON.stringify(data),
        type: 'chat',
      })
    }
    setChat(prev => ({
      ...prev,
      message: '',
    }))
  }

  return (
    <div className={classes.chatting}>
      <div className={classes.flex_item_log}>
        <Sheet>
          <div className={classes.chatting_logs}>
            {messageList.map(({ message, connectionId }, idx) => (
              <ChattingLog
                key={idx}
                textData={{
                  myStreamId: openVidu.session.connection.connectionId,
                  connectionId: connectionId,
                  message: message,
                }}
              ></ChattingLog>
            ))}
          </div>
        </Sheet>
      </div>
      <div className={classes.flex_item_input}>
        <Sheet size="small">
          <input
            className={classes.chatting_input}
            onChange={handleChange}
            onKeyUp={handlePresskey}
            ref={input}
          ></input>
        </Sheet>
      </div>
    </div>
  )
}

Chatting.propTypes = {
  openVidu: PropTypes.object,
}

export default Chatting
