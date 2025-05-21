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
  detail?: string;
}

export default function DashboardPage() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [folderName, setFolderName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // เพิ่ม state สำหรับรายละเอียดและแก้ไข
  const [editDetail, setEditDetail] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [showCreateFolderBox, setShowCreateFolderBox] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

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
    if (window.confirm("Are you sure you want to delete this image?")) {
      setImages(images.filter((image) => image.id !== imageId));
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    }
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
    if (
      selectedImages.length > 0 &&
      window.confirm("Are you sure you want to delete the selected images?")
    ) {
      setImages(images.filter((image) => !selectedImages.includes(image.id)));
      setSelectedImages([]);
    }
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
            <div
              className={styles.createFolderBox}
              onClick={() => setShowCreateFolderBox(true)}
            >
              <img
                src="https://img.icons8.com/?size=100&id=EwrafVcwf3ss&format=png&color=000000"
                alt="Create Folder"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span style={{ color: "#888" }}>New Folder</span>
            </div>
          </div>
          {showCreateFolderBox && (
            <div className={styles.modal}>
              <div className={styles.modalContent} style={{ maxWidth: 320 }}>
                <h3 style={{ marginBottom: 16 }}>Create New Folder</h3>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Folder name"
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    marginBottom: 16,
                  }}
                  autoFocus
                />
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    className={styles.actionButton}
                    onClick={() => {
                      if (newFolderName.trim()) {
                        setFolders([
                          ...folders,
                          { id: Date.now(), name: newFolderName.trim() },
                        ]);
                        setNewFolderName("");
                        setShowCreateFolderBox(false);
                      }
                    }}
                  >
                    Create
                  </button>
                  <button
                    className={styles.closeButton}
                    onClick={() => {
                      setShowCreateFolderBox(false);
                      setNewFolderName("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
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
                {selectedImages.length === images.length
                  ? "Unselect All"
                  : "Select All"}
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
                    onChange={(e) => {
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

      {previewImage && images.find((img) => img.url === previewImage) && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <img
              src={previewImage}
              alt="Preview"
              style={{ maxWidth: "80vw", maxHeight: "60vh" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                marginTop: 16,
              }}
            >
              <div
                style={{
                  minWidth: 220,
                  marginLeft: 24,
                  position: "relative",
                }}
              >
                {editMode ? (
                  <div
                    style={{
                      position: "relative",
                      padding: "1rem",
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                      background: "#f9fafb",
                    }}
                  >
                    <input
                      type="text"
                      value={editDetail}
                      onChange={(e) => setEditDetail(e.target.value)}
                      style={{ width: "100%", marginBottom: 8 }}
                    />
                    <button
                      className={styles.actionButton}
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        padding: 4,
                        minWidth: 0,
                      }}
                      onClick={() => {
                        setImages(
                          images.map((img) =>
                            img.url === previewImage
                              ? { ...img, detail: editDetail }
                              : img
                          )
                        );
                        setEditMode(false);
                      }}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      position: "relative",
                      padding: "1rem",
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                      background: "#f9fafb",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 14,
                        color: "#374151",
                        marginBottom: 8,
                      }}
                    >
                      {images.find((img) => img.url === previewImage)?.detail ||
                        "No detail"}
                    </div>
                    <button
                      className={styles.iconButton}
                      onClick={() => {
                        setEditDetail(
                          images.find((img) => img.url === previewImage)
                            ?.detail || ""
                        );
                        setEditMode(true);
                      }}
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                      title="Edit detail"
                    >
                      <img
                        src="https://img.icons8.com/?size=100&id=47749&format=png&color=000000"
                        alt="Edit"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <button
              className={styles.closeButton}
              onClick={() => {
                setPreviewImage(null);
                setEditMode(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
