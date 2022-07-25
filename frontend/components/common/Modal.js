import ModalPortal from './Portal'
import classes from './Modal.module.css'

export default function Modal({ children, opened, handleModal }) {
  return (
    <ModalPortal>
      {opened &&
        <div className={classes.overlay} onClick={handleModal}>
          <section className={classes.modal}>
            {children}
          </section>
        </div>
      }
    </ModalPortal>
  )
}