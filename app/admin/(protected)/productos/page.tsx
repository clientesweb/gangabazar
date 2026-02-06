'use client'

import { useState, useMemo } from 'react'
import { useProducts } from '@/hooks/use-products'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import {
  Loader2,
  Plus,
  Trash2,
  Edit2,
  AlertCircle,
} from 'lucide-react'
import type { ProductInsert } from '@/lib/services/products'

type Product = ReturnType<typeof useProducts>['products'][number]

const categories = ['termos', 'mates', 'accesorios'] as const

export default function ProductsPage() {
  const { products, loading, error, add, update, remove } = useProducts()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const [formData, setFormData] = useState<ProductInsert>({
    name: '',
    description: '',
    price: 0,
    category: 'termos',
    subcategory: '',
    material: '',
    tagline: '',
    is_featured: false,
    is_new: false,
  })

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tagline?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, categoryFilter])

  const handleReset = () => {
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'termos',
      subcategory: '',
      material: '',
      tagline: '',
      is_featured: false,
      is_new: false,
    })
    setEditingId(null)
    setFormError('')
  }

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        subcategory: product.subcategory,
        material: product.material,
        tagline: product.tagline,
        is_featured: product.is_featured,
        is_new: product.is_new,
      })
      setEditingId(product.id)
    } else {
      handleReset()
    }
    setOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      setFormError('El nombre es requerido')
      return
    }

    setSubmitting(true)
    setFormError('')

    try {
      if (editingId) {
        await update(editingId, formData)
      } else {
        await add(formData)
      }
      setOpen(false)
      handleReset()
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Error al guardar')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return

    try {
      await remove(id)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar')
    }
  }

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#1A1A1A' }}>
              Productos
            </h1>
            <p className="text-sm mt-2" style={{ color: '#6B6155' }}>
              {filteredProducts.length} de {products.length} productos
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => handleOpenDialog()}
                className="text-white"
                style={{ backgroundColor: '#C8AD7F' }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Producto
              </Button>
            </DialogTrigger>

            <DialogContent
              className="border-2 max-w-md"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E0D8CC',
              }}
            >
              <DialogHeader>
                <DialogTitle style={{ color: '#1A1A1A' }}>
                  {editingId ? 'Editar Producto' : 'Crear Nuevo Producto'}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSave} className="space-y-4">
                {formError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{formError}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#1A1A1A' }}>
                    Nombre *
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={submitting}
                    style={{
                      backgroundColor: '#F0EBE3',
                      borderColor: '#E0D8CC',
                      color: '#1A1A1A',
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#1A1A1A' }}>
                    Tagline
                  </label>
                  <Input
                    required
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    disabled={submitting}
                    style={{
                      backgroundColor: '#F0EBE3',
                      borderColor: '#E0D8CC',
                      color: '#1A1A1A',
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#1A1A1A' }}>
                    Descripción *
                  </label>
                  <Textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    disabled={submitting}
                    rows={4}
                    style={{
                      backgroundColor: '#F0EBE3',
                      borderColor: '#E0D8CC',
                      color: '#1A1A1A',
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: '#1A1A1A' }}>
                      Precio *
                    </label>
                    <Input
                      required
                      type="number"
                      min="0"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: parseFloat(e.target.value),
                        })
                      }
                      disabled={submitting}
                      style={{
                        backgroundColor: '#F0EBE3',
                        borderColor: '#E0D8CC',
                        color: '#1A1A1A',
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: '#1A1A1A' }}>
                      Categoría *
                    </label>
                    <Select
                      value={formData.category}
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, category: value })
                      }
                      disabled={submitting}
                    >
                      <SelectTrigger
                        style={{
                          backgroundColor: '#F0EBE3',
                          borderColor: '#E0D8CC',
                          color: '#1A1A1A',
                        }}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderColor: '#E0D8CC',
                        }}
                      >
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: '#1A1A1A' }}>
                      Subcategoría
                    </label>
                    <Input
                      required
                      value={formData.subcategory}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subcategory: e.target.value,
                        })
                      }
                      disabled={submitting}
                      style={{
                        backgroundColor: '#F0EBE3',
                        borderColor: '#E0D8CC',
                        color: '#1A1A1A',
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: '#1A1A1A' }}>
                      Material
                    </label>
                    <Input
                      required
                      value={formData.material}
                      onChange={(e) =>
                        setFormData({ ...formData, material: e.target.value })
                      }
                      disabled={submitting}
                      style={{
                        backgroundColor: '#F0EBE3',
                        borderColor: '#E0D8CC',
                        color: '#1A1A1A',
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_featured: e.target.checked,
                        })
                      }
                      disabled={submitting}
                      className="mr-2"
                    />
                    <span className="text-sm" style={{ color: '#1A1A1A' }}>
                      Destacado
                    </span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_new}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_new: e.target.checked,
                        })
                      }
                      disabled={submitting}
                      className="mr-2"
                    />
                    <span className="text-sm" style={{ color: '#1A1A1A' }}>
                      Nuevo Ingreso
                    </span>
                  </label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setOpen(false)}
                    disabled={submitting}
                    style={{
                      borderColor: '#E0D8CC',
                      color: '#1A1A1A',
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    disabled={submitting}
                    className="text-white"
                    style={{ backgroundColor: '#C8AD7F' }}
                  >
                    {submitting && (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    )}
                    {editingId ? 'Guardar Cambios' : 'Crear Producto'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filtros */}
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#E0D8CC',
              color: '#1A1A1A',
              flex: 1,
            }}
          />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger
              className="w-48"
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E0D8CC',
                color: '#1A1A1A',
              }}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              style={{
                backgroundColor: '#FFFFFF',
                borderColor: '#E0D8CC',
              }}
            >
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      <Card
        className="border-2"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: '#E0D8CC',
        }}
      >
        <CardHeader>
          <CardTitle style={{ color: '#1A1A1A' }}>Listado de Productos</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#C8AD7F' }} />
            </div>
          ) : products.length === 0 ? (
            <p className="text-center py-8" style={{ color: '#6B6155' }}>
              No hay productos. Crea uno para comenzar.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: '#E0D8CC' }}>
                    <TableHead style={{ color: '#1A1A1A' }}>Nombre</TableHead>
                    <TableHead style={{ color: '#1A1A1A' }}>Categoría</TableHead>
                    <TableHead style={{ color: '#1A1A1A' }}>Precio</TableHead>
                    <TableHead style={{ color: '#1A1A1A' }}>Estado</TableHead>
                    <TableHead style={{ color: '#1A1A1A' }} className="text-right">
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id} style={{ borderColor: '#E0D8CC' }}>
                      <TableCell style={{ color: '#1A1A1A', fontWeight: '500' }}>
                        {product.name}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          style={{
                            borderColor: '#E0D8CC',
                            color: '#6B6155',
                            backgroundColor: '#F0EBE3',
                          }}
                        >
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell style={{ color: '#1A1A1A' }}>
                        ${product.price.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {product.is_featured && (
                            <Badge
                              style={{
                                backgroundColor: '#FCD34D',
                                color: '#78350F',
                              }}
                            >
                              Destacado
                            </Badge>
                          )}
                          {product.is_new && (
                            <Badge
                              style={{
                                backgroundColor: '#86EFAC',
                                color: '#166534',
                              }}
                            >
                              Nuevo
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenDialog(product)}
                            style={{
                              borderColor: '#E0D8CC',
                              color: '#C8AD7F',
                            }}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(product.id)}
                            style={{
                              borderColor: '#DC2626',
                              color: '#DC2626',
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}
