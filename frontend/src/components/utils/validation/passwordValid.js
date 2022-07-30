export function passwordValidLengthHandler(inputValue) {
  if (inputValue.trim().length < 8) {
    return false
  }
  return true
}

export function passwordValidIncludeLetterHandler(inputValue) {
  const regxPassowrd = /^.*(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/
  if (!regxPassowrd.test(inputValue.trim())) {
    return false
  }

  return true
}

const passwordValidObj = {
  func0: {
    func: inputValue => passwordValidLengthHandler(inputValue),
    message: '비밀번호는 8자 이상이어야 합니다.',
  },
  func1: {
    func: inputValue => passwordValidIncludeLetterHandler(inputValue),
    message: '비밀번호는 영문자,숫자,특수문자를 포함해야 합니다',
  },
}
