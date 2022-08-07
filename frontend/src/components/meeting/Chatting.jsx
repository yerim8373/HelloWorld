import { useRef } from 'react'
import Sheet from '../common/Sheet'
import classes from './Chatting.module.css'
import ChattingLog from './ChattingLog'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useState } from 'react'

const Chatting = ({ user }) => {
  const input = useRef()
  const [chat, setChat] = useState({
    messageList: [],
    message: '',
  })

  useEffect(() => {
    user.session.on('signal:chat', event => {
      const data = JSON.parse(event.data)
      let messageList = chat.messageList
      messageList.push({
        connetionId: event.from.connetionId,
        nickname: data.nickname,
        message: data.message,
      })
      setChat({ messageList: messageList })
    })
  }, [])

  return (
    <div className={classes.chatting}>
      <div className={classes.flex_item_log}>
        <Sheet>
          <div className={classes.chatting_logs}>
            <ChattingLog
              textData={{ userId: 'coffee', text: 'hello world' }}
            ></ChattingLog>
            <ChattingLog
              textData={{ userId: 'ssafy', text: 'what can i do for you?' }}
            ></ChattingLog>
            {/* <ChattingLog
              textData={{
                userId: 'ssafy',
                text: '얼마나 길게 써야 200px을 넘어가서 내려오려나 한번 봅시다얼마나 길게 써야 200px을 넘어가서 내려오려나 한번 봅시다 블라블라얼마나 길게 써야 200px을 넘어가서 내려오려나 한번 봅시다 블라블라',
              }}
            ></ChattingLog>
            <ChattingLog
              textData={{
                userId: 'ssafy',
                text: '얼마나 길게 써야 200px을 넘어가서 내려오려나 한번 봅시다얼마나 길게 써야 200px을 넘어가서 내려오려나 한번 봅시다 블라블라얼마나 길게 써야 200px을 넘어가서 내려오려나 한번 봅시다 블라블라',
              }}
            ></ChattingLog> */}
          </div>
        </Sheet>
      </div>
      <div className={classes.flex_item_input}>
        <Sheet size="small">
          <form
            className={classes.chatting_input_form}
            // onSubmit={chattingSubmitHandler}
          >
            <input className={classes.chatting_input} ref={input}></input>
            {/* <Button onEvent={sendMessageHandler}></Button> */}
          </form>
        </Sheet>
      </div>
    </div>
  )
}

Chatting.propTypes = {
  user: PropTypes.object,
}

export default Chatting
