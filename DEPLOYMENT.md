# Guía de Despliegue en Vercel - Lucy Style

Este proyecto está optimizado para ser desplegado en Vercel con una base de datos PostgreSQL (Supabase) y almacenamiento en Cloudinary.

## Pasos para el Despliegue

### 1. Preparación de la Base de Datos (Supabase)
- Crea un proyecto en [Supabase](https://supabase.com/).
- Obtén la cadena de conexión (Connection String) en la sección **Project Settings > Database**.
- Asegúrate de usar el modo `transaction` (puerto 6543) o `session` (puerto 5432) según tus necesidades, pero asegúrate de que el URL termine con `?sslmode=require`.

### 2. Configuración en Vercel
- Importa tu repositorio en Vercel.
- En la sección **Environment Variables**, añade las siguientes variables:
  - `DATABASE_URL`: Tu cadena de conexión de Supabase.
  - `JWT_SECRET`: Una cadena aleatoria larga para firmar los tokens.
  - `OPENROUTER_API_KEY`: Tu API Key de OpenRouter.
  - `CLOUDINARY_URL`: Tu URL de Cloudinary (ej: `cloudinary://123:abc@mycloud`).

### 3. Scripts de Construcción
Vercel detectará automáticamente que es un proyecto de Next.js. Sin embargo, para asegurar que Prisma funcione correctamente, verifica que el comando de construcción sea:
`prisma generate && next build`

O simplemente añade un script `postinstall` en tu `package.json`:
```json
"postinstall": "prisma generate"
```

### 4. Ejecución de Migraciones
Una vez desplegado, o antes de la primera ejecución, debes aplicar las migraciones a tu base de datos de producción:
`npx prisma migrate deploy`

## Consideraciones de Seguridad
- Las cookies de autenticación están configuradas como `HttpOnly`, `Secure` y `SameSite=Strict`.
- El middleware protege todas las rutas bajo `/dashboard` y `/api` (excepto auth).
- No expongas nunca tu `GEMINI_API_KEY` o `CLOUDINARY_URL` con el prefijo `NEXT_PUBLIC_`.

## Troubleshooting
- **Error de Prisma en Vercel**: Asegúrate de que `prisma generate` se ejecute en el entorno de Vercel.
- **Error de Conexión DB**: Verifica que la IP de Vercel no esté bloqueada en Supabase (normalmente Supabase permite todas las conexiones por defecto, pero revisa el firewall si es necesario).
