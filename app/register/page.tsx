import styles from "./page.module.css";
import Link from "next/link";

export default function Register() {
  return (
    <main className={styles.main}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>LOGO</div>
        <ul className={styles.navLinks}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Shop</a>
          </li>
          <li>
            <a href="#">Info</a>
          </li>
          <li>
            <a href="#">About Us</a>
          </li>
        </ul>
        <div className={styles.searchIcon}>🔍</div>
      </nav>

      {/* Register Form */}
      <section className={styles.registerSection}>
        <div className={styles.registerForm}>
          <h2>WELCOME!</h2>
          <h3>User Register</h3>
          <form>
            <label htmlFor="username">User Name</label>
            <input type="text" id="username" name="username" required />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
            />
            <button type="submit">Register</button>
          </form>

          <p>Already have an account?</p>
          <Link href="/login" className={styles.loginBtn}>
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}
