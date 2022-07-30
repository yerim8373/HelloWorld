import { useState } from 'react'
import { BsPlus } from 'react-icons/bs'
import PropTypes from 'prop-types'
import ProfileImage from './ProfileImage'
import classes from './ProfileImageSelector.module.css'

import default1 from '../../images/profile-default-1.png'
import default2 from '../../images/profile-default-2.png'
import default3 from '../../images/profile-default-3.png'
import default4 from '../../images/profile-default-4.png'
import default5 from '../../images/profile-default-5.png'
import default6 from '../../images/profile-default-6.png'

const imageList = [default1, default2, default3, default4, default5, default6]

/**
 * 이미지 추가 버튼 컴포넌트
 */
function AddImageBtn({ handleChange }) {
  const handleClick = () => {
    const $file = document.querySelector('input[type="file"]')
    $file.click()
  }

  return (
    <div className={classes.addImageBtn} onClick={handleClick}>
      <BsPlus />
      <input
        type="file"
        name="new-image"
        id="new-image"
        accept=".jpg,.png"
        onChange={handleChange}
      />
    </div>
  )
}

/**
 * 프로필 이미지 셀렉터 컴포넌트
 */
export default function ProfileImageSelector() {
  const [currImage, setCurrImage] = useState(imageList[0])

  const handleClick = e => {
    const idx = e.target.parentNode.dataset.idx
    setCurrImage(imageList[idx])
  }
  const handleChange = ({ target }) => {
    if (!target.files || !target.files[0]) return

    const reader = new FileReader()
    reader.onload = e => setCurrImage(e.target.result)
    reader.readAsDataURL(target.files[0])
  }

  return (
    <div className={classes.profileImageSelector}>
      <ProfileImage src={currImage} size="large" />
      <div className={classes.imageList}>
        {imageList.map((img, idx) => (
          <div
            key={img}
            data-idx={idx}
            className={`${classes.imageWrapper} ${
              currImage === img ? classes.selected : ''
            }`}
            onClick={handleClick}
          >
            <ProfileImage src={img} size="small" />
          </div>
        ))}
        <div className={classes.imageWrapper}>
          <AddImageBtn handleChange={handleChange} />
        </div>
      </div>
    </div>
  )
}

AddImageBtn.propTypes = {
  handleChange: PropTypes.func.isRequired,
}
