"use client"

import type React from "react"

import { useRef } from "react"

interface ImageUploadAreaProps {
  onImageUpload: (file: File) => void
}

export default function ImageUploadArea({ onImageUpload }: ImageUploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      onImageUpload(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      onImageUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="cursor-pointer p-8 border-2 border-dashed border-primary rounded-lg bg-yellow-50 hover:bg-yellow-100 transition text-center"
    >
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      <div className="text-4xl mb-3">📸</div>
      <h3 className="font-semibold text-gray-900 mb-2">Upload Your Image</h3>
      <p className="text-gray-600 text-sm">Drag and drop or click to select an image</p>
      <p className="text-gray-500 text-xs mt-2">Max 50MB • PNG, JPG, WebP</p>
    </div>
  )
}
