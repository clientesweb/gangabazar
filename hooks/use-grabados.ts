import { useState, useCallback, useEffect } from 'react'
import {
  getGrabados,
  getGrabadoById,
  createGrabado,
  updateGrabado,
  deleteGrabado,
  type Grabado,
  type GrabadoInsert,
  type GrabadoUpdate,
} from '@/lib/services/grabados'
import { getVariantsByGrabadoId } from '@/lib/services/grabado-variants'
import { getImagesByGrabadoId } from '@/lib/services/grabado-images'

export function useGrabados() {
  const [grabados, setGrabados] = useState<Grabado[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const loadGrabados = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getGrabados()
      setGrabados(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load grabados'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadGrabados()
  }, [loadGrabados])

  const add = useCallback(
    async (grabado: GrabadoInsert) => {
      try {
        const newGrabado = await createGrabado(grabado)
        setGrabados((prev: Grabado[]) => [newGrabado, ...prev])
        return newGrabado
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to create grabado')
        setError(error)
        throw error
      }
    },
    []
  )

  const update = useCallback(async (id: string, updates: GrabadoUpdate) => {
    try {
      const updated = await updateGrabado(id, updates)
      setGrabados((prev: Grabado[]) =>
        prev.map((g: Grabado) => (g.id === id ? updated : g))
      )
      return updated
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update grabado')
      setError(error)
      throw error
    }
  }, [])

  const remove = useCallback(async (id: string) => {
    try {
      await deleteGrabado(id)
      setGrabados((prev: Grabado[]) => prev.filter((g: Grabado) => g.id !== id))
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete grabado')
      setError(error)
      throw error
    }
  }, [])

  return {
    grabados,
    loading,
    error,
    loadGrabados,
    add,
    update,
    remove,
  }
}

export function useGrabadoDetail(grabadoId: string) {
  const [grabado, setGrabado] = useState<Grabado | null>(null)
  const [variants, setVariants] = useState<any[]>([])
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const [grab, vars, imgs] = await Promise.all([
          getGrabadoById(grabadoId),
          getVariantsByGrabadoId(grabadoId),
          getImagesByGrabadoId(grabadoId),
        ])
        setGrabado(grab)
        setVariants(vars)
        setImages(imgs)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load grabado detail'))
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [grabadoId])

  return { grabado, variants, images, loading, error }
}
