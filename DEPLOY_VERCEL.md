# 🚀 Deploy a Vercel — VIVA CORE

La app es **TanStack Start** (no Next.js). Ya está configurada para Vercel:
`vite.config.ts` tiene `nitro: { preset: "vercel" }`, así que `npm run build`
genera la salida en formato **Build Output API** (`.vercel/output`), que Vercel
detecta y publica automáticamente.

---

## Paso 1 — Subir el código a GitHub
El repo es `github.com/braiannav7-max/brief-forge-24`. Asegurate de tener
empujados los últimos cambios (rama `main`).

## Paso 2 — Importar el proyecto en Vercel
1. Entrá a **vercel.com** → logueate con GitHub.
2. **Add New… → Project** → elegí `brief-forge-24` → **Import**.
3. Configuración (Vercel suele detectar casi todo):
   - **Framework Preset:** `Other`
   - **Build Command:** `npm run build`
   - **Install Command:** `npm install`
   - **Output Directory:** *(dejar vacío — Vercel usa `.vercel/output`)*

## Paso 3 — Variables de entorno (CLAVE)
En **Settings → Environment Variables**, agregá estas dos (las mismas del `.env`
local), para los entornos **Production** y **Preview**:

| Name | Value |
|---|---|
| `SUPABASE_URL` | `https://flstizabkfwwgqphcpcy.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | *(tu service_role key)* |

> ⚠️ La `service_role` es secreta. Va solo en Vercel (servidor), nunca en el cliente.

## Paso 4 — Deploy
Apretá **Deploy**. En ~1–2 min tenés una URL pública tipo
`https://brief-forge-24.vercel.app`.

## Paso 5 — Probar
- Abrí la URL → `/dashboard` (panel) y `/briefing/<token>` (lo que recibe la agencia).
- Cargá un campo en un briefing y verificá en Supabase que se guardó.

---

## Actualizaciones futuras
Cada vez que hagas `git push` a `main`, Vercel re-deploya solo. ✅

## Tokens de las empresas (recordatorio de seguridad)
Antes de mandar los links, cambiá los `token` en `src/lib/companies.ts` por
valores difíciles de adivinar: `openssl rand -hex 8`.
