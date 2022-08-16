import { useState } from 'react'
import useInterval from '../utils/hooks/useInterval'
import classes from './FourImages.module.css'
import talk2 from '../../images/talk2.jpg'
import talk3 from '../../images/talk3.jpg'
import talk4 from '../../images/talk4.jpg'
import talk5 from '../../images/talk5.jpg'

export default function FourImages() {
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState(5)

  const images = [talk2, talk3, talk4, talk5]

  useInterval(() => setIndex((index + 1) % images.length), 5000)
  useInterval(() => {
    if (count === 1) setCount(5)
    else setCount(count - 1)
  }, 1000)

  return (
    <div className={classes.fourImages}>
      <img src={images[index]} alt="img" className={classes.img} />
      <div className={classes.overlay}></div>
      <div className={classes.counterContainer}>
        <div className={classes.counter}></div>
        <div className={classes.countText}>{count}</div>
      </div>
    </div>
  )
}
