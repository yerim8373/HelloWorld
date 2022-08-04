export function ageValidHandler(inputValue) {
  let regxNum = /^[0-9]+$/
  if (!regxNum.test(inputValue)) {
    return false
  }
  return true
}

const ageValidObj = {
  func0: {
    func: inputValue => ageValidHandler(inputValue),
    message: '나이는 숫자만 입력하실 수 있습니다.',
  },
}
