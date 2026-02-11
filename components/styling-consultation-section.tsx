import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function StylingConsultationSection() {
  return (
    <section className="bg-background py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image side */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src="/images/grabados.webp"
                alt="Grabado laser personalizado"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 rounded-3xl border-2 border-primary/20 lg:block" />
          </div>

          {/* Content side */}
          <div className="lg:pl-8">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Servicio exclusivo</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              Grabado laser
              <br />
              <span className="text-primary">personalizado</span>
            </h2>
            <p className="mt-6 text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
              Hacemos que cada producto sea unico con nuestro servicio de grabado laser de alta precision. Ideal para regalos,
              emprendimientos o simplemente para tener algo que sea 100% tuyo.
            </p>

            <ul className="mt-8 space-y-4 text-sm font-medium text-foreground/80">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>Nombres, frases, fechas o logos personalizados</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>Alta precision y durabilidad permanente</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span>Precios especiales para empresas y eventos</span>
              </li>
            </ul>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="group rounded-full bg-primary px-8 font-bold text-primary-foreground hover:bg-primary/90"
              >
                <a href="https://www.gangabazar.com.ar/categorias/grabados" target="_blank" rel="noopener noreferrer">
                  ¡Mira todo!
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <span className="text-xs font-semibold text-muted-foreground">Presupuesto sin cargo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
