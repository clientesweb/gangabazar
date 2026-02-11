import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Accesorios Materos",
  description:
    "Accesorios materos y complementos esenciales. Bombillas, yerberas y mas. Personalizados con grabado laser. Envios en CABA y GBA.",
  openGraph: {
    title: "Accesorios Materos | Ganga Bazar",
    description:
      "Accesorios materos y complementos esenciales personalizados con grabado laser.",
    url: "https://gangabazar.com.ar/categorias/accesorios",
  },
}

export default function AccesoriosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
