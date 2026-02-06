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

    const form = await request.formData()
    const file = form.get('file') as File | null
    const productId = form.get('productId') as string | null
    const variantId = form.get('variantId') as string | null

    if (!file || !productId) return NextResponse.json({ error: 'Missing file or productId' }, { status: 400 })

    const fileName = file.name
    const ext = fileName.split('.').pop() || 'jpg'
    const filePath = `products/${productId}/${variantId ?? 'main'}/${Date.now()}.${ext}`

    const { error: uploadError } = await supabaseAdmin.storage
      .from('product-images')
      .upload(filePath, file, { upsert: true })

    if (uploadError) return NextResponse.json({ error: uploadError.message || String(uploadError) }, { status: 500 })

    const { data } = supabaseAdmin.storage.from('product-images').getPublicUrl(filePath)

    return NextResponse.json({ publicUrl: data.publicUrl })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}
