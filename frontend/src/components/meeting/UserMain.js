import MainLeftArea from './MainLeftArea'
import PostSection from './PostSection'
import classes from './UserMain.module.css'

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

const getTempPosts = num => {
  return new Array(num)
    .fill(0)
    .map((_, idx) => idx + 1)
    .map(id => ({
      id,
      author: 'Seongchan Kim',
      title: 'Dummy post ' + id,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus est, malesuada a tellus sit amet, sagittis iaculis nunc. Aliquam quis massa nec eros aliquam hendrerit. Vestibulum porttitor dictum velit sed vestibulum. Aliquam ac gravida purus. Nunc odio arcu, maximus eleifend ligula a, luctus porta quam. Proin in sem auctor, aliquet sem sit amet, eleifend ligula. Praesent eleifend egestas neque. Duis at dictum turpis. Nunc ullamcorper ante vitae enim interdum feugiat. Fusce ullamcorper tristique feugiat. In hac habitasse platea dictumst. Pellentesque vel tristique arcu. Mauris at molestie justo.',
      createdAt: '2022-07-27',
      updatedAt: '2022-07-28',
    }))
}

export default function UserMain() {
  return (
    <div className="flex_row_center">
      <div className={classes.mainPageContents}>
        <MainLeftArea user={dummy}></MainLeftArea>
        <PostSection posts={getTempPosts(9)}></PostSection>
      </div>
    </div>
  )
}
