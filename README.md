# SosaCraft · Landing de agencia de viajes

Landing en React 19 + Vite + Tailwind v4 + Motion. Muestra paquetes con precios de referencia y dirige a WhatsApp o correo. No hay carrito ni pagos.

## Arranque

```bash
npm install
cp .env.example .env   # pon el WhatsApp y correo reales
npm run dev
```

## Arquitectura (screaming architecture)

Las carpetas gritan lo que hace el negocio, no el framework:

```
src/
  app/                    composición de la página, providers y estilos globales
    App.tsx
    providers/SmoothScroll.tsx   (Lenis)
    styles/global.css
  features/               un folder por capacidad de la landing
    navigation/           nav flotante + menú móvil
    hero/                 ventanilla de avión (persiana + expansión con scroll)
    packages/             catálogo de paquetes, tours y hospedaje, filtro por tipo, carrusel de fotos y diálogo de detalle
    process/              cómo planeamos (pila fija con scroll)
    destinations/         marquesina de destinos ligada a la velocidad del scroll
    testimonials/         opiniones de viajeros
    faq/                  preguntas frecuentes
    contact/              formulario que arma el mensaje para WhatsApp o correo + botón flotante
    flight-path/          ruta de vuelo de toda la página (debajo del contenido): de "Tu idea" al formulario de contacto
    footer/               columnas de información + horizonte de monumentos que sale con el scroll
  shared/
    design-system/        tokens, motion, componentes base (Button, Bezel, Chip, Heading, Logo, Reveal), tema
      effects/clouds/     nubes procedurales reutilizables (hero y footer)
    config/site.ts        datos de contacto (desde .env)
    lib/                  enlaces de WhatsApp/mailto, fotos, utilidades
    hooks/
docs/design-dna.json      ADN de diseño: sistema, estilo y efectos visuales
```

Cada feature expone su API pública en `index.ts`; las demás partes solo importan desde ahí.

## Design system

- **Tokens** en `src/shared/design-system/tokens/tokens.css` (claro/oscuro automático + botón de tema).
- **Color**: neutros fríos de niebla + un único acento cobalto talavera.
- **Tipografía**: Bricolage Grotesque (display, ejes de peso y ancho) + Geist (texto).
- **Forma**: píldora para interactivos, doble bisel para contenedores.
- **Movimiento**: curvas `ease.out` y `ease.fluid`, resortes en `tokens/motion.ts`. Todo respeta `prefers-reduced-motion`.

## Contenido a reemplazar antes de publicar

- `src/features/packages/data/packages.ts`: paquetes, tours (Xcaret, cenotes, Chichén Itzá, Isla Mujeres) y hospedaje con precios de ejemplo.
- `src/features/testimonials/data/testimonials.ts`: opiniones de muestra.
- `.env`: número de WhatsApp y correo reales.
- Fotos: Unsplash por hotlink (licencia Unsplash). Las fotos extra de cada viaje están en `src/features/packages/data/galleries.ts`; cámbialas por fotos propias cuando las tengas.

## Créditos

- Fotografía: [Unsplash](https://unsplash.com) (licencia Unsplash).
- Siluetas de monumentos del footer (se regeneran con `npm run landmarks`):
  - Torre Eiffel, Taj Mahal: Wikimedia Commons (CC0).
  - Estatua de la Libertad, Cristo Redentor, Burj Khalifa, Torre CN: Wikimedia Commons (dominio público).
  - Coliseo, Tower Bridge, Ópera de Sídney, San Basilio, Torre de Pisa, Chichén Itzá, Big Ben, Esfinge, pagoda, molino y Arco del Triunfo: [game-icons.net](https://game-icons.net) (Lorc, Delapouite y colaboradores), [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
- Iconos de interfaz: [Phosphor Icons](https://phosphoricons.com) (MIT).
