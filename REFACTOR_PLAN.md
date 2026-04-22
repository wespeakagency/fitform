# FitForm Studio — Refactor + Features Plan

## Contexto

Repositorio vibecodeado recibido sin contexto, sin versionado, con acumulación de builds históricos y documentación auto-generada. Stack: React 18 + TypeScript + Vite 6 + React Router. El negocio es un estudio de Pilates premium en CDMX (FitForm) con integración a BSport como sistema externo de reservas.

Estado inicial encontrado:
- Sin repo git inicializado.
- 6 archivos `.zip` de builds históricos (V4 a V7) y 5 carpetas `dist/` duplicadas.
- 15+ markdowns auto-generados tipo `*_SUMMARY.md`, `*_UPDATE.md`, `*_REDIRECT.md`.
- 3 guías de deploy redundantes (`HOSTINGER_DEPLOYMENT_GUIDE.md`, `DEPLOYMENT_CHECKLIST.md`, `STEP_BY_STEP_DEPLOYMENT_GUIDE.md`).
- 6 páginas huérfanas fuera del router (`LoginPage`, `RegisterPage`, `DashboardPage`, `BookingPage`, `CheckoutPage`, `SuccessPage`) — identificadas como prototipos abandonados al migrar a BSport.
- Tailwind cargado por CDN (`cdn.tailwindcss.com`) — no apto para producción.
- Sin ESLint, Prettier ni configuración de calidad.
- 6 CVE de severidad alta en dependencias (`react-router-dom`, `vite`, `rollup`, `picomatch`).
- Source en la raíz, no en `/src` (no-estándar para Vite).

Hallazgo clave verificado: el build del source actual produce un bundle idéntico byte-por-byte (SHA-1) al `dist/` del 21 abril. El código fuente refleja el último build local sin cambios pendientes ni modificaciones manuales al dist.

Este documento planifica la recuperación del repositorio y la implementación de 10 tickets de features (PWF3.01 a PWF3.10).

---

## Note (2026-04-22): phase reordering

Phase 5 (ESLint + Prettier) has been **deferred to the end of the
roadmap**, after feature implementation. Introducing strict linting to
a vibecoded codebase mid-refactor produces too much noise (warnings
touching nearly every file) that distracts from the actual refactor
and feature goals. Linting is treated as a terminal quality-gate pass,
not an early structural step.

**New effective execution order**:
`0 → 1 → 2 → 3 → 4 → 6 (security) → 7 (pre-features) → 8 (features) → 5 (linting)`

The phase descriptions below keep their original numbering; only the
order of execution has changed.

## Principios rectores

1. **Implementación al final** — no se tocan features hasta tener casa limpia.
2. **Cada fase cierra con un commit atómico** — reversible con `git reset` o `git checkout HEAD~N -- <archivo>`.
3. **Conventional commits** (`chore:`, `refactor:`, `feat:`, `perf:`, `fix:`, `docs:`).
4. **Verificación binaria post-refactor**: después de cada fase con riesgo, correr `npm run build` y comparar el SHA-1 del bundle contra el backup. Divergencia inexplicable bloquea la fase.
5. **Archivar antes de borrar**: cualquier artefacto con posible valor histórico va a `.archive/` (ignorada por git, presente en disco) antes del borrado físico.

---

## Resumen de fases

| Fase | Objetivo | Riesgo | Tiempo estimado |
|:----:|----------|:------:|:---------------:|
| 0 | Safety net (git baseline) | — | 2 min |
| 1 | Limpieza de artefactos y documentación auto-generada | Bajo | 5 min |
| 2 | Archivar páginas huérfanas (código muerto) | Bajo | 3 min |
| 3 | Restructura a `/src` + reorganización por responsabilidad | Medio | 30–45 min |
| 4 | Migrar Tailwind CDN a Tailwind local + PostCSS | Medio | 20–30 min |
| 5 | DX: ESLint + Prettier | Bajo | 15–20 min |
| 6 | Security: `npm audit fix` | Bajo | 5 min |
| 7 | Pre-features: aclaraciones de scope al cliente | — | 2 min + espera externa |
| 8 | Features (10 tickets PWF3.XX) | Varía | Varía |

Total estimado de refactor (fases 0–6): 90–110 minutos de trabajo activo.

---

## Fase 0 — Safety net

**Objetivo:** baseline en git antes de tocar nada.

**Pasos:**
1. Commit inicial del estado actual. El `.gitignore` ya excluye `node_modules`, `dist/`, `dist */`, `*.zip`, `.env.local`.

**Verificación:**
- `git log --oneline` muestra un commit.
- `git status` está limpio.

**Commit:**
```
chore: baseline initial state before cleanup
```

**Riesgo:** ninguno.

---

## Fase 1 — Limpieza de artefactos y documentación ruido

**Objetivo:** quitar del repo todo lo que no es código ni configuración.

**Pasos:**
1. Crear directorio `.archive/` y agregarlo al `.gitignore`.
2. Crear `DEPLOYMENT.md` consolidando las 3 guías de deploy en un solo documento (prerequisites, build, upload, caveats del `.htaccess`).
3. Mover a `.archive/`:
   - Markdowns auto-generados: `ALTA_INTENSIDAD_UPDATE.md`, `ANDROID_REDIRECT.md`, `APPLE_STORE_REDIRECT.md`, `COACHES_TEXT_STYLING_UPDATE.md`, `COACHES_TEXT_UPDATE.md`, `CONTAINER_REMOVAL_SUMMARY.md`, `FACEBOOK_REDIRECT.md`, `FINAL_DEPLOYMENT_SUMMARY.md`, `FOOTER_LOGO_UPDATE_SUMMARY.md`, `FitForm_Website_Update_V6_SUMMARY.md`, `FitForm_Website_Update_V7_SUMMARY.md`, `INSTAGRAM_REDIRECT.md`, `LOGO_HOME_REDIRECT_SUMMARY.md`, `LOGO_NAVIGATION_SUMMARY.md`, `LOGO_UPDATE_SUMMARY.md`, `MOBILE_DESIGN_UPDATE.md`, `MOBILE_NAVIGATION_IMPROVEMENTS.md`, `TEXT_REMOVAL_SUMMARY.md`, `TEXT_UPDATE_SUMMARY.md`.
   - Texto contextual obsoleto: `FILES_TO_UPLOAD.txt`.
   - Guías de deploy reemplazadas: `HOSTINGER_DEPLOYMENT_GUIDE.md`, `DEPLOYMENT_CHECKLIST.md`, `STEP_BY_STEP_DEPLOYMENT_GUIDE.md`, `ZIP_UPLOAD_GUIDE.md`.
4. Borrar físicamente del disco (irreversible):
   - 6 archivos `.zip`: `dist.zip`, `FitForm_Website_Package.zip`, `FitForm_Website_Update_V4.zip` a `V7.zip`.
   - 5 carpetas duplicadas: `dist 2/`, `dist 3/`, `dist 4/`, `dist 5/`, `dist 6/`. Se mantiene `dist/` (último build válido).
   - Todos los archivos `.DS_Store`.

**Verificación:**
- `npm run build` completa sin errores.
- `shasum dist/assets/*.js` coincide con el backup en `/tmp/fitform_dist_original/`.

**Commit:**
```
chore: remove build artifacts, consolidate deploy docs, archive AI-generated summaries
```

**Riesgo:** bajo. El borrado físico de zips y dists duplicados es irreversible pero sin pérdida de información (el dist actual cubre el último estado válido).

---

## Fase 2 — Archivar páginas huérfanas

**Objetivo:** remover del árbol activo 6 páginas que son prototipos abandonados.

**Contexto:** las páginas `LoginPage`, `RegisterPage`, `DashboardPage`, `BookingPage`, `CheckoutPage`, `SuccessPage` están en `pages/` pero no aparecen en `App.tsx`. Análisis del código confirma: UI real con mock data, sin auth, sin backend. Fueron diseñadas para un sistema propio de reservas que se abandonó al integrar BSport.

**Pasos:**
1. Crear `.archive/orphan-pages/`.
2. Mover los 6 archivos desde `pages/` a `.archive/orphan-pages/`.

**Verificación:**
- `npm run build` completa sin errores (estas páginas no están importadas en código activo).
- `rg -l "LoginPage|RegisterPage|DashboardPage|BookingPage|CheckoutPage|SuccessPage" --glob '!.archive'` no devuelve referencias.

**Commit:**
```
chore: archive orphaned prototype pages (superseded by BSport integration)
```

**Riesgo:** bajo. Las páginas no tienen consumidores activos. Si el cliente pregunta, se recuperan desde `.archive/`.

---

## Fase 3 — Restructura a /src

**Objetivo:** llevar el proyecto a la convención estándar de Vite. Justificada por el volumen de features nuevos del roadmap.

**Estructura objetivo:**

```
src/
├── components/          # UI reusable (Button, Modal)
├── sections/            # secciones de HomePage (Hero, About, Team, Pricing, Schedule, FAQ, Contact)
├── layout/              # Layout, Navbar, Footer
├── features/bsport/     # integración BSport aislada (BSportLoginButton)
├── pages/               # rutas activas (HomePage, InstructorsPage)
├── types/index.ts
├── styles/index.css
├── App.tsx
└── main.tsx             # renombrado de index.tsx (convención Vite)
```

**Pasos:**
1. Crear estructura de directorios bajo `src/`.
2. Mover archivos de source desde la raíz a sus nuevas ubicaciones.
3. Reubicar componentes por responsabilidad:
   - `components/Button.tsx`, `components/Modal.tsx` → `src/components/`.
   - `components/Hero.tsx`, `About.tsx`, `Team.tsx`, `Pricing.tsx`, `Schedule.tsx`, `FAQ.tsx`, `Contact.tsx` → `src/sections/`.
   - `components/Layout.tsx`, `Navbar.tsx`, `Footer.tsx` → `src/layout/`.
   - `components/BSportLoginButton.tsx` → `src/features/bsport/`.
4. Mover páginas activas: `pages/HomePage.tsx`, `pages/InstructorsPage.tsx` → `src/pages/`.
5. Renombrar `index.tsx` → `src/main.tsx`.
6. Actualizar todos los imports afectados (~30–40 archivos).
7. Actualizar `index.html`: `<script type="module" src="/index.tsx">` → `<script type="module" src="/src/main.tsx">`.
8. Actualizar `vite.config.ts`: `alias '@': path.resolve(__dirname, '.')` → `path.resolve(__dirname, './src')`.
9. Actualizar `tsconfig.json`: `paths: { "@/*": ["./*"] }` → `{ "@/*": ["./src/*"] }`.

**Verificación:**
- `npm run build` completa sin errores de resolución.
- Comparar el SHA-1 del bundle contra backup. Puede diferir mínimamente por cambios de ruta internos, pero el tamaño debe ser equivalente.
- `npm run dev` y verificación visual en `http://localhost:3000`: navegación, renderizado de las 2 rutas, interacción de componentes.

**Commit:**
```
refactor: move source to /src and reorganize components by responsibility
```

**Riesgo:** moderado. Alto volumen de imports modificados. Red de seguridad: `git reset --hard HEAD` vuelve al estado pre-refactor.

---

## Fase 4 — Migrar Tailwind CDN a Tailwind local

**Objetivo:** reemplazar `cdn.tailwindcss.com` por Tailwind instalado localmente con PostCSS.

**Justificación:**
- `cdn.tailwindcss.com` emite warning en consola de producción.
- Sin purging: se descargan clases no usadas, inflando el CSS transferido.
- Impacta directamente PWF3.04 (ticket de performance).

**Pasos:**
1. `npm install -D tailwindcss@3 postcss autoprefixer` (Tailwind 3, probado estable con Vite 6).
2. `npx tailwindcss init -p` genera `tailwind.config.js` y `postcss.config.js`.
3. Portar la configuración del `<script>` inline de `index.html` al `tailwind.config.js`:
   - `darkMode: 'class'`.
   - Extensión de `fontFamily`, `colors` (paleta `fitform` + mapeo `stone`), `animation`, `keyframes`.
4. Agregar a `src/styles/index.css` al inicio:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
5. Remover de `index.html`:
   - `<script src="https://cdn.tailwindcss.com">`.
   - El `<script>` con `tailwind.config = { ... }` inline.
6. Configurar `content` en `tailwind.config.js` apuntando a `./src/**/*.{ts,tsx,html}` + `./index.html`.

**Verificación:**
- `npm run dev` renderiza el sitio idéntico al estado pre-migración (comparar lado a lado).
- Auditoría visual de dark mode, animaciones (`blob`, `fade-up`, `float`), colores de la paleta.
- `npm run build`: comparar tamaño del CSS bundle. Debería reducir significativamente vs. lo que servía el CDN sin purging.
- Comparar Lighthouse Performance score antes/después.

**Commit:**
```
perf: migrate Tailwind from CDN to local install with PostCSS (PWF3.04)
```

**Riesgo:** moderado. Diferencias visuales sutiles posibles si hay clases custom no mapeadas. Verificación manual obligatoria.

---

## Fase 5 — DX: ESLint + Prettier

**Objetivo:** estándares mínimos de código antes de agregar features.

**Pasos:**
1. Instalar dev dependencies:
   - `eslint`, `prettier`, `eslint-config-prettier`.
   - `eslint-plugin-react`, `eslint-plugin-react-hooks`.
   - `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`.
2. Configurar `.eslintrc.cjs` con reglas por defecto de TS + React + hooks. Sin reglas ambiciosas.
3. Configurar `.prettierrc` con: `semi: true`, `singleQuote: true`, `trailingComma: 'es5'`, `tabWidth: 2`, `printWidth: 100`.
4. Agregar a `package.json`:
   ```json
   "lint": "eslint src --ext .ts,.tsx",
   "lint:fix": "eslint src --ext .ts,.tsx --fix",
   "format": "prettier --write \"src/**/*.{ts,tsx,css}\""
   ```
5. Correr `npm run format` y `npm run lint:fix` una vez para autofix de formato. No corregir warnings manualmente (se atienden cuando se toca cada archivo en features).

**Verificación:**
- `npm run lint` corre sin errores críticos.
- `npm run build` sigue pasando.

**Commit:**
```
chore: add eslint + prettier with minimal config
```

**Riesgo:** bajo.

---

## Fase 6 — Security: npm audit fix

**Objetivo:** parchar las 6 CVE de severidad alta reportadas por `npm audit` sin introducir breaking changes.

**CVE conocidas:**
- `react-router-dom` 6.22.3: XSS via Open Redirects (fix en 6.30.3).
- `vite` ≤ 6.4.1: Path Traversal en dev server + Arbitrary File Read via WebSocket.
- `rollup` 4.0–4.58: Path Traversal.
- `picomatch` 4.0–4.0.3: ReDoS + Method Injection.

**Pasos:**
1. Correr `npm audit fix` (sin `--force` para evitar bumps a majors breaking).
2. Si el output indica que quedan vulnerabilidades solo resolubles con `--force`, evaluar caso por caso antes de aplicar.

**Verificación:**
- `npm audit` reporta 0 vulnerabilidades high, o las remanentes están documentadas.
- `npm run build` y `npm run dev` siguen funcionando.
- Smoke test manual: navegación entre rutas, apertura de widget BSport.

**Commit:**
```
fix: patch high-severity vulnerabilities via npm audit fix
```

**Riesgo:** bajo. `audit fix` sin `--force` es conservador por diseño.

---

## Fase 7 — Pre-features: aclaraciones al cliente

**Objetivo:** desbloquear el scope real de 4 tickets antes de implementarlos.

**Preguntas a enviar al cliente:**

1. **PWF3.02 "Mis reservas":** ¿se requiere que viva dentro del sitio o alcanza con un link directo al portal de miembro de BSport?
2. **PWF3.06 "Tienda":** ¿se refiere a los packs de clases que ya existen en la sección PRECIOS, o es una tienda de productos separada (merch, equipamiento, etc.)?
3. **PWF3.03 + PWF3.07 (imágenes):** ¿las nuevas imágenes de home y de coaches ya están listas? ¿En qué formato y resolución?
4. **PWF3.08 "LOGIN":** el botón del navbar ya abre el login de BSport. ¿Solo se necesita renombrar el texto a "LOGIN", o el cliente esperaba un login propio (lo cual implicaría reactivar y desarrollar backend de las páginas huérfanas)?

Sin estas respuestas, PWF3.02, PWF3.03, PWF3.06, PWF3.07 y PWF3.08 quedan con scope indefinido.

---

## Fase 8 — Features (implementación)

**Objetivo:** implementar los 10 tickets PWF3.XX siguiendo orden de dependencias y tamaño.

Cada feature cierra con un commit con prefijo `feat(PWF3.XX):` o `fix(PWF3.XX):` según corresponda.

| # | Ticket | Descripción | Dependencia | Estimado |
|:---:|:-----:|-------------|-------------|:--------:|
| 1 | PWF3.08 | Cambiar texto "Iniciar sesión" → "LOGIN" | Respuesta cliente (Fase 7.4) | 2 min si es solo texto |
| 2 | PWF3.05 | Reemplazar contenido actual de sección "EL ESPACIO" por embed de Reel (Instagram) | URL del Reel | 20 min |
| 3 | PWF3.07 | Cambiar foto principal del home | Imagen del cliente (Fase 7.3) | 10 min |
| 4 | PWF3.03 | Cambiar imágenes de todos los coaches | Imágenes del cliente (Fase 7.3) | 20 min |
| 5 | PWF3.09 | Optimizar imágenes: lazy loading, WebP donde aplique, SVG para íconos | — | 30 min |
| 6 | PWF3.02 | "Mis reservas": widget BSport si existe, o link al portal externo | Respuesta cliente (Fase 7.1) | 30 min – 2 hs |
| 7 | PWF3.01 | Widget de precios arriba del calendario en CLASES + botón "PRECIOS" en menú fijo | — | 45 min |
| 8 | PWF3.06 | "Tienda": implementación según scope final | Respuesta cliente (Fase 7.2) — bloqueante si es shop real | 1 hs – 2 días |
| 9 | PWF3.10 | Integrar Google Tag Manager | GTM container ID del cliente | 20 min |
| 10 | PWF3.04 | Performance residual: evaluar si quedan cuellos tras Fase 4 y PWF3.09 | — | 30 min – N hs |

**Orden justificado:**
- Se arranca con los cambios más baratos y de mayor impacto visible (3.08, 3.05, 3.07, 3.03).
- Se resuelve 3.09 (optimización imágenes) antes de 3.04 (performance residual): parte del problema de performance queda resuelta por optimizar imágenes y por la Fase 4 (Tailwind local).
- 3.02, 3.06, 3.08 quedan condicionados a respuestas del cliente.

---

## Notas de mantenimiento de este plan

- Actualizar este documento si se agregan, remueven o repriorizan fases.
- Cada commit del repo debe poder asociarse a una fase de este plan vía el prefijo del mensaje.
- Si una fase requiere extenderse más allá de su estimado por hallazgos no previstos, documentar el motivo en el commit body.
