import { supabase, type Database } from '../supabase'

export type Product = Database['public']['Tables']['products']['Row']
export type ProductInsert = Database['public']['Tables']['products']['Insert']
export type ProductUpdate = Database['public']['Tables']['products']['Update']

export type ProductWithDetails = Product & {
  variants?: any[]
  images?: any[]
  mainImage?: string
}

// Helper function to generate slug from product name
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

// Find product by slug or ID
export async function getProductBySlugOrId(slugOrId: string) {
  // First try to find by ID (in case it's a UUID)
  const { data: productById } = await supabase
    .from('products')
    .select('*')
    .eq('id', slugOrId)
    .single()

  if (productById) return productById

  // If not found by ID, try to find by slug match
  const { data: allProducts } = await supabase
    .from('products')
    .select('*')

  if (!allProducts) throw new Error('Product not found')

  const product = allProducts.find(p => generateSlug(p.name) === slugOrId)
  if (!product) throw new Error('Product not found')

  return product
}

export async function getProductBySlugOrIdWithDetails(slugOrId: string) {
  const product = await getProductBySlugOrId(slugOrId)

  const [variantsRes, imagesRes] = await Promise.all([
    supabase.from('product_variants').select('*').eq('product_id', product.id),
    supabase.from('product_images').select('*').eq('product_id', product.id).order('is_main', { ascending: false }).order('created_at', { ascending: true }),
  ])

  const imageList = imagesRes.data || []
  const mainImage = imageList.find((img) => img.is_main)?.image_url || imageList[0]?.image_url || product.image

  return {
    ...product,
    variants: variantsRes.data || [],
    images: imageList.length > 0 ? imageList : [],
    mainImage,
  }
}

export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Product[]
}

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return {
    ...data,
    sizes: [], // Empty array for compatibility
  }
}

export async function getProductByIdWithDetails(id: string) {
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error

  const [variantsRes, imagesRes] = await Promise.all([
    supabase.from('product_variants').select('*').eq('product_id', id),
    supabase.from('product_images').select('*').eq('product_id', id).order('is_main', { ascending: false }).order('created_at', { ascending: true }),
  ])

  const imageList = imagesRes.data || []
  const mainImage = imageList.find((img) => img.is_main)?.image_url || imageList[0]?.image_url || product.image

  return {
    ...product,
    variants: variantsRes.data || [],
    images: imageList.length > 0 ? imageList : [],
    mainImage,
  }
}

export async function getProductsByCategory(category: 'termos' | 'mates' | 'accesorios') {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data || []).map((p) => ({
    ...p,
    sizes: [], // Empty array for compatibility
  }))
}

export async function getFeaturedProducts(limit = 4) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .limit(limit)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data || []).map((p) => ({
    ...p,
    sizes: [], // Empty array for compatibility
  }))
}

export async function getFeaturedProductsWithDetails(limit = 4) {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .limit(limit)
    .order('created_at', { ascending: false })

  if (error) throw error

  const withDetails = await Promise.all(
    (products || []).map(async (product) => {
      const [variantsRes, imagesRes] = await Promise.all([
        supabase.from('product_variants').select('*').eq('product_id', product.id),
        supabase.from('product_images').select('*').eq('product_id', product.id).order('is_main', { ascending: false }).order('created_at', { ascending: true }),
      ])

      const imageList = imagesRes.data || []
      const mainImage = imageList.find((img) => img.is_main)?.image_url || imageList[0]?.image_url || product.image

      return {
        ...product,
        variants: variantsRes.data || [],
        images: imageList,
        mainImage,
      }
    })
  )

  return withDetails
}

export async function getNewProducts(limit = 4) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_new', true)
    .limit(limit)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data || []).map((p) => ({
    ...p,
    sizes: [], // Empty array for compatibility
  }))
}

export async function getNewProductsWithDetails(limit = 4) {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_new', true)
    .limit(limit)
    .order('created_at', { ascending: false })

  if (error) throw error

  const withDetails = await Promise.all(
    (products || []).map(async (product) => {
      const [variantsRes, imagesRes] = await Promise.all([
        supabase.from('product_variants').select('*').eq('product_id', product.id),
        supabase.from('product_images').select('*').eq('product_id', product.id).order('is_main', { ascending: false }).order('created_at', { ascending: true }),
      ])

      const mainImage = imagesRes.data?.find((img) => img.is_main)?.image_url || product.image

      return {
        ...product,
        variants: variantsRes.data || [],
        images: imagesRes.data || [],
        mainImage,
      }
    })
  )

  return withDetails
}

export async function createProduct(product: ProductInsert) {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateProduct(id: string, updates: ProductUpdate) {
  const { data, error } = await supabase
    .from('products')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteProduct(id: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function toggleFeatured(id: string, isFeatured: boolean) {
  return updateProduct(id, { is_featured: isFeatured })
}

export async function toggleNew(id: string, isNew: boolean) {
  return updateProduct(id, { is_new: isNew })
}
