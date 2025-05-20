"use client";

import React, { useState } from "react";
import {
  FileText,
  Image as ImageIcon,
  File,
  Home,
  Activity,
  HardDrive,
  Share2,
  Clock,
  Star,
  Trash2,
  Plus,
  Search,
  AlertCircle,
  FolderPlus,
} from "lucide-react";
import styles from "./page.module.css";

interface Folder {
  id: number;
  name: string;
}

export default function DashboardPage() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [folderName, setFolderName] = useState("");

  const createFolder = () => {
    if (!folderName.trim()) return;
    const newFolder: Folder = {
      id: Date.now(),
      name: folderName,
    };
    setFolders([...folders, newFolder]);
    setFolderName("");
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarItem}>
          <Home size={20} /> Home
        </div>
        <div className={styles.sidebarItem}>
          <Activity size={20} /> Activity
        </div>
        <div className={styles.sidebarItem}>
          <HardDrive size={20} /> My Drive
        </div>
        <div className={styles.sidebarItem}>
          <Share2 size={20} /> Shared with me
        </div>
        <div className={styles.sidebarItem}>
          <Clock size={20} /> Recent
        </div>
        <div className={styles.sidebarItem}>
          <Star size={20} /> Starred
        </div>
        <div className={styles.sidebarItem}>
          <Trash2 size={20} /> Trash
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.topBar}>
          <div className={styles.logo}>
            <FileText size={24} /> Drive Clone
          </div>
          <div className={styles.search}>
            <Search size={20} />
            <input type="text" placeholder="Search files..." />
          </div>
        </div>

        <div className={styles.folderActions}>
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="New folder name"
          />
          <button onClick={createFolder}>
            <FolderPlus size={18} /> New Folder
          </button>
        </div>

        <div className={styles.folderArea}>
          {folders.length === 0 ? (
            <div className={styles.emptyState}>
              <AlertCircle size={40} />
              <p>No folders yet. Create your first folder.</p>
            </div>
          ) : (
            <div className={styles.folderGrid}>
              {folders.map((folder) => (
                <div key={folder.id} className={styles.folder}>
                  <File size={24} />
                  <span>{folder.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
