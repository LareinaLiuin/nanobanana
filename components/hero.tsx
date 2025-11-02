"use client"

import { useState } from "react"
import ImageUploadArea from "./image-upload-area"

interface HeroProps {
  onImageUpload: (imageUrl: string) => void
}

export default function Hero({ onImageUpload }: HeroProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string
      setUploadedImage(imageUrl)
      onImageUpload(imageUrl)
    }
    reader.readAsDataURL(file)
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Banana decorations */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">🍌</div>
      <div
        className="absolute bottom-20 right-10 text-6xl opacity-20 animate-bounce"
        style={{ animationDelay: "0.5s" }}
      >
        🍌
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header announcement */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-full border border-primary">
            <span className="text-sm font-medium text-primary">The AI model that outperforms Flux Context</span>
            <span className="text-primary">→</span>
          </div>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-6">Nano Banana</h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Transform any image with simple text prompts. Nano Banana's advanced model delivers consistent character
          editing and scene preservation that surpasses Flux Context. Experience the future of AI image editing.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="px-8 py-3 bg-primary text-gray-900 font-medium rounded-full hover:bg-yellow-500 transition">
            Start Editing
          </button>
          <button className="px-8 py-3 border-2 border-primary text-primary font-medium rounded-full hover:bg-yellow-50 transition">
            View Examples
          </button>
        </div>

        {/* Features */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>🎯</span>
            <span>One-shot editing</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⚡</span>
            <span>Multi-image support</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💬</span>
            <span>Natural language</span>
          </div>
        </div>

        {/* Upload Area */}
        <div className="max-w-2xl mx-auto">
          <ImageUploadArea onImageUpload={handleImageUpload} />

          {uploadedImage && (
            <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-primary">
              <div className="flex gap-6">
                <div className="flex-1">
                  <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-3">Edit Your Image</h3>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe how you want to transform this image..."
                    className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                  <button className="w-full mt-3 px-4 py-2 bg-primary text-gray-900 font-medium rounded-lg hover:bg-yellow-500 transition">
                    Generate Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
