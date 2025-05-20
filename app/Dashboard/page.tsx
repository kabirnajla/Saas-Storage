"use client";

import styles from "./page.module.css";
import { useState } from "react";

export default function Dashboard() {
  const [folders, setFolders] = useState<string[]>([]);

  const createFolder = () => {
    const folderName = prompt("ชื่อโฟลเดอร์ใหม่:");
    if (folderName) {
      setFolders([...folders, folderName]);
    }
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <button className={styles.newBtn} onClick={createFolder}>
          + ใหม่
        </button>
        <ul>
          <li>หน้าแรก</li>
          <li>กิจกรรม</li>
          <li>ไดรฟ์ของฉัน</li>
          <li>แชร์กับฉัน</li>
          <li>ล่าสุด</li>
          <li>ที่ติดดาว</li>
          <li>ถังขยะ</li>
        </ul>
      </aside>

      <main className={styles.mainContent}>
        <h1 className={styles.title}>Colab Notebooks</h1>
        {folders.length === 0 ? (
          <p className={styles.empty}>ยังไม่มีโฟลเดอร์</p>
        ) : (
          <div className={styles.grid}>
            {folders.map((folder, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.folderIcon}></div>
                <p>{folder}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
