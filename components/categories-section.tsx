import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const categories = [
  {
    name: "Termos",
    description: "Stanley, Waterdog, Lumilagro y mas",
    image: "/images/category-termos.jpg",
    href: "/categorias/termos",
    count: "6 productos",
  },
  {
    name: "Mates",
    description: "Ceramica, vidrio, acero, calabaza",
    image: "/images/category-mates.webp",
    href: "/categorias/mates",
    count: "6 productos",
  },
  {
    name: "Accesorios",
    description: "Bombillas, yerberas, kits y mas",
    image: "/images/category-accesorios.jpg",
    href: "/categorias/accesorios",
    count: "6 productos",
  },
]

export function CategoriesSection() {
  return (
    <section className="bg-secondary px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Categorias</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Encontra lo que <span className="text-primary">buscas</span>
            </h2>
          </div>
          <Link
            href="/categorias"
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground transition-colors hover:text-primary"
          >
            Ver todo
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {categories.map((category) => (
            <Link key={category.name} href={category.href} className="group relative overflow-hidden rounded-2xl bg-card">
              <div className="aspect-[5/6] overflow-hidden rounded-2xl">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground/70">{category.count}</span>
                <h3 className="mt-1 text-2xl font-bold text-primary-foreground sm:text-3xl">{category.name}</h3>
                <p className="mt-1 text-sm font-medium text-primary-foreground/80">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
