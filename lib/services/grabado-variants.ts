import { supabase, type Database } from '../supabase'

// Manual type definitions (replace with auto-generated types after SQL migration)
export interface GrabadoVariant {
  id: string
  grabado_id: string
  color_name: string
  color_hex: string
  created_at: string
}

export type GrabadoVariantInsert = Omit<GrabadoVariant, 'id' | 'created_at'>

export async function getVariantsByGrabadoId(grabadoId: string) {
  const { data, error } = await supabase
    .from('grabado_variants')
    .select('*')
    .eq('grabado_id', grabadoId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

export async function createVariant(variant: GrabadoVariantInsert) {
  const { data, error } = await supabase
    .from('grabado_variants')
    .insert([variant])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateVariant(
  id: string,
  updates: Partial<GrabadoVariantInsert>
) {
  const { data, error } = await supabase
    .from('grabado_variants')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteVariant(id: string) {
  const { error } = await supabase
    .from('grabado_variants')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function bulkCreateVariants(variants: GrabadoVariantInsert[]) {
  const { data, error } = await supabase
    .from('grabado_variants')
    .insert(variants)
    .select()

  if (error) throw error
  return data
}
