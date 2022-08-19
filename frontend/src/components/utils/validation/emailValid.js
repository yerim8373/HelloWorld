export function emailValidHandler(inputValue) {
  const regxEmail = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  if (regxEmail.test(inputValue)) {
    return true
  }
  return false
}

const emailValidObj = {
  func0: {
    func: inputValue => emailValidHandler(inputValue),
    message: '올바른 이메일 형식이 아닙니다.',
  },
}
