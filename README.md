# Doma Nativa — Cursos de Equitación

Sitio web estático (HTML + CSS + JS, sin build) de Doma Nativa: cursos de equitación, capacitación docente, galería, obras de arte, testimonios y contacto.

**Dominio:** https://equitacionydomanativa.com.ar/ (hosteado en Hostinger).

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

Se suben los archivos tal cual al `public_html` del hosting en Hostinger.

### Cambio de dominio

Si cambia el dominio, hay que:

1. Actualizar en `index.html` el `canonical`, `og:url` y `og:image` (buscar el dominio viejo y reemplazarlo).
2. En el registrador del dominio (para `.com.ar`, NIC Argentina), apuntar los DNS a los nameservers de Hostinger (`ns1.dns-parking.com` / `ns2.dns-parking.com`, verificarlos en el panel de Hostinger).
3. En Hostinger, agregar/conectar el dominio nuevo al sitio y activar el SSL.
