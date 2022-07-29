import { useState } from 'react'
import Button from '../common/Button'
import Modal from '../common/Modal'
import classes from './MeetingEntrySection.module.css'

export default function MeetingEntrySection() {
  const [modalState, setModalState] = useState(false)
  const handleModal = () => setModalState(!modalState)

  const contents = {
    content: '전세계의 대화 상대를 찾고 있는 중이에요.',
  }

  return (
    <>
      <div className={classes.meetingEntrySection}>
        <Button text="랜덤 매칭 시작하기" onEvent={handleModal}></Button>
      </div>
      <Modal
        opened={modalState}
        handleModal={handleModal}
        contents={contents}
      />
    </>
  )
}
