import ProfileImage from '../common/ProfileImage'
import Badge from '../common/Badge'
import Input from '../common/Input'
import Heart from '../common/Heart'
import classes from './UserProfileForm.module.css'

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

export default function UserProfileForm() {
  return (
    <div className={classes.userProfileForm}>
      <h1>기본 프로필</h1>
      <div className={classes.mainProfileContainer}>
        <div className={classes.mainProfile}>
          <div className={classes.nameAndBadge}>
            <div className={classes.name}>{dummy.name}</div>
            <div className={classes.nickname}>{dummy.nickname}</div>
            {dummy.subscribed && <Badge />}
          </div>
          <Input id="자기소개" type="text" placeholder="한 줄 자기소개" />
          <Heart count={dummy.heart} />
        </div>
        <ProfileImage src={dummy.avatar} size="xLarge" />
      </div>
      <div className={classes.subProfileContainer}>
        <Input id="성별" type="text" placeholder="성별" />
        <Input id="나이" type="text" placeholder="나이" />
        <Input id="휴대폰 번호" type="text" placeholder="휴대폰 번호" />
        <Input id="이메일 주소" type="text" placeholder="이메일 주소" />
        <Input id="생일" type="text" placeholder="생일" />
        <Input id="국적" type="text" placeholder="국적" />
        <Input id="언어" type="text" placeholder="언어" />
      </div>
    </div>
  )
}
