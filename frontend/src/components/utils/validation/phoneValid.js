export function phoneValidHandler(inputValue) {
  let regxNum = /^[0-9]+$/
  if (!regxNum.test(inputValue)) {
    return false
  }
  return true
}

const phoneValidObj = {
  func0: {
    func: inputValue => phoneValidHandler(inputValue),
    message: '휴대폰 번호는 숫자만 입력하실 수 있습니다.',
  },
}
