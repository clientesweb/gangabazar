import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

function getAdminClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing Supabase config:', { 
      hasUrl: !!SUPABASE_URL, 
      hasKey: !!SUPABASE_SERVICE_ROLE_KEY 
    })
    return null
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
}

export async function POST(request: Request) {
  try {
    console.log('=== Upload endpoint started ===')
    
    const supabaseAdmin = getAdminClient()
    if (!supabaseAdmin) {
      console.error('Failed to create admin client')
      return NextResponse.json({ error: 'Server missing Supabase configuration' }, { status: 500 })
    }

    const form = await request.formData()
    const file = form.get('file') as File | null
    const productId = form.get('productId') as string | null
    const variantId = form.get('variantId') as string | null

    console.log('Form data received:', { 
      hasFile: !!file, 
      productId, 
      variantId,
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type
    })

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!productId) {
      return NextResponse.json({ error: 'No productId provided' }, { status: 400 })
    }

    const ext = file.name.split('.').pop() || 'jpg'
    const timestamp = Date.now()
    const filePath = `products/${productId}/${variantId ?? 'main'}/${timestamp}.${ext}`

    console.log('Upload parameters:', { filePath, fileSize: file.size })

    // Convert File to Blob/Buffer
    const buffer = await file.arrayBuffer()
    
    console.log('File converted to buffer, attempting storage upload...')

    const { error: uploadError, data: uploadData } = await supabaseAdmin.storage
      .from('product-images')
      .upload(filePath, new Uint8Array(buffer), {
        contentType: file.type,
        upsert: true
      })

    if (uploadError) {
      console.error('Supabase storage error:', {
        message: uploadError.message,
        status: (uploadError as any).status,
        statusCode: (uploadError as any).statusCode,
        error: uploadError
      })
      return NextResponse.json({ error: `Storage error: ${uploadError.message}` }, { status: 500 })
    }

    console.log('File uploaded successfully:', uploadData)

    const { data: urlData } = supabaseAdmin.storage
      .from('product-images')
      .getPublicUrl(filePath)

    console.log('Public URL generated:', urlData.publicUrl)

    return NextResponse.json({ publicUrl: urlData.publicUrl })
  } catch (err: any) {
    console.error('Upload endpoint exception:', {
      message: err?.message,
      stack: err?.stack,
      error: err
    })
    return NextResponse.json({ 
      error: `Server error: ${err?.message || String(err)}` 
    }, { status: 500 })
  }
}
