import type React from "react"
import type { Metadata, Viewport } from "next"
import { Nunito, Fredoka } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart"
import "./globals.css"

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-nunito",
})

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-fredoka",
})

export const metadata: Metadata = {
  title: {
    default: "Ganga Bazar | Mates, Termos y Accesorios con Grabado Laser",
    template: "%s | Ganga Bazar",
  },
  description:
    "Termos, mates y articulos del hogar personalizados con grabado laser. Envios en el dia en San Martin, Bs. As. Pagas al recibir. Regalos unicos para toda ocasion.",
  generator: "v0.app",
  keywords: [
    "mates personalizados",
    "termos grabado laser",
    "regalos personalizados",
    "grabado laser",
    "mates argentina",
    "termos stanley",
    "accesorios materos",
    "san martin buenos aires",
    "ganga bazar",
    "articulos del hogar",
  ],
  authors: [{ name: "Ganga Bazar" }],
  creator: "Ganga Bazar",
  metadataBase: new URL("https://gangabazar.com.ar"),
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://gangabazar.com.ar",
    siteName: "Ganga Bazar",
    title: "Ganga Bazar | Mates, Termos y Accesorios con Grabado Laser",
    description:
      "Termos, mates y articulos del hogar personalizados con grabado laser. Envios en el dia en San Martin, Bs. As.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ganga Bazar - Tu estilo, tu mate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ganga Bazar | Mates, Termos y Accesorios con Grabado Laser",
    description:
      "Termos, mates y articulos del hogar personalizados con grabado laser. Envios en el dia.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.webp",
    apple: "/favicon.webp",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: "#C8AD7F",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${nunito.variable} ${fredoka.variable} font-sans antialiased`}
      >
        <CartProvider>{children}</CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
