"use client"

import { cn } from "@/lib/utils"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, ShoppingBag, Search, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AnnouncementBar } from "@/components/announcement-bar"
import { useCart } from "@/lib/cart"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const productCategories = [
  { name: "Termos", href: "/colecciones/termos" },
  { name: "Mates", href: "/colecciones/mates" },
  { name: "Accesorios", href: "/colecciones/accesorios" },
  { name: "Grabados", href: "/colecciones/grabados" },
]

const rightNav = [
  { name: "Novedades", href: "/novedades" },
  { name: "Nosotros", href: "/nosotros" },
]

export function Header() {
  const { itemCount } = useCart()
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [productDropdownOpen, setProductDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProductDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <AnnouncementBar />

      <nav className="relative mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8 bg-[#a89060]">
        {/* Mobile: Menu Left */}
        <div className="flex items-center lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#FFFFFF] hover:text-[#FFFFFF]/70 hover:bg-[#FFFFFF]/10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-background">
              <div className="flex flex-col gap-4 pt-6">
                <Link
                  href="/"
                  className="text-lg font-semibold tracking-wide text-foreground transition-colors hover:text-primary/80"
                >
                  Inicio
                </Link>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="productos" className="border-none">
                    <AccordionTrigger className="py-0 text-lg font-semibold tracking-wide text-foreground hover:text-primary/80 hover:no-underline">
                      Productos
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-3 pl-4 pt-2">
                        <Link
                          href="/colecciones"
                          className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                          Ver todos
                        </Link>
                        {productCategories.map((cat) => (
                          <Link
                            key={cat.name}
                            href={cat.href}
                            className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {cat.name}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                {rightNav.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-semibold tracking-wide text-foreground transition-colors hover:text-primary/80"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop: Left Nav */}
        <div className="hidden flex-1 items-center gap-x-10 lg:flex">
          <Link
            href="/"
            className="text-sm font-bold uppercase tracking-widest text-[#FFFFFF] transition-colors hover:text-[#FFFFFF]/70"
          >
            Inicio
          </Link>
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setProductDropdownOpen(!productDropdownOpen)}
              className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest text-[#FFFFFF] transition-colors hover:text-[#FFFFFF]/70"
            >
              Productos
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", productDropdownOpen && "rotate-180")} />
            </button>
            {productDropdownOpen && (
              <div className="absolute left-1/2 top-full mt-4 -translate-x-1/2 w-[280px] overflow-hidden rounded-xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-2xl shadow-black/10">
                <div className="px-5 pt-5 pb-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Colecciones</span>
                </div>
                <div className="px-3 pb-2">
                  <Link
                    href="/colecciones"
                    onClick={() => setProductDropdownOpen(false)}
                    className="group flex items-center gap-3 rounded-lg px-3 py-3 transition-all hover:bg-[#a89060]/10"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#a89060]/10 text-[#a89060] transition-colors group-hover:bg-[#a89060] group-hover:text-[#FFFFFF]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                    </span>
                    <div>
                      <span className="block text-sm font-bold text-foreground">Ver todos</span>
                      <span className="block text-[11px] font-medium text-muted-foreground">Explora el catalogo completo</span>
                    </div>
                  </Link>
                </div>
                <div className="mx-5 border-t border-border/50" />
                <div className="px-3 py-2">
                  {productCategories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      onClick={() => setProductDropdownOpen(false)}
                      className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:bg-[#a89060]/10"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-border transition-colors group-hover:bg-[#a89060]" />
                      <span className="text-sm font-semibold text-foreground/80 transition-colors group-hover:text-foreground">{cat.name}</span>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-border/50 bg-muted/30 px-5 py-3">
                  <Link
                    href="/novedades"
                    onClick={() => setProductDropdownOpen(false)}
                    className="text-[11px] font-bold uppercase tracking-widest text-[#a89060] transition-colors hover:text-[#a89060]/80"
                  >
                    Ver novedades →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Logo Center */}
        <Link href="/" className="absolute left-1/2 z-10 -translate-x-1/2 lg:static lg:mx-8 lg:translate-x-0 lg:shrink-0">
          <Image
            src="/images/logo-ganga-bazar.webp"
            alt="Ganga Bazar"
            width={280}
            height={100}
            className="h-16 w-auto sm:h-[4.5rem] lg:h-24"
            priority
          />
        </Link>

        {/* Desktop: Right Nav + Actions */}
        <div className="hidden flex-1 items-center justify-end gap-x-10 lg:flex">
          {rightNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-bold uppercase tracking-widest text-[#FFFFFF] transition-colors hover:text-[#FFFFFF]/70"
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center gap-1 pl-4 border-l border-[#FFFFFF]/30">
            <Button variant="ghost" size="icon" className="text-[#FFFFFF] hover:text-[#FFFFFF]/70 hover:bg-[#FFFFFF]/10" onClick={() => setSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>
            <Link href="/carrito">
              <Button variant="ghost" size="icon" className="relative text-[#FFFFFF] hover:text-[#FFFFFF]/70 hover:bg-[#FFFFFF]/10">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FFFFFF] text-[10px] font-bold text-[#a89060]">
                    {itemCount}
                  </span>
                )}
                <span className="sr-only">Carrito</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile: Right Actions */}
        <div className="flex items-center gap-1 lg:hidden">
          <Button variant="ghost" size="icon" className="text-[#FFFFFF] hover:text-[#FFFFFF]/70 hover:bg-[#FFFFFF]/10" onClick={() => setSearchOpen(true)}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>
          <Link href="/carrito">
            <Button variant="ghost" size="icon" className="relative text-[#FFFFFF] hover:text-[#FFFFFF]/70 hover:bg-[#FFFFFF]/10">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FFFFFF] text-[10px] font-bold text-[#a89060]">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Carrito</span>
            </Button>
          </Link>
        </div>
      </nav>

      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="mx-auto flex h-full max-w-3xl flex-col px-4">
            <div className="flex h-16 items-center justify-end lg:h-20">
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)} className="text-foreground">
                <X className="h-5 w-5" />
                <span className="sr-only">Cerrar</span>
              </Button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center pb-32">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar termos, mates, accesorios, grabados..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="h-16 border-0 border-b border-border bg-transparent pl-10 text-2xl font-medium placeholder:text-muted-foreground focus-visible:ring-0 sm:text-3xl"
                  />
                </div>
              </form>
              <p className="mt-6 text-sm text-muted-foreground">Presiona Enter para buscar</p>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
