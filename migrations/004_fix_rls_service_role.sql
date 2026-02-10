-- Migration: Fix RLS policies to allow service_role bypass
-- The previous policies were checking auth.role() = 'authenticated' 
-- but our API routes use SUPABASE_SERVICE_ROLE_KEY which has a different role

DO $$
BEGIN
  -- Drop and recreate product_variants policies
  DROP POLICY IF EXISTS "Admin write variants" ON product_variants;
  DROP POLICY IF EXISTS "Admin update variants" ON product_variants;
  DROP POLICY IF EXISTS "Admin delete variants" ON product_variants;

  CREATE POLICY "Admin write variants"
    ON product_variants FOR INSERT
    WITH CHECK (true);

  CREATE POLICY "Admin update variants"
    ON product_variants FOR UPDATE
    USING (true)
    WITH CHECK (true);

  CREATE POLICY "Admin delete variants"
    ON product_variants FOR DELETE
    USING (true);

  -- Drop and recreate product_images policies
  DROP POLICY IF EXISTS "Admin write images" ON product_images;
  DROP POLICY IF EXISTS "Admin update images" ON product_images;
  DROP POLICY IF EXISTS "Admin delete images" ON product_images;

  CREATE POLICY "Admin write images"
    ON product_images FOR INSERT
    WITH CHECK (true);

  CREATE POLICY "Admin update images"
    ON product_images FOR UPDATE
    USING (true)
    WITH CHECK (true);

  CREATE POLICY "Admin delete images"
    ON product_images FOR DELETE
    USING (true);

  -- Drop and recreate grabado_variants policies
  DROP POLICY IF EXISTS "Admin write grabado_variants" ON grabado_variants;
  DROP POLICY IF EXISTS "Admin update grabado_variants" ON grabado_variants;
  DROP POLICY IF EXISTS "Admin delete grabado_variants" ON grabado_variants;

  CREATE POLICY "Admin write grabado_variants"
    ON grabado_variants FOR INSERT
    WITH CHECK (true);

  CREATE POLICY "Admin update grabado_variants"
    ON grabado_variants FOR UPDATE
    USING (true)
    WITH CHECK (true);

  CREATE POLICY "Admin delete grabado_variants"
    ON grabado_variants FOR DELETE
    USING (true);

  -- Drop and recreate grabado_images policies
  DROP POLICY IF EXISTS "Admin write grabado_images" ON grabado_images;
  DROP POLICY IF EXISTS "Admin update grabado_images" ON grabado_images;
  DROP POLICY IF EXISTS "Admin delete grabado_images" ON grabado_images;

  CREATE POLICY "Admin write grabado_images"
    ON grabado_images FOR INSERT
    WITH CHECK (true);

  CREATE POLICY "Admin update grabado_images"
    ON grabado_images FOR UPDATE
    USING (true)
    WITH CHECK (true);

  CREATE POLICY "Admin delete grabado_images"
    ON grabado_images FOR DELETE
    USING (true);

END $$;
