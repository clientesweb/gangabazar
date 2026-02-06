-- Migration: Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  is_new BOOLEAN DEFAULT FALSE,
  category TEXT NOT NULL CHECK (category IN ('termos', 'mates', 'accesorios')),
  subcategory TEXT NOT NULL,
  material TEXT NOT NULL,
  tagline TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create index for faster category queries
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_is_featured ON products(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_products_is_new ON products(is_new) WHERE is_new = TRUE;
CREATE INDEX idx_products_created_at ON products(created_at);

-- Migration: Create product_variants table
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  color_name TEXT NOT NULL,
  color_hex TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE INDEX idx_variants_product_id ON product_variants(product_id);

-- Migration: Create product_images table
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_main BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE INDEX idx_images_product_id ON product_images(product_id);
CREATE INDEX idx_images_variant_id ON product_images(variant_id);
CREATE INDEX idx_images_is_main ON product_images(is_main) WHERE is_main = TRUE;

-- Migration: Create admin_users table
CREATE TABLE admin_users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow public read access to products
CREATE POLICY "Public read access to products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Public read access to variants"
  ON product_variants FOR SELECT
  USING (true);

CREATE POLICY "Public read access to images"
  ON product_images FOR SELECT
  USING (true);

-- RLS Policies - Admin only write access (attach to auth.users)
CREATE POLICY "Admin write products"
  ON products FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin update products"
  ON products FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin delete products"
  ON products FOR DELETE
  USING (auth.role() = 'authenticated');

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read from storage
CREATE POLICY "Public read access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated upload access"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'product-images'
    AND auth.role() = 'authenticated'
  );
