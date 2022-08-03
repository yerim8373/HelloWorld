import { useState } from 'react'
import Modal from '../common/Modal'
import PrivacyPolicyContents from './PrivacyPolicyContents'

export default function MeetingEntrySection() {
  const [modalState, setModalState] = useState(false)
  const handleModal = () => setModalState(!modalState)

  const contents = {
    content: (
      <PrivacyPolicyContents handleModal={handleModal}></PrivacyPolicyContents>
    ),
  }

  return (
    <>
      <Modal
        opened={modalState}
        handleModal={handleModal}
        contents={contents}
        locked
      />
    </>
  )
}

//이게 사실 signup3으로 가야하는 내용임! 이걸 성찬오빠가 깃에 올리면 추가적으로 수정=> 충돌방지!!
