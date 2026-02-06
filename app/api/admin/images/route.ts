import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

function getAdminClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return null
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
}

export async function POST(request: Request) {
  try {
    const supabaseAdmin = getAdminClient()
    if (!supabaseAdmin) return NextResponse.json({ error: 'Server missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 })

    const body = await request.json()
    const { product_id, variant_id, image_url, is_main } = body
    if (!product_id || !image_url) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const { data, error } = await supabaseAdmin
      .from('product_images')
      .insert([{ product_id, variant_id: variant_id ?? null, image_url, is_main: !!is_main }])
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const supabaseAdmin = getAdminClient()
    if (!supabaseAdmin) return NextResponse.json({ error: 'Server missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 })

    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const body = await request.json()
    // We'll treat PATCH as "set main" for the given id when product_id is provided
    const { product_id, variant_id } = body
    if (!product_id) return NextResponse.json({ error: 'Missing product_id for set main' }, { status: 400 })

    // Unset existing main images for this product/variant combo
    let query = supabaseAdmin
      .from('product_images')
      .update({ is_main: false })
      .eq('product_id', product_id)

    if (variant_id) {
      query = query.eq('variant_id', variant_id)
    } else {
      query = query.is('variant_id', null)
    }

    await query

    const { data, error } = await supabaseAdmin
      .from('product_images')
      .update({ is_main: true })
      .eq('id', id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabaseAdmin = getAdminClient()
    if (!supabaseAdmin) return NextResponse.json({ error: 'Server missing SUPABASE_SERVICE_ROLE_KEY' }, { status: 500 })

    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    // Get image row to know path
    const { data: image, error: fetchErr } = await supabaseAdmin
      .from('product_images')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchErr) return NextResponse.json({ error: fetchErr.message }, { status: 500 })

    const { error } = await supabaseAdmin
      .from('product_images')
      .delete()
      .eq('id', id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Delete object from storage if matching public URL pattern
    if (image?.image_url && image.image_url.includes('/storage/v1/object/public/product-images/')) {
      const path = image.image_url.split('/product-images/')[1]
      if (path) {
        await supabaseAdmin.storage.from('product-images').remove([path])
      }
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}
