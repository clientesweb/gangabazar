'use client'

import { useProducts } from '@/hooks/use-products'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function AdminDashboard() {
  const { products, loading } = useProducts()

  const stats = [
    {
      label: 'Total Productos',
      value: products.length,
      color: 'bg-blue-500/10 text-blue-600',
    },
    {
      label: 'Productos Destacados',
      value: products.filter((p) => p.is_featured).length,
      color: 'bg-yellow-500/10 text-yellow-600',
    },
    {
      label: 'Nuevos Ingresos',
      value: products.filter((p) => p.is_new).length,
      color: 'bg-green-500/10 text-green-600',
    },
    {
      label: 'Categorías',
      value: [...new Set(products.map((p) => p.category))].length,
      color: 'bg-purple-500/10 text-purple-600',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400">Bienvenido al panel de administración</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-slate-900 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle>Acciones rápidas</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300">
          <ul className="space-y-2">
            <li>
              📦 Ve a
              <a href="/admin/productos" className="text-blue-500 hover:underline">
                {' '}Productos
              </a>{' '}
              para crear, editar o eliminar productos
            </li>
            <li>
              🎨 Ve a
              <a href="/admin/variantes" className="text-blue-500 hover:underline">
                {' '}Variantes
              </a>{' '}
              para gestionar colores
            </li>
            <li>
              🖼️ Ve a
              <a href="/admin/imagenes" className="text-blue-500 hover:underline">
                {' '}Imágenes
              </a>{' '}
              para subir y gestionar imágenes
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
