import { useState } from 'react'

export default function EmailValidation() {
  //이메일 확인
  const [message, setMessage] = useState('')
  //오류메시지 상태저장
  const [error, setError] = useState(null)

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleChange = event => {
    if (!isValidEmail(event.target.value)) {
      setError('Email이 적합한 형식이 아닙니다')
    } else {
      setError(null)
    }

    setMessage(event.target.value)
  }

  return (
    <div>
      <input
        id="message"
        name="message"
        value={message}
        onChange={handleChange}
      />

      {error && <h2 style={{ color: 'red', fontSize: 20 }}>{error}</h2>}
    </div>
  )
}
