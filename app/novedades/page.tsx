import type { Metadata } from "next"
import { NovedadesContent } from "./novedades-content"

export const metadata: Metadata = {
  title: "Novedades",
  description:
    "Descubri las ultimas incorporaciones a nuestra coleccion. Mates, termos y accesorios personalizados con grabado laser. Lo mas nuevo de Ganga Bazar.",
  openGraph: {
    title: "Novedades | Ganga Bazar",
    description:
      "Descubri las ultimas incorporaciones a nuestra coleccion de mates, termos y accesorios con grabado laser.",
    url: "https://gangabazar.com.ar/novedades",
  },
}

export default function NovedadesPage() {
  return <NovedadesContent />
}
