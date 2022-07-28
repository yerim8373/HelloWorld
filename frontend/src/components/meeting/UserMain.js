import MainLeftArea from './MainLeftArea'
import PostSection from './PostSection'
import classes from './UserMain.module.css'

export default function UserMain() {
  const dummy = {
    name: '김싸피',
    nickname: 'HELLOWORLD',
    description: '처음 뵙겠습니다. 잘 부탁드립니다.',
    gender: '남자',
    age: 27,
    countryId: 82,
    mobileNumber: '010-0000-0000',
    email: 'example@example.com',
    birthday: '19950714',
    heart: 31,
    avatar: 'https://picsum.photos/128',
    subscribed: true,
    languages: ['한국어', '영어', '스페인어'],
  }

  return (
    <div className={`${classes.mainPageContainer} flex_row_center`}>
      <div className={classes.mainPageContents}>
        <MainLeftArea user={dummy}></MainLeftArea>
        <PostSection></PostSection>
      </div>
    </div>
  )
}
