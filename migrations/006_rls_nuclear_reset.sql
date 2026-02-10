-- Migration: Drop ALL RLS policies and recreate them cleanly
-- This is a nuclear option to clear all conflicts

-- First, disable RLS temporarily if needed
-- ALTER TABLE product_images DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE grabado_images DISABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies
DO $$
DECLARE
  r RECORD;
BEGIN
  -- Drop all policies on product_images
  FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'product_images')
  LOOP
    EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON product_images';
  END LOOP;

  -- Drop all policies on grabado_images
  FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'grabado_images')
  LOOP
    EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON grabado_images';
  END LOOP;

  -- Drop all policies on product_variants
  FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'product_variants')
  LOOP
    EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON product_variants';
  END LOOP;

  -- Drop all policies on grabado_variants
  FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'grabado_variants')
  LOOP
    EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON grabado_variants';
  END LOOP;

END $$;

-- Now recreate policies cleanly with permissive policies (no restrictions)
-- product_images - allow everything
CREATE POLICY "product_images_select" ON product_images FOR SELECT USING (true);
CREATE POLICY "product_images_insert" ON product_images FOR INSERT WITH CHECK (true);
CREATE POLICY "product_images_update" ON product_images FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "product_images_delete" ON product_images FOR DELETE USING (true);

-- grabado_images - allow everything
CREATE POLICY "grabado_images_select" ON grabado_images FOR SELECT USING (true);
CREATE POLICY "grabado_images_insert" ON grabado_images FOR INSERT WITH CHECK (true);
CREATE POLICY "grabado_images_update" ON grabado_images FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "grabado_images_delete" ON grabado_images FOR DELETE USING (true);

-- product_variants - allow everything
CREATE POLICY "product_variants_select" ON product_variants FOR SELECT USING (true);
CREATE POLICY "product_variants_insert" ON product_variants FOR INSERT WITH CHECK (true);
CREATE POLICY "product_variants_update" ON product_variants FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "product_variants_delete" ON product_variants FOR DELETE USING (true);

-- grabado_variants - allow everything
CREATE POLICY "grabado_variants_select" ON grabado_variants FOR SELECT USING (true);
CREATE POLICY "grabado_variants_insert" ON grabado_variants FOR INSERT WITH CHECK (true);
CREATE POLICY "grabado_variants_update" ON grabado_variants FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "grabado_variants_delete" ON grabado_variants FOR DELETE USING (true);
