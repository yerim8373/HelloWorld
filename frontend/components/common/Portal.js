import { useState, useEffect } from 'react'
import reactDOM from 'react-dom'

const ModalPortal = ({ children }) => {
  const [domReady, setDomReady] = useState(false)

  useEffect(() => {
    setDomReady(true)
  }, [])
  
  if (domReady) {
    const $el = document.getElementById('modal-root')
    return reactDOM.createPortal(children, $el)
  } else {
    return null
  }
}

export default ModalPortal