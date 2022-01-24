import classes from './Header.module.css'
import badger from '../../media/badger.png'

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.hederContentContainer}>
        <div className={classes.logo}>Wordle Doodle</div>
        <img src={badger} className={classes.badger} alt="Badger" />
      </div>
    </header>
  )
}

export default Header
