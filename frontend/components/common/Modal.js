import { useState } from 'react'
import ModalPortal from './Portal'
import Button from './Button'
import classes from './Modal.module.css'

// TODO: Sheet 컴포넌트로 교체
function ModalSection({ children, opened, handleModal, contents }) {
  const closeModal = e => {
    const isClosable = [...e.target.classList].some(cls => cls === 'closable')
    if (opened && isClosable) handleModal()
  }
  
  return (
    <div className={`${classes.overlay} closable`} onClick={closeModal}>
      <section className={classes.modal}>
        {contents ? (
          <>
            <h1 className="subtitle">{contents.title}</h1>
            <div className={classes.content}>{contents.content}</div>
            <div className={classes.actions}>
              {
                contents.actions ? (
                  contents.actions.map((btn, index) => 
                    <Button key={index} text={btn.name} color={btn.color} onEvent={btn.action} closable />
                  )
                ) : <Button text="확인" onEvent={closeModal} closable />
              }
            </div>
          </>
        ) : (
          <>
            {children}
            <Button text="확인" onEvent={closeModal} closable />
          </>
        )}
      </section>
    </div>
  )
}

export default function Modal({ opened, ...rest }) {
  return (
    <ModalPortal>
      {opened && <ModalSection opened={opened} {...rest} />}
    </ModalPortal>
  )
}