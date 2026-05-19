# MODO ZEN — Sitio estático

Sitio marketing estático para [modozen.cr](https://modozen.cr). El contenido vive en el repositorio (CMS en Git): editas archivos, haces push y Vercel reconstruye el sitio.

## Stack

- [Astro 6](https://astro.build) (HTML estático)
- Tailwind CSS 4
- Content Collections (Markdown + YAML)
- Deploy: [Vercel](https://vercel.com)

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321).

```bash
npm run build    # genera dist/
npm run preview  # previsualiza el build
```

## Editar contenido (CMS en Git)

### Configuración global

Archivo: [`src/content/site/site.yaml`](src/content/site/site.yaml)

- Marca, navegación, barra superior, beneficios, banner de historia, footer
- **WhatsApp:** actualiza `whatsapp.phone` (formato `506XXXXXXXX`, sin `+`)

### Kits de producto

Cada kit es un archivo en [`src/content/kits/`](src/content/kits/):

| Archivo | Kit |
|---------|-----|
| `anti-presa.md` | Kit Anti-Presa |
| `wellness.md` | Kit Wellness |
| `cafe-zen.md` | Kit Café Zen |

**Editar un kit:** cambia el frontmatter (título, descripción, imagen, mensaje de WhatsApp) y el cuerpo Markdown (descripción larga en la página de detalle).

**Agregar un kit:**

1. Copia un `.md` existente y renómbralo (ej. `reset.md`).
2. Ajusta `slug`, `order`, `title`, `cta.message`, etc.
3. Añade la imagen en `public/images/kits/`.
4. Haz push; Vercel despliega automáticamente.

### Imágenes

Assets en [`public/images/`](public/images/):

| Archivo | Uso |
|---------|-----|
| `logo.png` | Header |
| `hero-sloth.png` | Hero |
| `badge-su-modo-zen.png` | Footer / favicon |
| `story-sloth.png` | Banner historia y Nosotros |
| `kits/anti-presa.png` | Kit Anti-Presa |
| `kits/wellness.png` | Kit Wellness |
| `kits/cafe-zen.png` | Kit Café Zen |

Para un kit nuevo: añade la foto en `public/images/kits/` y referénciala en el frontmatter (`image: "/images/kits/mi-kit.png"`).

### CTAs y migración a Shopify

En el frontmatter de cada kit:

```yaml
cta:
  type: whatsapp
  message: "Hola, me interesa el Kit Anti-Presa"
```

Para enlazar a Shopify más adelante:

```yaml
cta:
  type: shopify
  shopifyUrl: "https://tu-tienda.myshopify.com/products/anti-presa"
```

O enlace externo:

```yaml
cta:
  type: external
  url: "https://..."
```

## Despliegue en Vercel

1. Sube el repo a GitHub.
2. En Vercel: **Add New Project** → importa el repo.
3. Framework: Astro (auto-detectado).
4. Build command: `npm run build`
5. Output directory: `dist`
6. Conecta el dominio `modozen.cr` cuando esté listo.

No se requieren variables de entorno para el MVP.

## Estructura del proyecto

```
src/
  content.config.ts    # esquemas Zod
  content/
    site/site.yaml     # configuración global
    kits/*.md          # productos
  components/          # UI
  layouts/
  lib/cta.ts           # URLs de WhatsApp / Shopify
  pages/
public/images/         # assets estáticos
```

## Pendiente de tu lado

- [ ] Número real de WhatsApp en `site.yaml`
- [ ] Logo, hero y fotos de cajas finales
- [ ] URLs reales de redes sociales si difieren
