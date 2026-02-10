-- Migration: Add missing RLS policies for product_images and variants
-- This fixes the "row-level security policy" error when uploading product images

DO $$
BEGIN
  -- Add INSERT policy for product_variants
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'product_variants' AND policyname = 'Admin write variants'
  ) THEN
    CREATE POLICY "Admin write variants"
      ON product_variants FOR INSERT
      WITH CHECK (auth.role() = 'authenticated');
  END IF;

  -- Add UPDATE policy for product_variants
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'product_variants' AND policyname = 'Admin update variants'
  ) THEN
    CREATE POLICY "Admin update variants"
      ON product_variants FOR UPDATE
      USING (auth.role() = 'authenticated')
      WITH CHECK (auth.role() = 'authenticated');
  END IF;

  -- Add DELETE policy for product_variants
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'product_variants' AND policyname = 'Admin delete variants'
  ) THEN
    CREATE POLICY "Admin delete variants"
      ON product_variants FOR DELETE
      USING (auth.role() = 'authenticated');
  END IF;

  -- Add INSERT policy for product_images
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'product_images' AND policyname = 'Admin write images'
  ) THEN
    CREATE POLICY "Admin write images"
      ON product_images FOR INSERT
      WITH CHECK (auth.role() = 'authenticated');
  END IF;

  -- Add UPDATE policy for product_images
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'product_images' AND policyname = 'Admin update images'
  ) THEN
    CREATE POLICY "Admin update images"
      ON product_images FOR UPDATE
      USING (auth.role() = 'authenticated')
      WITH CHECK (auth.role() = 'authenticated');
  END IF;

  -- Add DELETE policy for product_images
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'product_images' AND policyname = 'Admin delete images'
  ) THEN
    CREATE POLICY "Admin delete images"
      ON product_images FOR DELETE
      USING (auth.role() = 'authenticated');
  END IF;

  -- Complete grabado_images policies
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
