"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import CaseExamples from "@/components/case-examples"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"

export default function Home() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImages((prev) => [...prev, imageUrl])
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero onImageUpload={handleImageUpload} />
      <CaseExamples />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  )
}
