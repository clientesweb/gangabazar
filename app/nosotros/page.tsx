import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[400px]">
          <img
            src="/images/hero-ganga.jpg"
            alt="Ganga Bazar"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FFFFFF]/70">Quienes somos</span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#FFFFFF] sm:text-5xl lg:text-6xl">
                Ganga Bazar
              </h1>
            </div>
          </div>
        </section>

        {/* Manifesto */}
        <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <p className="text-2xl font-bold leading-relaxed text-foreground sm:text-3xl lg:text-4xl">
              <span className="text-primary">Personalizamos</span> cada producto para que sea unico, como vos.
            </p>
            <div className="mt-12 space-y-6 text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                Somos un emprendimiento de San Martin, Buenos Aires, que nacio de la pasion por crear productos unicos
                y personalizados. Lo que empezo como una idea se convirtio en Ganga Bazar: tu lugar para encontrar
                termos, mates y accesorios con grabado laser.
              </p>
              <p>
                Cada producto que sale de nuestro taller lleva una marca personal: un nombre, una frase, una fecha
                especial. Porque creemos que los objetos de todos los dias pueden contar historias y hacerte sonreir.
              </p>
              <p>
                Trabajamos con las mejores marcas del mercado y ofrecemos envios en el dia en la zona de San Martin.
                Y lo mejor: pagas al recibir tu pedido. Asi de simple, asi de confiable.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-secondary px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Lo que nos define</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Nuestros <span className="text-primary">valores</span>
              </h2>
            </div>
            <div className="mt-16 grid gap-12 sm:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                  <span className="text-2xl font-bold text-primary-foreground">01</span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-foreground">Personalizacion</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-muted-foreground">
                  Cada producto es unico porque lo hacemos especial para vos. Grabado laser de alta precision y calidad.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                  <span className="text-2xl font-bold text-primary-foreground">02</span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-foreground">Confianza</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-muted-foreground">
                  Pagas al recibir tu pedido. Sin sorpresas, sin complicaciones. Asi de simple.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                  <span className="text-2xl font-bold text-primary-foreground">03</span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-foreground">Rapidez</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-muted-foreground">
                  Envios en el dia en San Martin, Bs. As. Tu pedido, listo cuando lo necesites.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Queres ver nuestros productos?
            </h2>
            <p className="mt-4 font-medium text-muted-foreground">Explora nuestros productos y encontra el regalo perfecto.</p>
            <a
              href="/colecciones"
              className="mt-8 inline-block rounded-full bg-primary px-8 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Ver productos
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
