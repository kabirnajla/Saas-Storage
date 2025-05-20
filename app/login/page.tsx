import styles from "./page.module.css";
import Link from "next/link";

export default function Login() {
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

      {/* Login Form */}
      <section className={styles.loginSection}>
        <div className={styles.loginForm}>
          <h2>WELCOME!</h2>
          <h3>User Login</h3>
          <form>
            <label htmlFor="username">User Name</label>
            <input type="text" id="username" name="username" required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
            <div className={styles.rememberMe}>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <button type="submit">Login</button>
          </form>

          <p>I haven’t got an account</p>
          <Link href="/register" className={styles.signupBtn}>
            Let’s go!
          </Link>
        </div>
      </section>
    </main>
  );
}
