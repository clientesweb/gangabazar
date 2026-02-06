import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchContent } from "./search-content"

export default function BuscarPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <Suspense fallback={<SearchLoading />}>
          <SearchContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

function SearchLoading() {
  return (
    <section className="border-b border-border px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center text-3xl font-light tracking-tight text-foreground sm:text-4xl">
          <span className="italic">Buscar</span>
        </h1>
        <div className="mt-8 h-14 animate-pulse rounded-none bg-muted" />
      </div>
    </section>
  )
}
