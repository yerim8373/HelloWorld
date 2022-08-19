export function passwordConfirmValidLengthHandler(inputValue) {
  if (inputValue.trim().length < 8) {
    return false
  }
  return true
}
//////////////////////////
//password와 passwordconfirm이 동일한지 체크하는 요소가 필요
//////////////////////////
const passwordConfirmValidObj = {
  func0: {
    func: inputValue => passwordConfirmValidLengthHandler(inputValue),
    message: '비밀번호 확인은 8자 이상이어야 합니다.',
  },
}
