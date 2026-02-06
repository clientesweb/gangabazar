'use client'

import { useState, useEffect } from 'react'
import { useProducts } from '@/hooks/use-products'
import { getVariantsByProductId, createVariant, updateVariant, deleteVariant } from '@/lib/services/variants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Plus, Trash2, Edit2, AlertCircle } from 'lucide-react'

export default function VariantesPage() {
  const { products, loading: productsLoading } = useProducts()
  const [selectedProductId, setSelectedProductId] = useState<string>('')
  const [variants, setVariants] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string>('')

  const [formData, setFormData] = useState({
    color_name: '',
    color_hex: '#000000',
  })

  useEffect(() => {
    if (selectedProductId) {
      loadVariants()
    }
  }, [selectedProductId])

  const loadVariants = async () => {
    setLoading(true)
    try {
      const data = await getVariantsByProductId(selectedProductId)
      setVariants(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar variantes')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (variant?: (typeof variants)[0]) => {
    if (variant) {
      setFormData({
        color_name: variant.color_name,
        color_hex: variant.color_hex,
      })
      setEditingId(variant.id)
    } else {
      setFormData({
        color_name: '',
        color_hex: '#000000',
      })
      setEditingId(null)
    }
    setOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    // Validar que se seleccionó un producto
    if (!selectedProductId) {
      setError('Debes seleccionar un producto antes de guardar una variante')
      setSubmitting(false)
      return
    }

    try {
      if (editingId) {
        // update via server API
        const res = await fetch(`/api/admin/variants?id=${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        const updated = await res.json()
        if (!res.ok) throw new Error(updated?.error || 'Failed to update')
        setVariants((prev) => prev.map((v) => (v.id === editingId ? updated : v)))
      } else {
        const res = await fetch('/api/admin/variants', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ product_id: selectedProductId, ...formData }),
        })
        const created = await res.json()
        if (!res.ok) throw new Error(created?.error || 'Failed to create')
        setVariants((prev) => [...prev, created])
      }
      setOpen(false)
    } catch (err) {
      console.error('Error create/update variant:', err)
      // Try to extract supabase message
      const message = (err && typeof err === 'object' && 'message' in err) ? (err as any).message : 'Error al guardar variante'
      setError(message + '. Asegúrate de estar autenticado y de que el producto existe.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro?')) return

    try {
      const res = await fetch(`/api/admin/variants?id=${id}`, { method: 'DELETE' })
      const body = await res.json()
      if (!res.ok) throw new Error(body?.error || 'Failed to delete')
      setVariants((prev) => prev.filter((v) => v.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar')
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Variantes de Colores</h1>
        <p className="text-slate-400">Gestiona los colores disponibles por producto</p>
      </div>

      <Card className="border-2 mb-6" style={{ backgroundColor: '#FFFFFF', borderColor: '#E0D8CC' }}>
        <CardHeader>
          <CardTitle style={{ color: '#1A1A1A' }}>Selecciona un Producto</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="p-4 rounded-lg border" style={{ backgroundColor: '#F0EBE3', borderColor: '#E0D8CC' }}>
              <p className="mb-3" style={{ color: '#6B6155' }}>No hay productos disponibles</p>
              <p className="text-sm" style={{ color: '#6B6155' }}>Primero debes crear un producto en la sección de <span className="font-semibold">Productos</span></p>
            </div>
          ) : (
            <Select value={selectedProductId} onValueChange={setSelectedProductId}>
              <SelectTrigger style={{ backgroundColor: '#F0EBE3', borderColor: '#E0D8CC', color: '#1A1A1A' }}>
                <SelectValue placeholder="Elige un producto..." />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CardContent>
      </Card>

      {selectedProductId && (
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold" style={{ color: '#1A1A1A' }}>
              Variantes: {products.find((p) => p.id === selectedProductId)?.name}
            </h2>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Color
              </Button>
            </DialogTrigger>
            <DialogContent className="border-2" style={{ backgroundColor: '#FFFFFF', borderColor: '#E0D8CC', color: '#1A1A1A' }}>
              <DialogHeader>
                <DialogTitle>
                  {editingId ? 'Editar Color' : 'Agregar Nuevo Color'}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSave} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre del Color</label>
                  <Input
                    required
                    value={formData.color_name}
                    onChange={(e) =>
                      setFormData({ ...formData, color_name: e.target.value })
                    }
                    disabled={submitting}
                    placeholder="Ej: Rojo, Azul, Verde..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Código Hex</label>
                  <div className="flex gap-2">
                    <Input
                      required
                      type="color"
                      value={formData.color_hex}
                      onChange={(e) =>
                        setFormData({ ...formData, color_hex: e.target.value })
                      }
                      disabled={submitting}
                      className="h-10 w-20"
                    />
                    <Input
                      required
                      value={formData.color_hex}
                      onChange={(e) =>
                        setFormData({ ...formData, color_hex: e.target.value })
                      }
                      disabled={submitting}
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setOpen(false)}
                    disabled={submitting}
                  >
                    Cancelar
                  </Button>
                  <Button disabled={submitting}>
                    {submitting && (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    )}
                    {editingId ? 'Guardar' : 'Crear'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      )}

      <Card className="border-2" style={{ backgroundColor: '#FFFFFF', borderColor: '#E0D8CC' }}>
        <CardHeader>
          <CardTitle>Colores Disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          {!selectedProductId ? (
            <p className="text-slate-400 text-center py-8">
              Selecciona un producto para ver sus variantes
            </p>
          ) : loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#C8AD7F' }} />
            </div>
          ) : variants.length === 0 ? (
            <p className="text-slate-400 text-center py-8">
              Este producto no tiene colores. Crea uno.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {variants.map((variant) => (
                <div
                  key={variant.id}
                  className="flex items-center gap-4 p-4 rounded-lg border" style={{ backgroundColor: '#F0EBE3', borderColor: '#E0D8CC' }}
                >
                  <div
                    className="w-12 h-12 rounded-lg border-2 border-slate-600"
                    style={{ backgroundColor: variant.color_hex }}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-white">
                      {variant.color_name}
                    </p>
                    <p className="text-xs text-slate-400">{variant.color_hex}</p>
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenDialog(variant)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:bg-red-500/10"
                      onClick={() => handleDelete(variant.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
