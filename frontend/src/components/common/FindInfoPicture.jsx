//시간 단축을 위해서 일단 INFO_EMAIL에는 WELCOMEPICTURE를 우선적으로 배정

import classes from './FindInfoPicture.module.css'
import React from 'react'
import WelcomePicture2 from '../../images/Welcome.jpg'
//이 부분은 아직 추가되지 않았습니다?! 집가서 컴포넌트 만들고 진행해야핟듯?~

const FindInfoPicture = () => {
  return (
    <div className={classes.welcome_picture}>
      <img
        className={classes.image}
        src={WelcomePicture2}
        alt="welcomePicture"
      ></img>
    </div>
  )
}

export default FindInfoPicture
