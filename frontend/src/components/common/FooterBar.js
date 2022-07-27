import classes from './FooterBar.module.css'

export default function FooterBar() {
  const currYear = new Date().getFullYear()

  return (
    <footer className={classes.footerBar}>
      &copy; {currYear} HelloWorld. All rights reserved.
    </footer>
  )
}
