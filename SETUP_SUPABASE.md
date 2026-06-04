# Conectar Supabase (5 minutos)

El CRM ya funciona sin Supabase guardando en `.data/` (solo para desarrollo).
Para que los briefings se guarden de verdad y persistan, conectá Supabase:

### 1. Crear el proyecto
1. Entrá a [supabase.com](https://supabase.com) y creá un proyecto (plan gratis).
2. Esperá a que termine de aprovisionar (~2 min).

### 2. Crear la tabla
En **SQL Editor → New query**, pegá y ejecutá:

```sql
create table briefings (
  token        text primary key,
  company_slug text,
  answers      jsonb default '{}'::jsonb,
  submitted    boolean default false,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);
```

> No hace falta tocar Row Level Security: el servidor usa la **service-role key**,
> que tiene acceso completo y nunca se expone al navegador.

### 3. Pegar las credenciales
En **Project Settings → API** copiá:
- **Project URL** → `SUPABASE_URL`
- **service_role** (en "Project API keys", la secreta) → `SUPABASE_SERVICE_ROLE_KEY`

Creá un archivo `.env` en la raíz (copiá de `.env.example`) y pegalas:

```
SUPABASE_URL=https://xxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

### 4. Reiniciar
Cortá y volvé a levantar `npm run dev`. Listo: ahora todo guarda en Supabase.
Lo verificás en Supabase → **Table Editor → briefings**.

---

## Cómo se usa el briefing

1. En el CRM, andá a **Briefings**.
2. En cada empresa, **Copiar link** y mandáselo a la agencia (o **Abrir briefing** vos).
3. La agencia completa; el avance se guarda solo y lo ves reflejado en la lista.

Los links privados de cada empresa están en `src/lib/companies.ts`.
Cambiá nombres y tokens ahí (generá tokens seguros con `openssl rand -hex 8`).
