import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check .env.local'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for database tables
export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          is_featured: boolean
          is_new: boolean
          category: 'termos' | 'mates' | 'accesorios'
          subcategory: string
          material: string
          tagline: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['products']['Row']>
      }
      product_variants: {
        Row: {
          id: string
          product_id: string
          color_name: string
          color_hex: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['product_variants']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['product_variants']['Row']>
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          variant_id: string | null
          image_url: string
          is_main: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['product_images']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['product_images']['Row']>
      }
      admin_users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['admin_users']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['admin_users']['Row']>
      }
    }
  }
}
