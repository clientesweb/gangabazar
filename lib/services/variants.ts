import { supabase, type Database } from '../supabase'

export type ProductVariant = Database['public']['Tables']['product_variants']['Row']
export type ProductVariantInsert = Database['public']['Tables']['product_variants']['Insert']

export async function getVariantsByProductId(productId: string) {
  const { data, error } = await supabase
    .from('product_variants')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

export async function createVariant(variant: ProductVariantInsert) {
  const { data, error } = await supabase
    .from('product_variants')
    .insert([variant])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateVariant(
  id: string,
  updates: Partial<ProductVariantInsert>
) {
  const { data, error } = await supabase
    .from('product_variants')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteVariant(id: string) {
  const { error } = await supabase
    .from('product_variants')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function bulkCreateVariants(variants: ProductVariantInsert[]) {
  const { data, error } = await supabase
    .from('product_variants')
    .insert(variants)
    .select()

  if (error) throw error
  return data
}
