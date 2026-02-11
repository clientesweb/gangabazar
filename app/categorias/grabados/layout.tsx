import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Grabados Personalizados con Laser",
  description:
    "Articulos personalizados con grabado laser. Disenos unicos para cada ocasion. Regalos originales para toda ocasion. Envios en CABA y GBA.",
  openGraph: {
    title: "Grabados Personalizados | Ganga Bazar",
    description:
      "Articulos personalizados con grabado laser. Disenos unicos para cada ocasion.",
    url: "https://gangabazar.com.ar/categorias/grabados",
  },
}

export default function GrabadosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
