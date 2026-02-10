import { supabase, type Database } from '../supabase'

// Manual type definitions (replace with auto-generated types after SQL migration)
export interface GrabadoImage {
  id: string
  grabado_id: string
  variant_id: string | null
  image_url: string
  is_main: boolean
  created_at: string
}

export type GrabadoImageInsert = Omit<GrabadoImage, 'id' | 'created_at'>

export async function getImagesByGrabadoId(grabadoId: string) {
  const { data, error } = await supabase
    .from('grabado_images')
    .select('*')
    .eq('grabado_id', grabadoId)
    .order('is_main', { ascending: false })
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

export async function getImagesByVariantId(variantId: string) {
  const { data, error } = await supabase
    .from('grabado_images')
    .select('*')
    .eq('variant_id', variantId)
    .order('is_main', { ascending: false })
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

export async function getMainImage(grabadoId: string, variantId?: string) {
  let query = supabase
    .from('grabado_images')
    .select('*')
    .eq('grabado_id', grabadoId)
    .eq('is_main', true)

  if (variantId) {
    query = query.eq('variant_id', variantId)
  } else {
    query = query.is('variant_id', null)
  }

  const { data, error } = await query.single()

  if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows found
  return data || null
}

export async function uploadGrabadoImage(
  grabadoId: string,
  file: File,
  variantId?: string
): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${grabadoId}/${variantId || 'main'}/${Date.now()}.${fileExt}`
  const filePath = `grabados/${fileName}`

  try {
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file, { upsert: true })

    if (uploadError) throw uploadError

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('product-images').getPublicUrl(filePath)

    return publicUrl
  } catch (err: any) {
    // Normalize error for client
    const message = err?.message || String(err)
    throw new Error(`Error subiendo imagen: ${message}`)
  }
}

export async function createImage(image: GrabadoImageInsert) {
  const { data, error } = await supabase
    .from('grabado_images')
    .insert([image])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateImage(
  id: string,
  updates: Partial<GrabadoImageInsert>
) {
  const { data, error } = await supabase
    .from('grabado_images')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function setMainImage(
  imageId: string,
  grabadoId: string,
  variantId?: string
) {
  // First, unset all other main images for this grabado/variant combo
  let query = supabase
    .from('grabado_images')
    .update({ is_main: false })
    .eq('grabado_id', grabadoId)

  if (variantId) {
    query = query.eq('variant_id', variantId)
  } else {
    query = query.is('variant_id', null)
  }

  await query

  // Set the new main image
  return updateImage(imageId, { is_main: true })
}

export async function deleteImage(id: string) {
  // Get the image URL to delete from storage
  const { data: image } = await supabase
    .from('grabado_images')
    .select('image_url')
    .eq('id', id)
    .single()

  // Delete from database
  const { error } = await supabase
    .from('grabado_images')
    .delete()
    .eq('id', id)

  if (error) throw error

  // Delete from storage if it exists
  if (image?.image_url && image.image_url.includes('/storage/v1/object/public/product-images/')) {
    const path = image.image_url.split('/product-images/')[1]
    if (path) {
      await supabase.storage.from('product-images').remove([path])
    }
  }
}
