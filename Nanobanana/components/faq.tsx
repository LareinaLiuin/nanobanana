"use client"

import { useState } from "react"

const faqItems = [
  {
    id: 1,
    question: "What is Nano Banana?",
    answer:
      "Nano Banana is an AI-powered image editing tool that uses advanced natural language models to transform images based on text prompts. Simply describe what you want, and our AI handles the complex editing automatically.",
  },
  {
    id: 2,
    question: "How does it work?",
    answer:
      "Upload an image, write a text description of how you want to edit it, and our advanced AI model processes your request and generates the edited image. The whole process typically takes just a few seconds.",
  },
  {
    id: 3,
    question: "What image formats are supported?",
    answer:
      "We support PNG, JPG, WebP, and GIF formats. Maximum file size is 50MB. The higher the resolution of your original image, the better the quality of the edited output.",
  },
  {
    id: 4,
    question: "Is my data private?",
    answer:
      "Yes, we take privacy seriously. Your images are processed securely and are not stored or used to train our models. You can read more about our privacy policy on our website.",
  },
  {
    id: 5,
    question: "Can I use edited images commercially?",
    answer:
      "Yes! All images generated using Nano Banana are yours to use as you see fit, including commercial projects. Check our terms of service for full details.",
  },
  {
    id: 6,
    question: "How much does it cost?",
    answer:
      "We offer a free tier with limited edits per month. For professional use, we have affordable subscription plans starting at just $9/month with unlimited edits.",
  },
]

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null)

  const toggleOpen = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Everything you need to know about Nano Banana</p>
        </div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-primary transition"
            >
              <button
                onClick={() => toggleOpen(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition"
              >
                <span className="text-left font-semibold text-gray-900">{item.question}</span>
                <span className={`text-primary text-xl transition-transform ${openId === item.id ? "rotate-180" : ""}`}>
                  +
                </span>
              </button>
              {openId === item.id && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
