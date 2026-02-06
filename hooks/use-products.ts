import { useState, useCallback, useEffect } from 'react'
import {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  type Product,
  type ProductInsert,
  type ProductUpdate,
} from '@/lib/services/products'
import { getVariantsByProductId } from '@/lib/services/variants'
import { getImagesByProductId } from '@/lib/services/images'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load products'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const add = useCallback(
    async (product: ProductInsert) => {
      try {
        const newProduct = await createProduct(product)
        setProducts((prev) => [newProduct, ...prev])
        return newProduct
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to create product')
        setError(error)
        throw error
      }
    },
    []
  )

  const update = useCallback(async (id: string, updates: ProductUpdate) => {
    try {
      const updated = await updateProduct(id, updates)
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      )
      return updated
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update product')
      setError(error)
      throw error
    }
  }, [])

  const remove = useCallback(async (id: string) => {
    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete product')
      setError(error)
      throw error
    }
  }, [])

  return {
    products,
    loading,
    error,
    loadProducts,
    add,
    update,
    remove,
  }
}

export function useProductDetail(productId: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [variants, setVariants] = useState<any[]>([])
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const [prod, vars, imgs] = await Promise.all([
          getProductById(productId),
          getVariantsByProductId(productId),
          getImagesByProductId(productId),
        ])
        setProduct(prod)
        setVariants(vars)
        setImages(imgs)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load product detail'))
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [productId])

  return { product, variants, images, loading, error }
}
