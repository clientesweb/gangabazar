"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    quote:
      "Le regale a mi viejo un termo con su nombre grabado y se emociono mal. La calidad del grabado es impecable. Mil gracias Ganga Bazar!",
    author: "Lucia Fernandez",
    role: "Cliente frecuente",
  },
  {
    id: 2,
    quote:
      "Pedi un kit matero completo personalizado para mi oficina y llego el mismo dia. Excelente calidad y atencion. 100% recomendable.",
    author: "Martin Rodriguez",
    role: "Emprendedor",
  },
  {
    id: 3,
    quote:
      "Compre mates personalizados como souvenirs de cumple de 15 y quedaron hermosos. Todos los invitados se lo quisieron llevar.",
    author: "Carolina Gomez",
    role: "Mama organizadora",
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="bg-[#4F4D46] px-4 py-16 sm:px-6 sm:py-24 lg:px-8 rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-4">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center text-center">
          <Quote className="h-10 w-10 text-[#FFFFFF]/30 sm:h-12 sm:w-12" />
          <blockquote className="mt-8">
            <p className="text-xl font-bold leading-relaxed text-[#FFFFFF] sm:text-2xl md:text-3xl lg:text-4xl">
              {`"${testimonials[current].quote}"`}
            </p>
          </blockquote>
          <div className="mt-8 flex flex-col items-center gap-1 sm:mt-10">
            <p className="text-sm font-bold text-[#FFFFFF]">{testimonials[current].author}</p>
            <p className="text-xs font-medium text-[#FFFFFF]/70">{testimonials[current].role}</p>
          </div>
          <div className="mt-8 flex items-center gap-4 sm:mt-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={prev}
              className="h-10 w-10 rounded-full border border-[#FFFFFF]/20 text-[#FFFFFF] hover:bg-[#FFFFFF]/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === current ? "w-6 bg-[#a89060]" : "w-2 bg-[#FFFFFF]/30"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={next}
              className="h-10 w-10 rounded-full border border-[#FFFFFF]/20 text-[#FFFFFF] hover:bg-[#FFFFFF]/10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
