'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Package, Palette, Image as ImageIcon, BarChart3, Menu, X, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/admin/productos', label: 'Productos', icon: Package },
  { href: '/admin/variantes', label: 'Variantes', icon: Palette },
  { href: '/admin/imagenes', label: 'Imágenes', icon: ImageIcon },
]

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading } = useAuth()

  const handleLogout = async () => {
    if (confirm('¿Deseas cerrar sesión?')) {
      localStorage.removeItem('admin_token')
      router.push('/admin/login')
    }
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center" style={{ backgroundColor: '#FAF7F2' }}>
        <p style={{ color: '#6B6155' }}>Cargando...</p>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#FAF7F2' }}>
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } hidden md:flex md:flex-col transition-all duration-300 overflow-hidden`}
        style={{
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E0D8CC',
        }}
      >
        {/* Logo */}
        <div className="p-4 border-b" style={{ borderColor: '#E0D8CC' }}>
          <Link href="/" className="flex items-center justify-center">
            <Image
              src="/images/logo-ganga-bazar.webp"
              alt="Ganga Bazar"
              width={200}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
                style={{
                  backgroundColor: isActive ? '#C8AD7F' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#6B6155',
                  fontWeight: isActive ? '600' : '500',
                }}
              >
                <Icon size={18} />
                <span className="text-sm">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t" style={{ borderColor: '#E0D8CC' }}>
          <Button
            onClick={handleLogout}
            className="w-full justify-start"
            style={{
              backgroundColor: '#DC2626',
              color: '#FFFFFF',
            }}
          >
            <LogOut size={18} className="mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className="px-6 py-4 flex items-center justify-between md:justify-end"
          style={{
            backgroundColor: '#C8AD7F',
            borderBottom: '1px solid #B8956F',
          }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            {sidebarOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>
          <div className="text-white text-sm font-medium">
            {new Date().toLocaleDateString('es-AR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6" style={{ backgroundColor: '#FAF7F2' }}>
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  )
}
