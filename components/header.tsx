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

      <nav className="relative mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8 bg-[#C8AD7F]">
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
              <div className="absolute left-0 top-full mt-3 w-48 overflow-hidden rounded-lg border border-border bg-background shadow-lg">
                <Link
                  href="/colecciones"
                  onClick={() => setProductDropdownOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Ver todos
                </Link>
                <div className="border-t border-border" />
                {productCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    onClick={() => setProductDropdownOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {cat.name}
                  </Link>
                ))}
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
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FFFFFF] text-[10px] font-bold text-[#C8AD7F]">
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
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FFFFFF] text-[10px] font-bold text-[#C8AD7F]">
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
                    placeholder="Buscar termos, mates, accesorios..."
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
