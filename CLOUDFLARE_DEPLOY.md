# Guía de Despliegue en Cloudflare Pages - Lucy Style

Este proyecto ha sido adaptado para funcionar en la infraestructura de Cloudflare (Edge Runtime).

## Preparación

### 1. Variables de Entorno en Cloudflare
Debes configurar las siguientes variables en el panel de **Cloudflare Pages > Tu Proyecto > Settings > Environment Variables > Production**:
- `DATABASE_URL`: Tu cadena de conexión de Supabase. 
  - *Nota: Para funcionar en el Edge de Cloudflare, se recomienda usar **Prisma Accelerate** o un pooler de conexiones.*
- `JWT_SECRET`: Tu secreto para JWT.
- `GEMINI_API_KEY`: API Key de Google Gemini.
- `CLOUDINARY_URL`: URL de Cloudinary.

### 2. Configuración de Build en Cloudflare
En el panel de configuración de Cloudflare Pages, establece los siguientes valores:
- **Framework Preset**: `Next.js (App Router)` (o None y configurar manualmente).
- **Build command**: `npm run build`
- **Build output directory**: `.cloudflare`
- **Compatibility flag**: `nodejs_compat` (en Settings > Functions > Compatibility Flags).

## Despliegue desde Git

1. Sube tu código a GitHub o GitLab.
2. En Cloudflare Dashboard, ve a **Workers & Pages > Create application > Pages > Connect to Git**.
3. Selecciona tu repositorio.
4. Configura el comando de build (`npm run build`) y el directorio de salida (`.cloudflare`) como se indicó arriba.
5. Haz clic en **Save and Deploy**.

## Desarrollo Local (Simulando Cloudflare)

Para probar localmente cómo se comportará en Cloudflare:
```bash
npm run pages:dev
```

## Notas Técnicas
- Todas las rutas de API y el middleware utilizan `export const runtime = "edge"`.
- Se utiliza `@cloudflare/next-on-pages` para transformar el build de Next.js a un formato compatible con Cloudflare Workers.
- El archivo `wrangler.toml` contiene la configuración básica de compatibilidad.
