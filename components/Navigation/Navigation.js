import Link from "next/link";
import styles from './style.module.css';

function Navigation() {
  return (
    <nav className={ styles.navigation }>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/gallery">Gallery</Link>
    </nav>
  );
}

export default Navigation;