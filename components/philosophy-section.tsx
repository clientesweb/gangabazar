export function PhilosophySection() {
  return (
    <section className="bg-[#1A1A1A] px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32 rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-4">
      <div className="mx-auto max-w-4xl text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#FFFFFF]/60">Grabado laser</span>
        <h2 className="mt-6 text-3xl font-bold leading-relaxed text-[#FFFFFF] sm:text-4xl lg:text-5xl">
          Cada producto es <span className="text-[#a89060]">unico</span> porque lo personalizamos para vos.
        </h2>
        <p className="mt-8 text-base font-medium leading-relaxed text-[#FFFFFF]/80 sm:text-lg">
          Con nuestro servicio de grabado laser, convertimos cada termo, mate o accesorio en una pieza exclusiva.
          Nombres, fechas, frases o logos: lo que imagines, lo grabamos. El regalo perfecto para cualquier ocasion.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs font-bold uppercase tracking-widest text-[#FFFFFF]/50 sm:gap-12">
          <span>Personalizado</span>
          <span className="hidden sm:block">.</span>
          <span>Envio en el dia</span>
          <span className="hidden sm:block">.</span>
          <span>Pagas al recibir</span>
        </div>
      </div>
    </section>
  )
}
