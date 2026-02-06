import Link from "next/link"
import { CheckCircle, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Pedido enviado | Ganga Bazar",
}

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="font-serif text-xl text-foreground">
            Ganga Bazar
          </Link>
        </div>
      </header>

      <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
        <div className="max-w-md text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-[#25D366]" />
          <h1 className="mt-6 font-serif text-3xl font-light text-foreground">Pedido enviado</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Tu pedido fue enviado a nuestro WhatsApp. Te vamos a contactar para coordinar el pago y la entrega.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Si el mensaje no se envio correctamente, podes escribirnos directamente.
          </p>

          <div className="mt-8 space-y-3">
            <a href="https://wa.me/5491130163458" target="_blank" rel="noopener noreferrer" className="block">
              <Button className="w-full h-14 rounded-none bg-[#25D366] text-[#FFFFFF] hover:bg-[#25D366]/90">
                <MessageCircle className="mr-2 h-5 w-5" />
                Escribinos por WhatsApp
              </Button>
            </a>
            <Link href="/" className="block">
              <Button className="w-full h-14 rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
                Volver al inicio
              </Button>
            </Link>
            <Link href="/colecciones" className="block">
              <Button
                variant="outline"
                className="w-full h-14 rounded-none border-border text-foreground hover:bg-muted bg-transparent"
              >
                Seguir comprando
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Tambien podes contactarnos por{" "}
            <a
              href="https://www.instagram.com/gangabazar_"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-accent"
            >
              Instagram
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
