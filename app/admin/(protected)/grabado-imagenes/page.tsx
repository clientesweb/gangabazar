'use client'

import React, { useState, useEffect } from 'react'
import { useGrabados } from '@/hooks/use-grabados'
import { getImagesByGrabadoId, uploadGrabadoImage } from '@/lib/services/grabado-images'
import { getVariantsByGrabadoId } from '@/lib/services/grabado-variants'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
  Star,
  AlertCircle,
  Upload,
} from 'lucide-react'

export default function GrabadoImagenesPage() {
  const { grabados, loading: grabadosLoading } = useGrabados()
  const [selectedGrabadoId, setSelectedGrabadoId] = useState<string>('')
  const [variants, setVariants] = useState<any[]>([])
  const [variant, setVariant] = useState<string>('')
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string>('')
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')

  useEffect(() => {
    if (selectedGrabadoId) {
      loadData()
    }
  }, [selectedGrabadoId])

  useEffect(() => {
    if (selectedGrabadoId) {
      loadImages()
    }
  }, [variant])

  const loadData = async () => {
    setLoading(true)
    try {
      const vars = await getVariantsByGrabadoId(selectedGrabadoId)
      setVariants(vars)
      setVariant('')
      await loadImages()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  const loadImages = async () => {
    try {
      const imgs = await getImagesByGrabadoId(selectedGrabadoId)
      const filtered = variant && variant !== 'none'
        ? imgs.filter((img) => img.variant_id === variant)
        : imgs.filter((img) => !img.variant_id)
      setImages(filtered)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar imágenes')
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!selectedGrabadoId) {
      setError('Debes seleccionar un grabado antes de subir una imagen')
      return
    }

    setSelectedFile(file)
    const reader = new FileReader()
    reader.onload = (event) => {
      setPreviewUrl(event.target?.result as string)
      setDialogOpen(true)
    }
    reader.readAsDataURL(file)
  }

  const handleConfirmUpload = async () => {
    if (!selectedFile) return

    setSubmitting(true)
    setError('')

    try {
      console.log('Iniciando carga de imagen...', { selectedGrabadoId, variant })
      const variantIdToSave = variant && variant !== 'none' ? variant : undefined
      const url = await uploadGrabadoImage(selectedGrabadoId, selectedFile, variantIdToSave)
      console.log('Imagen subida a storage:', url)

      // Create DB record directly
      const { createImage } = await import('@/lib/services/grabado-images')
      console.log('Creando registro en BD...')
      const newImage = await createImage({
        grabado_id: selectedGrabadoId,
        variant_id: variantIdToSave || null,
        image_url: url,
        is_main: images.length === 0,
      })
      console.log('Imagen guardada en BD:', newImage)

      setImages((prev) => [newImage, ...prev])
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      setDialogOpen(false)
      setSelectedFile(null)
      setPreviewUrl('')
      setError('') // Clear any previous errors
      
      // Reload images to ensure UI is in sync
      await loadData()
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error al subir imagen'
      console.error('Error al subir imagen:', err)
      setError(`❌ ${errorMsg}`)
    } finally {
      setSubmitting(false)
    }
  }

  const handleSetMain = async (imageId: string) => {
    try {
      const { setMainImage } = await import('@/lib/services/grabado-images')
      const variantIdToPass = variant && variant !== 'none' ? variant : undefined
      await setMainImage(imageId, selectedGrabadoId, variantIdToPass)
      await loadImages()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar')
    }
  }

  const handleDelete = async (imageId: string) => {
    if (!confirm('¿Estás seguro?')) return

    try {
      const { deleteImage } = await import('@/lib/services/grabado-images')
      await deleteImage(imageId)
      setImages((prev) => prev.filter((img) => img.id !== imageId))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar')
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#1A1A1A' }}>Gestión de Imágenes de Grabados</h1>
        <p style={{ color: '#6B6155' }}>
          Sube y gestiona imágenes de grabados y variantes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="border-2" style={{ backgroundColor: '#FFFFFF', borderColor: '#E0D8CC' }}>
          <CardHeader>
            <CardTitle className="text-lg" style={{ color: '#1A1A1A' }}>Grabado</CardTitle>
          </CardHeader>
          <CardContent>
            {grabados.length === 0 ? (
              <div className="p-4 rounded-lg border text-center" style={{ backgroundColor: '#F0EBE3', borderColor: '#E0D8CC' }}>
                <p className="mb-2 text-sm" style={{ color: '#6B6155' }}>No hay grabados disponibles</p>
                <p className="text-xs" style={{ color: '#6B6155' }}>Crea un grabado primero en la sección de <span className="font-semibold">Grabados</span></p>
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

        <Card className="border-2" style={{ backgroundColor: '#FFFFFF', borderColor: '#E0D8CC' }}>
          <CardHeader>
            <CardTitle className="text-lg" style={{ color: '#1A1A1A' }}>Variante (Opcional)</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={variant} onValueChange={setVariant} disabled={!selectedGrabadoId}>
              <SelectTrigger style={{ backgroundColor: '#F0EBE3', borderColor: '#E0D8CC', color: '#1A1A1A' }}>
                <SelectValue placeholder="General (sin variante)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">General (sin variante)</SelectItem>
                {variants.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.color_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {selectedGrabadoId && (
        <>
          <Card className="border-2 mb-6" style={{ backgroundColor: '#FFFFFF', borderColor: '#E0D8CC' }}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle style={{ color: '#1A1A1A' }}>Imágenes</CardTitle>
              <Button
                disabled={submitting}
                onClick={() => fileInputRef.current?.click()}
                style={{ backgroundColor: '#C8AD7F' }}
              >
                <Upload className="h-4 w-4 mr-2" />
                Subir Imagen
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#C8AD7F' }} />
                </div>
              ) : images.length === 0 ? (
                <div className="text-center py-12" style={{ color: '#6B6155' }}>
                  <p className="mb-2">No hay imágenes</p>
                  <p className="text-sm">
                    Haz clic en "Subir Imagen" para agregar una
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden border" style={{ backgroundColor: '#F0EBE3', borderColor: '#E0D8CC' }}>
                        <img
                          src={image.image_url}
                          alt="Grabado"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {image.is_main && (
                        <Badge className="absolute top-2 left-2" style={{ backgroundColor: '#FCD34D', color: '#78350F' }}>
                          <Star className="h-3 w-3 mr-1" />
                          Principal
                        </Badge>
                      )}

                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        {!image.is_main && (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleSetMain(image.id)}
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(image.id)}
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

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="border-2" style={{ backgroundColor: '#FFFFFF', borderColor: '#E0D8CC' }}>
              <DialogHeader>
                <DialogTitle style={{ color: '#1A1A1A' }}>Confirmar Imagen</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {previewUrl && (
                  <div className="relative aspect-square rounded-lg overflow-hidden border" style={{ backgroundColor: '#F0EBE3', borderColor: '#E0D8CC' }}>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="text-sm" style={{ color: '#1A1A1A' }}>
                  <p className="font-semibold mb-2">Variante:</p>
                  <p style={{ color: '#6B6155' }}>{variant && variant !== 'none' ? variants.find(v => v.id === variant)?.color_name : 'General (sin variante)'}</p>
                </div>
                <div className="flex gap-3 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDialogOpen(false)
                      setSelectedFile(null)
                      setPreviewUrl('')
                    }}
                    disabled={submitting}
                    style={{
                      borderColor: '#E0D8CC',
                      color: '#1A1A1A',
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleConfirmUpload}
                    disabled={submitting}
                    style={{ backgroundColor: '#C8AD7F' }}
                  >
                    {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Guardar Imagen
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  )
}
