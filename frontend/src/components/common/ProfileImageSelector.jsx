import { BsPlus } from 'react-icons/bs'
import PropTypes from 'prop-types'
import ProfileImage from './ProfileImage'
import classes from './ProfileImageSelector.module.css'

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
function ProfileImageSelector({ label, images, currImage, handleImage }) {
  const handleChange = ({ target }) => {
    if (!target.files || !target.files[0]) return

    const reader = new FileReader()
    reader.onload = e => handleImage(e.target.result)
    reader.readAsDataURL(target.files[0])
  }

  return (
    <div className={classes.profileImageSelector}>
      <div className={classes.label}>{label}</div>
      <ProfileImage src={currImage} size="large" />
      <div className={classes.imageList}>
        {images.map((img, idx) => (
          <div
            key={img}
            data-idx={idx}
            className={classes.imageWrapper}
            onClick={e => {
              const idx = e.target.parentNode.dataset.idx
              handleImage(images[idx])
            }}
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

ProfileImageSelector.propTypes = {
  label: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  currImage: PropTypes.string.isRequired,
  handleImage: PropTypes.func.isRequired,
}

export default ProfileImageSelector
