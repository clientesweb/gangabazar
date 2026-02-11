import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mates Personalizados con Grabado Laser",
  description:
    "Mates personalizados con grabado laser. El companero de todos los dias, hecho unico para vos. Envios en CABA y GBA.",
  openGraph: {
    title: "Mates Personalizados | Ganga Bazar",
    description:
      "Mates personalizados con grabado laser. El companero de todos los dias.",
    url: "https://gangabazar.com.ar/categorias/mates",
  },
}

export default function MatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
