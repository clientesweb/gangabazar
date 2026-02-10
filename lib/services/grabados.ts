import { supabase, type Database } from '../supabase'

// Manual type definitions (replace with auto-generated types after SQL migration)
export interface Grabado {
  id: string
  name: string
  description: string
  price: number
  is_featured: boolean
  is_new: boolean
  category: string
  subcategory: string
  material: string
  tagline: string
  created_at: string
  updated_at: string
}

export type GrabadoInsert = Omit<Grabado, 'id' | 'created_at' | 'updated_at'>
export type GrabadoUpdate = Partial<GrabadoInsert>

export type GrabadoWithDetails = Grabado & {
  variants?: any[]
  images?: any[]
  mainImage?: string
}

// Helper function to generate slug from grabado name
export function generateGrabadoSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

// Find grabado by slug or ID
export async function getGrabadoBySlugOrId(slugOrId: string) {
  // First try to find by ID (in case it's a UUID)
  const { data: grabadoById } = await supabase
    .from('grabados')
    .select('*')
    .eq('id', slugOrId)
    .single()

  if (grabadoById) return grabadoById

  // If not found by ID, try to find by slug match
  const { data: allGrabados } = await supabase
    .from('grabados')
    .select('*')

  if (!allGrabados) throw new Error('Grabado no encontrado')

  const grabado = allGrabados.find((g: any) => generateGrabadoSlug(g.name) === slugOrId)
  if (!grabado) throw new Error('Grabado no encontrado')

  return grabado
}

export async function getGrabadoBySlugOrIdWithDetails(slugOrId: string) {
  const grabado = await getGrabadoBySlugOrId(slugOrId)

  const [variantsRes, imagesRes] = await Promise.all([
    supabase.from('grabado_variants').select('*').eq('grabado_id', grabado.id),
    supabase.from('grabado_images').select('*').eq('grabado_id', grabado.id).order('is_main', { ascending: false }).order('created_at', { ascending: true }),
  ])

  const imageList = imagesRes.data || []
  const mainImage = imageList.find((img: any) => img.is_main)?.image_url || imageList[0]?.image_url

  return {
    ...grabado,
    variants: variantsRes.data || [],
    images: imageList.length > 0 ? imageList : [],
    mainImage,
  }
}

export async function getGrabados() {
  const { data, error } = await supabase
    .from('grabados')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Grabado[]
}

export async function getGrabadoById(id: string) {
  const { data, error } = await supabase
    .from('grabados')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function getGrabadoByIdWithDetails(id: string) {
  const { data: grabado, error } = await supabase
    .from('grabados')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error

  const [variantsRes, imagesRes] = await Promise.all([
    supabase.from('grabado_variants').select('*').eq('grabado_id', id),
    supabase.from('grabado_images').select('*').eq('grabado_id', id).order('is_main', { ascending: false }).order('created_at', { ascending: true }),
  ])

  const imageList = imagesRes.data || []
  const mainImage = imageList.find((img: any) => img.is_main)?.image_url || imageList[0]?.image_url

  return {
    ...grabado,
    variants: variantsRes.data || [],
    images: imageList.length > 0 ? imageList : [],
    mainImage,
  }
}

export async function getFeaturedGrabados(limit = 4) {
  const { data, error } = await supabase
    .from('grabados')
    .select('*')
    .eq('is_featured', true)
    .limit(limit)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getFeaturedGrabadosWithDetails(limit = 4) {
  const { data: grabados, error } = await supabase
    .from('grabados')
    .select('*')
    .eq('is_featured', true)
    .limit(limit)
    .order('created_at', { ascending: false })

  if (error) throw error

  const withDetails = await Promise.all(
    (grabados || []).map(async (grabado: any) => {
      const [variantsRes, imagesRes] = await Promise.all([
        supabase.from('grabado_variants').select('*').eq('grabado_id', grabado.id),
        supabase.from('grabado_images').select('*').eq('grabado_id', grabado.id).order('is_main', { ascending: false }).order('created_at', { ascending: true }),
      ])

      const imageList = imagesRes.data || []
      const mainImage = imageList.find((img: any) => img.is_main)?.image_url || imageList[0]?.image_url

      return {
        ...grabado,
        variants: variantsRes.data || [],
        images: imageList,
        mainImage,
      }
    })
  )

  return withDetails
}

export async function getNewGrabados(limit = 4) {
  const { data, error } = await supabase
    .from('grabados')
    .select('*')
    .eq('is_new', true)
    .limit(limit)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getNewGrabadosWithDetails(limit = 4) {
  const { data: grabados, error } = await supabase
    .from('grabados')
    .select('*')
    .eq('is_new', true)
    .limit(limit)
    .order('created_at', { ascending: false })

  if (error) throw error

  const withDetails = await Promise.all(
    (grabados || []).map(async (grabado: any) => {
      const [variantsRes, imagesRes] = await Promise.all([
        supabase.from('grabado_variants').select('*').eq('grabado_id', grabado.id),
        supabase.from('grabado_images').select('*').eq('grabado_id', grabado.id).order('is_main', { ascending: false }).order('created_at', { ascending: true }),
      ])

      const mainImage = imagesRes.data?.find((img: any) => img.is_main)?.image_url || grabado.image

      return {
        ...grabado,
        variants: variantsRes.data || [],
        images: imagesRes.data || [],
        mainImage,
      }
    })
  )

  return withDetails
}

export async function createGrabado(grabado: GrabadoInsert) {
  const { data, error } = await supabase
    .from('grabados')
    .insert([grabado])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateGrabado(id: string, updates: GrabadoUpdate) {
  const { data, error } = await supabase
    .from('grabados')
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

export async function deleteGrabado(id: string) {
  const { error } = await supabase
    .from('grabados')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function toggleFeaturedGrabado(id: string, isFeatured: boolean) {
  return updateGrabado(id, { is_featured: isFeatured })
}

export async function toggleNewGrabado(id: string, isNew: boolean) {
  return updateGrabado(id, { is_new: isNew })
}
