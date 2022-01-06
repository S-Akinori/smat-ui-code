import Link from "next/link"
import styles from "./index.module.css"

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/">Smart Ui Code</Link>
    </header>
  )
}

export default Header