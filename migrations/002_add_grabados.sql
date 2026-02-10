-- Migration: Create grabados (engraved items) table
-- Production-safe: Uses IF NOT EXISTS pattern, no DROPs
CREATE TABLE IF NOT EXISTS grabados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  is_new BOOLEAN DEFAULT FALSE,
  category TEXT NOT NULL DEFAULT 'grabados',
  subcategory TEXT NOT NULL,
  material TEXT NOT NULL,
  tagline TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create indexes for faster queries on grabados
CREATE INDEX IF NOT EXISTS idx_grabados_category ON grabados(category);
CREATE INDEX IF NOT EXISTS idx_grabados_is_featured ON grabados(is_featured) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_grabados_is_new ON grabados(is_new) WHERE is_new = TRUE;
CREATE INDEX IF NOT EXISTS idx_grabados_created_at ON grabados(created_at);

-- Migration: Create grabado_variants table
CREATE TABLE IF NOT EXISTS grabado_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grabado_id UUID NOT NULL REFERENCES grabados(id) ON DELETE CASCADE,
  color_name TEXT NOT NULL,
  color_hex TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE INDEX IF NOT EXISTS idx_grabado_variants_grabado_id ON grabado_variants(grabado_id);

-- Migration: Create grabado_images table
CREATE TABLE IF NOT EXISTS grabado_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grabado_id UUID NOT NULL REFERENCES grabados(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES grabado_variants(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_main BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE INDEX IF NOT EXISTS idx_grabado_images_grabado_id ON grabado_images(grabado_id);
CREATE INDEX IF NOT EXISTS idx_grabado_images_variant_id ON grabado_images(variant_id);
CREATE INDEX IF NOT EXISTS idx_grabado_images_is_main ON grabado_images(is_main) WHERE is_main = TRUE;

-- Enable Row Level Security (RLS)
ALTER TABLE grabados ENABLE ROW LEVEL SECURITY;
ALTER TABLE grabado_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE grabado_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow public read access to grabados
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'grabados' AND policyname = 'Public read access to grabados'
  ) THEN
    CREATE POLICY "Public read access to grabados"
      ON grabados FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'grabado_variants' AND policyname = 'Public read access to grabado_variants'
  ) THEN
    CREATE POLICY "Public read access to grabado_variants"
      ON grabado_variants FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'grabado_images' AND policyname = 'Public read access to grabado_images'
  ) THEN
    CREATE POLICY "Public read access to grabado_images"
      ON grabado_images FOR SELECT
      USING (true);
  END IF;

  -- RLS Policies - Admin only write access
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'grabados' AND policyname = 'Admin write grabados'
  ) THEN
    CREATE POLICY "Admin write grabados"
      ON grabados FOR INSERT
      WITH CHECK (auth.role() = 'authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'grabados' AND policyname = 'Admin update grabados'
  ) THEN
    CREATE POLICY "Admin update grabados"
      ON grabados FOR UPDATE
      USING (auth.role() = 'authenticated')
      WITH CHECK (auth.role() = 'authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'grabados' AND policyname = 'Admin delete grabados'
  ) THEN
    CREATE POLICY "Admin delete grabados"
      ON grabados FOR DELETE
      USING (auth.role() = 'authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'grabado_variants' AND policyname = 'Admin write grabado_variants'
  ) THEN
    CREATE POLICY "Admin write grabado_variants"
      ON grabado_variants FOR INSERT
      WITH CHECK (auth.role() = 'authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'grabado_variants' AND policyname = 'Admin update grabado_variants'
  ) THEN
    CREATE POLICY "Admin update grabado_variants"
      ON grabado_variants FOR UPDATE
      USING (auth.role() = 'authenticated')
      WITH CHECK (auth.role() = 'authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'grabado_variants' AND policyname = 'Admin delete grabado_variants'
  ) THEN
    CREATE POLICY "Admin delete grabado_variants"
      ON grabado_variants FOR DELETE
      USING (auth.role() = 'authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'grabado_images' AND policyname = 'Admin write grabado_images'
  ) THEN
    CREATE POLICY "Admin write grabado_images"
      ON grabado_images FOR INSERT
      WITH CHECK (auth.role() = 'authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'grabado_images' AND policyname = 'Admin update grabado_images'
  ) THEN
    CREATE POLICY "Admin update grabado_images"
      ON grabado_images FOR UPDATE
      USING (auth.role() = 'authenticated')
      WITH CHECK (auth.role() = 'authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'grabado_images' AND policyname = 'Admin delete grabado_images'
  ) THEN
    CREATE POLICY "Admin delete grabado_images"
      ON grabado_images FOR DELETE
      USING (auth.role() = 'authenticated');
  END IF;
END $$;

-- Enable the same storage bucket for grabado images (product-images is shared)
-- The bucket already exists from the products migration, so we don't need to create it again
