# Doma Nativa — Cursos de Equitación

Sitio web estático (HTML + CSS + JS, sin build) de Doma Nativa: cursos de equitación, capacitación docente, galería, obras de arte, testimonios y contacto.

**Dominio:** https://equitacionydomanativa.com.ar/ (hosteado en Vercel, proyecto `doma-nativa`).

## Estructura

- `index.html` — página única con todas las secciones (inicio, quiénes somos, cursos, galería, obras de arte, testimonios, contacto).
- `styles.css` — estilos.
- `script.js` — preloader, menú, carrusel, lightbox y carrito.
- `assets/` — logo y video del hero.
- `images/` — fotos de la galería, cursos y obras (`images/obras/`).

## Ver en local

No necesita instalación: abrí `index.html` en el navegador, o levantá un servidor simple:

```sh
npx serve .
```

## Deploy

El sitio está en **Vercel** (proyecto `doma-nativa`, cuenta BJP SISTEMAS), conectado al repo `brunopighin/Doma-nativa`. Cada push a `main` se despliega solo.

## Dominio

- `equitacionydomanativa.com.ar` (registrado en NIC Argentina) redirige con 308 a `www.equitacionydomanativa.com.ar`, que sirve producción.
- La delegación en NIC apunta a los nameservers de Vercel: `ns1.vercel-dns.com` y `ns2.vercel-dns.com`.
- El dominio anterior, `equitacionydomanativa.shop` (DNS en Hostinger), se venció.

### Si cambia el dominio

1. Actualizar en `index.html` el `canonical`, `og:url` y `og:image`.
2. Agregar el dominio en Vercel → proyecto `doma-nativa` → *Settings* → *Domains* → *Add Existing*.
3. En el registrador (para `.com.ar`, NIC Argentina → *Delegaciones*), cargar `ns1.vercel-dns.com` y `ns2.vercel-dns.com`, sin IP.
4. Esperar la propagación; Vercel emite el SSL solo.
