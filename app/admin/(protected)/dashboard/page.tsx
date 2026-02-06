'use client'

import { useEffect, useState } from 'react'
import { useProducts } from '@/hooks/use-products'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  Package,
  Palette,
  Image as ImageIcon,
  TrendingUp,
  Plus,
  ArrowRight,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const { products, loading } = useProducts()
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalVariants: 0,
    totalImages: 0,
  })

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [varRes, imgRes] = await Promise.all([
          supabase.from('product_variants').select('id', { count: 'exact' }),
          supabase.from('product_images').select('id', { count: 'exact' }),
        ])

        setStats({
          totalProducts: products.length,
          totalVariants: varRes.count || 0,
          totalImages: imgRes.count || 0,
        })
      } catch (err) {
        console.error('Error loading stats:', err)
      }
    }

    if (!loading) {
      loadStats()
    }
  }, [products, loading])

  const StatCard = ({
    icon: Icon,
    title,
    value,
    href,
  }: {
    icon: React.ReactNode
    title: string
    value: number
    href: string
  }) => (
    <Card
      className="border-2 transition-all hover:shadow-lg"
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#E0D8CC',
        color: '#1A1A1A',
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium" style={{ color: '#6B6155' }}>
          {title}
        </CardTitle>
        <div style={{ color: '#C8AD7F' }}>{Icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold" style={{ color: '#1A1A1A' }}>
          {value}
        </div>
        <Link
          href={href}
          className="text-xs mt-2 inline-flex items-center gap-1 transition-colors hover:underline"
          style={{ color: '#C8AD7F' }}
        >
          Gestionar <ArrowRight size={14} />
        </Link>
      </CardContent>
    </Card>
  )

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: '#1A1A1A' }}>
          Dashboard
        </h1>
        <p className="text-sm mt-2" style={{ color: '#6B6155' }}>
          Bienvenido al panel de administración
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<Package size={24} />}
          title="Productos"
          value={stats.totalProducts}
          href="/admin/productos"
        />
        <StatCard
          icon={<Palette size={24} />}
          title="Variantes"
          value={stats.totalVariants}
          href="/admin/variantes"
        />
        <StatCard
          icon={<ImageIcon size={24} />}
          title="Imágenes"
          value={stats.totalImages}
          href="/admin/imagenes"
        />
      </div>

      {/* Quick Actions */}
      <Card
        className="border-2 mb-8"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#E0D8CC',
        }}
      >
        <CardHeader>
          <CardTitle style={{ color: '#1A1A1A' }}>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link href="/admin/productos">
            <Button
              className="w-full text-white"
              style={{ backgroundColor: '#C8AD7F' }}
            >
              <Plus size={18} className="mr-2" />
              Nuevo Producto
            </Button>
          </Link>
          <Link href="/admin/variantes">
            <Button
              variant="outline"
              className="w-full border-2"
              style={{
                borderColor: '#E0D8CC',
                color: '#1A1A1A',
              }}
            >
              <Plus size={18} className="mr-2" />
              Nueva Variante
            </Button>
          </Link>
          <Link href="/admin/imagenes">
            <Button
              variant="outline"
              className="w-full border-2"
              style={{
                borderColor: '#E0D8CC',
                color: '#1A1A1A',
              }}
            >
              <Plus size={18} className="mr-2" />
              Subir Imagen
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Recent Products */}
      <Card
        className="border-2"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#E0D8CC',
        }}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle style={{ color: '#1A1A1A' }}>Últimos Productos</CardTitle>
            <Link
              href="/admin/productos"
              className="text-sm hover:underline"
              style={{ color: '#C8AD7F' }}
            >
              Ver todos
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p style={{ color: '#6B6155' }}>Cargando...</p>
          ) : products.length === 0 ? (
            <p style={{ color: '#6B6155' }}>No hay productos aún</p>
          ) : (
            <div className="space-y-3">
              {products.slice(0, 5).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                  style={{
                    backgroundColor: '#F0EBE3',
                    borderColor: '#E0D8CC',
                  }}
                >
                  <div>
                    <p className="font-medium text-sm" style={{ color: '#1A1A1A' }}>
                      {product.name}
                    </p>
                    <p className="text-xs" style={{ color: '#6B6155' }}>
                      ${product.price.toLocaleString()}
                    </p>
                  </div>
                  <Link href={`/admin/productos`}>
                    <Button
                      size="sm"
                      variant="outline"
                      style={{
                        borderColor: '#C8AD7F',
                        color: '#C8AD7F',
                      }}
                    >
                      Editar
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
