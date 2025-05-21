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

interface Image {
  id: number;
  url: string;
}

export default function DashboardPage() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [folderName, setFolderName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const createFolder = () => {
    if (!folderName.trim()) return;
    const newFolder: Folder = {
      id: Date.now(),
      name: folderName,
    };
    setFolders([...folders, newFolder]);
    setFolderName("");
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files).map((file, index) => ({
        id: Date.now() + index,
        url: URL.createObjectURL(file),
      }));
      setImages([...images, ...newImages]);
    }
  };

  const toggleSelectImage = (imageId: number) => {
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.includes(imageId)
        ? prevSelectedImages.filter((id) => id !== imageId)
        : [...prevSelectedImages, imageId]
    );
  };

  const downloadImage = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "image.jpg";
    link.click();
  };

  const deleteImage = (imageId: number) => {
    setImages(images.filter((image) => image.id !== imageId));
    setSelectedImages(selectedImages.filter((id) => id !== imageId));
  };

  const downloadSelectedImages = () => {
    selectedImages.forEach((imageId) => {
      const image = images.find((img) => img.id === imageId);
      if (image) {
        downloadImage(image.url);
      }
    });
  };

  const deleteSelectedImages = () => {
    setImages(images.filter((image) => !selectedImages.includes(image.id)));
    setSelectedImages([]);
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
                <div
                  key={folder.id}
                  className={styles.folder}
                  onClick={() => setSelectedFolder(folder)}
                >
                  <img
                    src="https://img.icons8.com/?size=100&id=12160&format=png&color=000000"
                    alt="Folder Icon"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <span>{folder.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {selectedFolder && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{selectedFolder.name}</h2>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleUpload}
            />
            <div className={styles.imageActions}>
              <button
                className={styles.actionButton}
                onClick={downloadSelectedImages}
              >
                Download Selected
              </button>
              <button
                className={styles.actionButtonDanger}
                onClick={deleteSelectedImages}
              >
                Delete Selected
              </button>
              <button
                className={styles.actionButton}
                onClick={() => {
                  if (selectedImages.length === images.length) {
                    setSelectedImages([]);
                  } else {
                    setSelectedImages(images.map((img) => img.id));
                  }
                }}
              >
                {selectedImages.length === images.length ? "Unselect All" : "Select All"}
              </button>
            </div>
            <div className={styles.imageGrid}>
              {images.map((img) => (
                <div
                  key={img.id}
                  className={styles.imageCard}
                  onClick={() => setPreviewImage(img.url)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={img.url}
                    alt={`img-${img.id}`}
                    style={{ width: 120, height: 120, objectFit: "cover" }}
                  />
                  <input
                    type="checkbox"
                    checked={selectedImages.includes(img.id)}
                    onChange={e => {
                      e.stopPropagation();
                      toggleSelectImage(img.id);
                    }}
                    style={{ marginTop: 8 }}
                  />
                </div>
              ))}
            </div>
            <button
              className={styles.closeButton}
              onClick={() => setSelectedFolder(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {previewImage && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <img
              src={previewImage}
              alt="Preview"
              style={{ maxWidth: "80vw", maxHeight: "80vh" }}
            />
            <button
              className={styles.closeButton}
              onClick={() => setPreviewImage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
