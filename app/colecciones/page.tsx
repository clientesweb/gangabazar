import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const collections = [
  {
    name: "Termos",
    description: "Stanley, Waterdog, Lumilagro y botellas termicas. Todos personalizados con grabado laser.",
    image: "/images/category-termos.jpg",
    href: "/colecciones/termos",
  },
  {
    name: "Mates",
    description: "Ceramica, vidrio, acero, calabaza y silicona. El mate perfecto para cada estilo.",
    image: "/images/category-mates.webp",
    href: "/colecciones/mates",
  },
  {
    name: "Accesorios",
    description: "Bombillas, yerberas, azucareras, kits completos y bolsos materos.",
    image: "/images/category-accesorios.jpg",
    href: "/colecciones/accesorios",
  },
  {
    name: "Grabados",
    description: "Artículos personalizados con grabado laser. Diseños únicos para cada ocasión.",
    image: "/images/category-grabados.jpg",
    href: "/colecciones/grabados",
  },
]

export default function ColeccionesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Explora</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Nuestros <span className="text-primary">Productos</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base font-medium text-muted-foreground sm:text-lg">
              Termos, mates y accesorios personalizados con grabado laser. Todo lo que necesitas para disfrutar el mate.
            </p>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-3">
              {collections.map((collection) => (
                <Link
                  key={collection.name}
                  href={collection.href}
                  className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
                >
                  <img
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">{collection.name}</h2>
                    <p className="mt-3 text-sm font-medium text-primary-foreground/80">{collection.description}</p>
                    <span className="mt-4 inline-block text-xs font-bold uppercase tracking-widest text-primary-foreground/60 transition-colors group-hover:text-primary-foreground">
                      Ver productos
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
