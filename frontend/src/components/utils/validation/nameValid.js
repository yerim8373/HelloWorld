export function nameValidLengthHandler(inputValue) {
  if (inputValue.trim().length < 2) {
    return false
  }
  return true
}

const nameValidObj = {
  func0: {
    func: inputValue => nameValidLengthHandler(inputValue),
    message: '이름을 2자 이상 입력해주세요.',
  },
}
