import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Full-bleed image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-ganga.jpg"
          alt="Articulos del hogar personalizados con grabado laser"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/15" />
      </div>

      {/* Content overlay */}
      <div className="relative flex min-h-screen flex-col justify-end px-6 pb-16 sm:px-12 sm:pb-24 lg:px-20 lg:pb-32">
        {/* Headline - bold, rounded, playful */}
        <h1 className="max-w-4xl text-balance font-[var(--font-display)] text-5xl font-bold leading-[1.05] tracking-tight text-[#FFFFFF] sm:text-7xl md:text-8xl lg:text-9xl">
          Tu estilo,
          <br />
          <span className="text-[#C8AD7F]">tu mate.</span>
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-lg text-pretty text-base font-medium leading-relaxed text-[#FFFFFF]/90 sm:mt-10 sm:text-lg">
          Personalizamos termos, mates y accesorios con grabado laser. Hace que cada momento sea unico. Envios en el dia en San Martin.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col gap-4 sm:mt-14 sm:flex-row sm:items-center">
          <Button
            asChild
            size="lg"
            className="group h-14 rounded-full bg-[#C8AD7F] px-10 text-sm font-bold uppercase tracking-wider text-[#FFFFFF] transition-all hover:bg-[#C8AD7F]/90 sm:px-14"
          >
            <Link href="/colecciones">
              Ver productos
              <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="group h-14 rounded-full border-2 border-[#FFFFFF]/50 bg-transparent px-10 text-sm font-bold uppercase tracking-wider text-[#FFFFFF] transition-all hover:border-[#FFFFFF] hover:bg-[#FFFFFF]/10 sm:px-14"
          >
            <Link href="https://wa.me/5491130163458" target="_blank">
              Consultar por WhatsApp
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
