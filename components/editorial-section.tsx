import Link from "next/link"
import { ArrowRight } from "lucide-react"

const editorialImages = [
  {
    id: 1,
    image: "/images/category-termos.jpg",
    alt: "Termos personalizados",
    aspect: "aspect-[3/4]",
  },
  {
    id: 2,
    image: "/images/grabado-laser.jpg",
    alt: "Grabado laser de precision",
    aspect: "aspect-[4/5]",
  },
  {
    id: 3,
    image: "/images/category-mates.jpg",
    alt: "Mates artesanales",
    aspect: "aspect-[3/4]",
  },
]

export function EditorialSection() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nuestro trabajo</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Calidad que se <span className="text-primary">nota</span>
            </h2>
          </div>
          <Link
            href="/categorias"
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground transition-colors hover:text-primary"
          >
            Ver productos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3 lg:gap-6">
          {editorialImages.map((item, index) => (
            <Link
              key={item.id}
              href="/categorias"
              className={`group relative overflow-hidden rounded-2xl bg-muted ${item.aspect} ${index === 1 ? "sm:-mt-8" : ""}`}
            >
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-2xl bg-foreground/0 transition-colors group-hover:bg-foreground/10" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
