import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termos Personalizados con Grabado Laser",
  description:
    "Termos personalizados con grabado laser. Stanley, Waterdog y mas marcas. Regalos unicos para toda ocasion. Envios en CABA y GBA.",
  openGraph: {
    title: "Termos Personalizados | Ganga Bazar",
    description:
      "Termos personalizados con grabado laser. Stanley, Waterdog y mas marcas.",
    url: "https://gangabazar.com.ar/categorias/termos",
  },
}

export default function TermosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
