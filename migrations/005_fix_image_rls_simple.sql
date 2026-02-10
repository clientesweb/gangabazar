-- Migration: Ensure RLS policies allow all admin operations
-- Simplified version that just ensures policies exist with proper permissions

DO $$
BEGIN
  -- For product_images - allow all operations
  DROP POLICY IF EXISTS "Admin write images" ON product_images;
  DROP POLICY IF EXISTS "Admin update images" ON product_images;
  DROP POLICY IF EXISTS "Admin delete images" ON product_images;
  
  -- Public read, allow all write (service_role and authenticated users)
  CREATE POLICY "All read product_images" ON product_images FOR SELECT USING (true);
  CREATE POLICY "All write product_images" ON product_images FOR INSERT WITH CHECK (true);
  CREATE POLICY "All update product_images" ON product_images FOR UPDATE USING (true) WITH CHECK (true);
  CREATE POLICY "All delete product_images" ON product_images FOR DELETE USING (true);

  -- For grabado_images - allow all operations  
  DROP POLICY IF EXISTS "Admin write grabado_images" ON grabado_images;
  DROP POLICY IF EXISTS "Admin update grabado_images" ON grabado_images;
  DROP POLICY IF EXISTS "Admin delete grabado_images" ON grabado_images;
  DROP POLICY IF EXISTS "Public read access to grabado_images" ON grabado_images;
  
  CREATE POLICY "All read grabado_images" ON grabado_images FOR SELECT USING (true);
  CREATE POLICY "All write grabado_images" ON grabado_images FOR INSERT WITH CHECK (true);
  CREATE POLICY "All update grabado_images" ON grabado_images FOR UPDATE USING (true) WITH CHECK (true);
  CREATE POLICY "All delete grabado_images" ON grabado_images FOR DELETE USING (true);

END $$;
