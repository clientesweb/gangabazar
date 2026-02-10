'use client'

import { useState, useEffect } from 'react'
import { useGrabados } from '@/hooks/use-grabados'
import { getVariantsByGrabadoId, createVariant, updateVariant, deleteVariant } from '@/lib/services/grabado-variants'
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

export default function GrabadoVariantesPage() {
  const { grabados, loading: grabadosLoading } = useGrabados()
  const [selectedGrabadoId, setSelectedGrabadoId] = useState<string>('')
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
    if (selectedGrabadoId) {
      loadVariants()
    }
  }, [selectedGrabadoId])

  const loadVariants = async () => {
    setLoading(true)
    try {
      const data = await getVariantsByGrabadoId(selectedGrabadoId)
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

    if (!selectedGrabadoId) {
      setError('Debes seleccionar un grabado antes de guardar una variante')
      setSubmitting(false)
      return
    }

    try {
      if (editingId) {
        const updated = await updateVariant(editingId, formData)
        setVariants((prev) => prev.map((v) => (v.id === editingId ? updated : v)))
      } else {
        const created = await createVariant({ grabado_id: selectedGrabadoId, ...formData })
        setVariants((prev) => [...prev, created])
      }
      setOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar variante')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro?')) return

    try {
      await deleteVariant(id)
      setVariants((prev) => prev.filter((v) => v.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar')
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#1A1A1A' }}>Variantes de Grabados</h1>
        <p style={{ color: '#6B6155' }}>Gestiona los colores disponibles por grabado</p>
      </div>

      <Card className="border-2 mb-6" style={{ backgroundColor: '#FFFFFF', borderColor: '#E0D8CC' }}>
        <CardHeader>
          <CardTitle style={{ color: '#1A1A1A' }}>Selecciona un Grabado</CardTitle>
        </CardHeader>
        <CardContent>
          {grabados.length === 0 ? (
            <div className="p-4 rounded-lg border" style={{ backgroundColor: '#F0EBE3', borderColor: '#E0D8CC' }}>
              <p className="mb-3" style={{ color: '#6B6155' }}>No hay grabados disponibles</p>
              <p className="text-sm" style={{ color: '#6B6155' }}>Primero debes crear un grabado en la sección de <span className="font-semibold">Grabados</span></p>
            </div>
          ) : (
            <Select value={selectedGrabadoId} onValueChange={setSelectedGrabadoId}>
              <SelectTrigger style={{ backgroundColor: '#F0EBE3', borderColor: '#E0D8CC', color: '#1A1A1A' }}>
                <SelectValue placeholder="Elige un grabado..." />
              </SelectTrigger>
              <SelectContent>
                {grabados.map((grabado) => (
                  <SelectItem key={grabado.id} value={grabado.id}>
                    {grabado.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CardContent>
      </Card>

      {selectedGrabadoId && (
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold" style={{ color: '#1A1A1A' }}>
              Variantes: {grabados.find((g) => g.id === selectedGrabadoId)?.name}
            </h2>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} style={{ backgroundColor: '#C8AD7F' }}>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Color
              </Button>
            </DialogTrigger>
            <DialogContent className="border-2" style={{ backgroundColor: '#FFFFFF', borderColor: '#E0D8CC', color: '#1A1A1A' }}>
              <DialogHeader>
                <DialogTitle style={{ color: '#1A1A1A' }}>
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
                  <label className="text-sm font-medium" style={{ color: '#1A1A1A' }}>Nombre del Color</label>
                  <Input
                    required
                    value={formData.color_name}
                    onChange={(e) =>
                      setFormData({ ...formData, color_name: e.target.value })
                    }
                    disabled={submitting}
                    placeholder="Ej: Rojo, Azul, Verde..."
                    style={{
                      backgroundColor: '#F0EBE3',
                      borderColor: '#E0D8CC',
                      color: '#1A1A1A',
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: '#1A1A1A' }}>Código Hex</label>
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
                      style={{
                        backgroundColor: '#F0EBE3',
                        borderColor: '#E0D8CC',
                        color: '#1A1A1A',
                      }}
                    />
                  </div>
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
                  <Button disabled={submitting} style={{ backgroundColor: '#C8AD7F' }}>
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
          <CardTitle style={{ color: '#1A1A1A' }}>Colores Disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          {!selectedGrabadoId ? (
            <p style={{ color: '#6B6155' }} className="text-center py-8">
              Selecciona un grabado para ver sus variantes
            </p>
          ) : loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#C8AD7F' }} />
            </div>
          ) : variants.length === 0 ? (
            <p style={{ color: '#6B6155' }} className="text-center py-8">
              Este grabado no tiene colores. Crea uno.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {variants.map((variant) => (
                <div
                  key={variant.id}
                  className="flex items-center gap-4 p-4 rounded-lg border"
                  style={{ backgroundColor: '#F0EBE3', borderColor: '#E0D8CC' }}
                >
                  <div
                    className="w-12 h-12 rounded-lg border-2"
                    style={{ backgroundColor: variant.color_hex, borderColor: '#1A1A1A' }}
                  />
                  <div className="flex-1">
                    <p className="font-medium" style={{ color: '#1A1A1A' }}>
                      {variant.color_name}
                    </p>
                    <p className="text-xs" style={{ color: '#6B6155' }}>{variant.color_hex}</p>
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
