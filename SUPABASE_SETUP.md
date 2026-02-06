# Configuración de Supabase - Tienda de Mates

## 📋 Pasos de Configuración

### 1. Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Copia tu **Project URL** y **Anon Key** del dashboard

### 2. Configurar variables de entorno

Copia `.env.local.example` a `.env.local`:

```bash
cp .env.local.example .env.local
```

Luego rellena con tus credenciales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here  # Para migraciones
```

### 3. Crear tablas en la base de datos

1. Ve a Supabase Dashboard → SQL Editor
2. Abre el archivo `migrations/001_initial_schema.sql`
3. Copia TODO el contenido y pégalo en el SQL Editor
4. Ejecuta la migración (botón "Run" o Cmd+Enter)

### 4. Crear Storage Bucket

1. Ve a Storage → Create a new bucket
2. Nombre: `product-images`
3. Habilita "Public bucket"
4. Crea el bucket

### 5. Crear usuario administrador

Para crear tu primer usuario admin:

1. Ve a Authentication → Users
2. Click en "Invite"
3. Ingresa tu email
4. Confirma el email invitación
5. Sé tu admin

Opcionalmente, agrega el email a la tabla `admin_users` para futuras verificaciones.

### 6. Migrar productos existentes

Si ya tienes productos locales en `lib/products.ts`:

```bash
# Primero, instala ts-node (si no lo tienes)
npm install -g ts-node

# Ejecuta la migración
npm run migrate:products
```

O manualmente desde el SQL Editor en Supabase, ejecuta:

```sql
INSERT INTO products (name, description, price, category, subcategory, material, tagline, is_featured, is_new)
VALUES
  ('Termo Stanley Classic 1L', 'Termo Stanley...', 45000, 'termos', 'Termos clásicos', 'Acero inoxidable 18/8', 'El clásico que nunca falla', true, true),
  -- ... más productos
;
```

## 🔐 Autenticación Admin

### Login en el panel

1. Ve a `/admin/login`
2. Usa las credenciales que creaste en Auth
3. Serás redirigido a `/admin` si estás autenticado

### Rutas protegidas

- `/admin` - Dashboard (requiere auth)
- `/admin/productos` - Gestión de productos
- `/admin/variantes` - Gestión de colores
- `/admin/imagenes` - Gestión de imágenes
- `/admin/login` - Login (acceso público)

## 📦 Funcionalidades del Panel

### Dashboard (`/admin`)

- Ver estadísticas generales
- Total de productos
- Productos destacados y nuevos

### Productos (`/admin/productos`)

- ✅ Listar todos los productos
- ✅ Crear nuevo producto
- ✅ Editar producto existente
- ✅ Eliminar producto
- ✅ Marcar como destacado (is_featured)
- ✅ Marcar como nuevo ingreso (is_new)

### Variantes (`/admin/variantes`)

- ✅ Seleccionar producto
- ✅ Agregar colores/variantes
- ✅ Editar color y código hex
- ✅ Eliminar variante
- ✅ Vista previa del color

### Imágenes (`/admin/imagenes`)

- ✅ Seleccionar producto y variante
- ✅ Subir imágenes (guardadas en Storage)
- ✅ Establecer imagen principal
- ✅ Eliminar imágenes
- ✅ Vista en grid

## 🌐 Consumir datos en el frontend

El frontend ya está configurado para consumir datos de Supabase automáticamente.

### Ejemplo - Obtener productos en componentes

```typescript
import { getProducts, getProductsByCategory } from '@/lib/services/products'

export async function MyComponent() {
  const products = await getProducts()
  
  return (
    <div>
      {products.map(p => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </div>
      ))}
    </div>
  )
}
```

### Ejemplo - Hook en Client Components

```typescript
'use client'

import { useProducts } from '@/hooks/use-products'

export default function ProductList() {
  const { products, loading } = useProducts()
  
  return (
    <div>
      {loading ? <p>Cargando...</p> : products.map(p => (...))}
    </div>
  )
}
```

## 🛠️ Scripts disponibles

```bash
# Desarrollo
npm run dev

# Migración de productos
npm run migrate:products

# Build
npm run build

# Linting
npm run lint
```

## 📥 Variables de entorno necesarias

```env
# Obligatorias
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Opcional (para migraciones)
SUPABASE_SERVICE_ROLE_KEY=
```

## 🆘 Troubleshooting

### "Missing Supabase environment variables"

Asegúrate de que `.env.local` existe y contiene las credenciales correctas.

### "Storage bucket not found"

Crea el bucket `product-images` en Supabase desde el panel de Storage.

### "Auth failed"

Verifica que:
1. El usuario existe en Supabase Auth
2. El email está confirmado
3. Las credenciales son correctas

### "RLS policy violation"

Si ves este error al insertar datos:
1. Verifica que los RLS policies estén correctamente configurados
2. Comprueba que el usuario está autenticado
3. Asegúrate de usar el `service_role_key` para migraciones

## 📚 Recursos

- [Documentación de Supabase](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [Supabase Auth](https://supabase.com/docs/guides/auth)

## ✨ Próximos pasos

1. Actualiza la web pública para consumir Supabase (ya está lista en algunos componentes)
2. Configura backups automáticos en Supabase
3. Implementa webhooks para eventos de productos
4. Agrega más campos a los productos según necesites
5. Implementa búsqueda y filtros avanzados

¡Tu tienda de mates ahora es completamente dinámica con Supabase! 🎉
