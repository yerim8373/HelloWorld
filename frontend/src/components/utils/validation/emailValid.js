export function emailValidHandler(inputValue) {
  if (!inputValue.trim().includes('@')) {
    return false
  }
  return true
}

const emailValidObj = {
  func0: {
    func: inputValue => emailValidHandler(inputValue),
    message: '올바른 이메일 형식이 아닙니다.',
  },
}
