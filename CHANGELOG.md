# Changelog

## 2026-11-09 — Cambio de dominio a equitacionydomanativa.com.ar

- **Qué cambió:** el `canonical`, `og:url` y `og:image` de `index.html` pasan de `equitacionydomanativa.shop` a `equitacionydomanativa.com.ar`. Se agregan `README.md` y este `CHANGELOG.md`.
- **Por qué:** se venció el dominio `.shop` y el sitio pasa a usar el `.com.ar`.
- **Configuración:** se agregaron `equitacionydomanativa.com.ar` (redirige a www) y `www.equitacionydomanativa.com.ar` al proyecto `doma-nativa` en Vercel. Se delegó en NIC a `ns1/ns2.vercel-dns.com`. El README se corrigió: el hosting es Vercel, no Hostinger.
- **Cómo se probó:** se verificó con búsqueda en el repo que no queden referencias al dominio `.shop`. Después de la delegación, `https://www.equitacionydomanativa.com.ar/` responde 200 con SSL válido y el dominio sin www redirige con 308 a la versión www.
