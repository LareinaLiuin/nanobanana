const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Creative Director",
    company: "DesignStudio Co",
    content:
      "Nano Banana has revolutionized our workflow. What used to take hours now takes minutes. The results are consistently exceptional.",
    image: "/professional-woman-headshot.png",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    title: "Photographer",
    company: "Johnson Photography",
    content:
      "The natural language interface is intuitive and powerful. I can describe exactly what I want and the AI delivers. Absolutely game-changing.",
    image: "/professional-man-headshot.png",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    title: "Content Creator",
    company: "Creative Vision Studios",
    content:
      "I love how it preserves the essence of my images while making edits. It feels like having a professional editor at my fingertips 24/7.",
    image: "/professional-woman-smiling-headshot.png",
  },
  {
    id: 4,
    name: "Alex Kim",
    title: "Art Director",
    company: "Digital Dreams Agency",
    content:
      "The consistency and quality are unmatched. This is the future of image editing. I recommend it to every creative I know.",
    image: "/professional-headshot-person.png",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Loved by Creators</h2>
          <p className="text-lg text-gray-600">
            Join thousands of professionals who trust Nano Banana for their image editing needs
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition"
            >
              <div className="flex items-start gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-lg">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">
                    {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
