/**
 * Script de Migración: Importar productos locales a Supabase
 * 
 * Este script toma los productos hardcodeados en lib/products.ts
 * y los migra a Supabase de forma automática.
 * 
 * Uso:
 * 1. Configura las variables de entorno en .env.local
 * 2. Ejecuta: ts-node scripts/migrate-products.ts
 */

import { createClient } from '@supabase/supabase-js'
import { products } from '../lib/products'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'Faltan variables de entorno. Configura NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY'
  )
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function migrateProducts() {
  console.log(`📦 Iniciando migración de ${products.length} productos...`)

  for (const product of products) {
    try {
      // Insert product
      const { data: createdProduct, error: productError } = await supabase
        .from('products')
        .insert({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          subcategory: product.subcategory,
          material: product.material,
          tagline: product.tagline,
          is_featured: product.name.includes('Kit') || product.name.includes('Termo'), // Example logic
          is_new: product.isNew,
        })
        .select()
        .single()

      if (productError) throw productError

      console.log(`✅ Producto creado: "${product.name}" (${createdProduct.id})`)

      // Insert variants
      if (product.colors && product.colors.length > 0) {
        const variantsData = product.colors.map((color) => ({
          product_id: createdProduct.id,
          color_name: color.name,
          color_hex: color.hex,
        }))

        const { error: variantsError } = await supabase
          .from('product_variants')
          .insert(variantsData)

        if (variantsError) throw variantsError
        console.log(`   📝 ${variantsData.length} variantes de color agregadas`)
      }

      // Insert main image
      if (product.image) {
        const { error: imageError } = await supabase
          .from('product_images')
          .insert({
            product_id: createdProduct.id,
            image_url: product.image,
            is_main: true,
          })

        if (imageError) throw imageError
        console.log(`   🖼️ Imagen principal agregada`)
      }

      // Insert additional images
      if (product.images && product.images.length > 1) {
        const additionalImages = product.images
          .slice(1)
          .map((image) => ({
            product_id: createdProduct.id,
            image_url: image,
            is_main: false,
          }))

        const { error: imagesError } = await supabase
          .from('product_images')
          .insert(additionalImages)

        if (imagesError) throw imagesError
        console.log(`   📸 ${additionalImages.length} imágenes adicionales agregadas`)
      }
    } catch (error) {
      console.error(`❌ Error al migrar producto "${product.name}":`, error)
    }
  }

  console.log('\n✨ ¡Migración completada!')
}

// Run migration
migrateProducts().catch(console.error)
