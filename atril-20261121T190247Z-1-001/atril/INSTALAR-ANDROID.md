# Instalar Atril en Android

Atril es una PWA: en Android se instala **desde el navegador** y queda con su icono en la pantalla de inicio, abriéndose a pantalla completa como cualquier app. No necesita Play Store.

Para instalarla, la app tiene que estar en una dirección web **https** (no vale abrir el archivo suelto en el móvil). Tienes dos caminos.

---

## Opción A · Publicarla y añadirla a la pantalla (recomendada, gratis, 3 min)

Sirve la carpeta en internet con HTTPS. La forma más rápida y sin cuenta es **Netlify Drop**:

1. Desde el ordenador entra en **app.netlify.com/drop**.
2. Arrastra la carpeta `atril` completa a la página. Te dará una dirección tipo `https://algo-al-azar.netlify.app`.
3. Abre esa dirección **en Chrome del móvil Android**.
4. Menú **⋮** (arriba a la derecha) → **«Instalar app»** o **«Añadir a pantalla de inicio»**. También aparece el botón **📲 Instalar app** dentro de la propia Atril, en la barra lateral.
5. Confirma. El icono del atril queda en tu pantalla de inicio.

> Alternativas de hosting igual de válidas: GitHub Pages, Cloudflare Pages, Vercel. Cualquiera que sirva archivos estáticos por HTTPS.

Ventajas: es la app real, se actualiza sola al volver a subir la carpeta, y funciona offline tras la primera carga.

---

## Opción B · Generar un APK real (para instalarlo como archivo)

Si quieres un `.apk` que se instala tocándolo, se genera a partir de la PWA ya publicada (necesitas antes la Opción A). Se hace con **PWABuilder**, sin programar:

1. Ten tu app publicada (Opción A) y copia su dirección `https://…`.
2. Entra en **pwabuilder.com** y pega esa dirección → **Start**.
3. Analiza la PWA (usará el `manifest.webmanifest` y los iconos que ya vienen incluidos).
4. Pestaña **Android** → **Generate Package**. Descargas un `.zip` con:
   - el **APK** (para probar tocándolo en el móvil), y
   - el **AAB** (por si algún día lo subes a Google Play).
5. Pasa el APK al móvil y ábrelo. La primera vez Android pedirá permitir **«Instalar apps desconocidas»** para ese navegador/gestor de archivos.

> PWABuilder firma el paquete de prueba por ti. Para publicar en Google Play harían falta una cuenta de desarrollador (pago único) y la firma de subida, pero para uso personal el APK de prueba basta.

---

## ¿Por qué no incluyo el APK ya hecho?
Un APK instalable debe **compilarse y firmarse** con el SDK de Android en tu equipo o en un servicio como PWABuilder; no puede generarse dentro de este chat. Por eso te dejo el proyecto y los iconos listos, de modo que PWABuilder produzca el APK en un par de clics a partir de tu dirección publicada.

## Iconos incluidos
`icons/icon-192.png`, `icon-512.png` (normal), `icon-maskable.png` (para el recorte de Android), `icon-180.png` (iOS) y favicons. El diseño —un atril con ondas de voz sobre fondo tinta— es el que verás en la pantalla de inicio.
