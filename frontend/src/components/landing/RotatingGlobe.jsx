import classes from './RotatingGlobe.module.css'
import earth from '../../images/earth.svg'
import people from '../../images/people.svg'
import SpeechBubble from './SpeechBubble'

export default function RotatingGlobe() {
  return (
    <div className={classes.rotatingGlobe}>
      <img src={earth} alt="earth" className={classes.earth} />
      <img src={people} alt="people" className={classes.people} />
      <SpeechBubble
        className={classes.bubble1}
        fill="var(--color-primary)"
        right
      />
      <SpeechBubble className={classes.bubble2} fill="var(--color-grey-300)" />
      <SpeechBubble
        className={classes.bubble3}
        fill="var(--color-grey-900)"
        right
      />
      <SpeechBubble className={classes.bubble4} fill="var(--color-caution)" />
    </div>
  )
}
