"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <section className="bg-[#a89060] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4F4D46]/60">Comunidad</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#4F4D46] sm:text-4xl">
              Enterate de las <span className="text-[#FFFFFF]">novedades</span>
            </h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-[#4F4D46]/90">
              Nuevos productos, ofertas exclusivas y tips para el mundo matero. Sin spam, solo cosas que valen la pena.
            </p>
          </div>
          <div className="w-full max-w-md">
            {submitted ? (
              <div className="flex items-center gap-3 rounded-2xl bg-[#4F4D46]/10 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4F4D46]">
                  <Check className="h-5 w-5 text-[#FFFFFF]" />
                </div>
                <div>
                  <p className="font-bold text-[#4F4D46]">Te sumaste!</p>
                  <p className="text-sm font-medium text-[#4F4D46]/90">Pronto vas a recibir nuestras novedades.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
                <Input
                  type="email"
                  placeholder="Tu correo electronico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-14 flex-1 rounded-full border-[#4F4D46]/20 bg-[#FFFFFF] px-6 font-medium text-[#4F4D46] placeholder:text-[#4F4D46]/50 focus-visible:ring-[#4F4D46]"
                />
                <Button
                  type="submit"
                  className="group h-14 rounded-full bg-[#4F4D46] px-8 text-sm font-bold uppercase tracking-widest text-[#FFFFFF] hover:bg-[#4F4D46]/90"
                >
                  Sumate
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
