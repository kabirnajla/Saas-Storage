import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>Cloud.me</div>
        <ul className={styles.navLinks}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <Link href="/login" className={styles.signIn}>
          Sign In
        </Link>

        <Link href="/register" className={styles.signupBtn}>
          register
        </Link>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>SaaS (Software-as-a-Service)</h1>
          <p>Securely store and share your files and images with Cloud.me</p>
          div className={styles.heroImage}
          <Image
            src="/cloud-illustration.png"
            alt="Cloud Illustration"
            width={500}
            height={300}
            priority
          />
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.services}>
        <h2>Our Services</h2>
        <div className={styles.serviceCards}>
          <div className={styles.card}>
            <h3>Image Hosting</h3>
            <p>
              Upload and share high-quality images with fast delivery and CDN
              support.
            </p>
          </div>
          <div className={styles.card}>
            <h3>File Storage</h3>
            <p>
              Securely store and manage your documents, videos, and more in the
              cloud.
            </p>
          </div>
          <div className={styles.card}>
            <h3>API Access</h3>
            <p>
              Integrate with our RESTful API to automate uploads and file
              management.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Cloud.me. All rights reserved.</p>
      </footer>
    </main>
  );
}
