import Link from "next/link"

const examples = [
  {
    id: 1,
    title: "Character Transformation",
    description: "Change clothing, hairstyle, and appearance with natural language prompts",
    image: "/person-wearing-different-outfits.jpg",
  },
  {
    id: 2,
    title: "Scene Editing",
    description: "Modify backgrounds and environments while keeping subjects intact",
    image: "/landscape-scene-transformation.jpg",
  },
  {
    id: 3,
    title: "Style Transfer",
    description: "Apply artistic styles and effects to your photos",
    image: "/photo-with-artistic-style-effect.jpg",
  },
  {
    id: 4,
    title: "Object Manipulation",
    description: "Add, remove, or modify objects in images seamlessly",
    image: "/object-manipulation-in-photo.jpg",
  },
]

export default function CaseExamples() {
  return (
    <section id="examples" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-2">GET STARTED</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Try The AI Editor</h2>
          <p className="text-lg text-gray-600">
            Experience the power of Nano Banana's natural language image editing. Transform any photo with simple text
            commands.
          </p>
        </div>

        {/* Grid of examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {examples.map((example) => (
            <div
              key={example.id}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition duration-300 border border-gray-200"
            >
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={example.image || "/placeholder.svg"}
                  alt={example.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{example.title}</h3>
                <p className="text-gray-600 mb-4">{example.description}</p>
                <Link
                  href="#"
                  className="inline-flex items-center text-primary hover:text-yellow-600 font-medium transition"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
