# Atril · Entrenador de comunicación oral docente

PWA **local-first** para ensayar en voz alta la defensa de programaciones, oposiciones, supuestos prácticos, reuniones, inspección, ponencias y conversación profesional. Analiza el **fondo** (contenido, argumentación, normativa) y la **forma** (ritmo, muletillas, claridad, volumen) de tu discurso, y te da retroalimentación por sesión.

Todo se ejecuta en tu navegador. Tus datos no salen de tu dispositivo salvo el texto que tú envíes al proveedor de IA que elijas.

---

## 1. Puesta en marcha (3 formas)

**A) Rápida (abrir el archivo).** Abre `index.html` con Chrome o Edge. Funciona todo salvo la instalación offline (el service worker necesita servidor).

**B) Como servidor local (recomendada para desarrollo).**
```bash
cd atril
python3 -m http.server 8000
# abre http://localhost:8000
```

**C) Publicada como PWA instalable (gratis).** Sube la carpeta a **GitHub Pages** o **Netlify** (arrastrar y soltar). Desde el móvil/tablet: *Añadir a pantalla de inicio*. Queda como una app nativa, offline.

> El micrófono y el reconocimiento de voz requieren **HTTPS** o **localhost**. GitHub Pages y Netlify ya sirven en HTTPS.

### Conseguir la IA (paso único)
1. Entra en **[aistudio.google.com](https://aistudio.google.com)** → *Get API key* (gratis).
2. En Atril → **Ajustes** → proveedor **Gemini** → pega la clave → *Probar conexión*.

Listo. Gemini cubre chat **y** embeddings sin coste, así que el RAG funciona completo.

---

## 2. Proveedores de IA

La app es **multiproveedor**: cambiar de motor no toca ningún otro módulo. Notas de conexión desde el navegador:

| Proveedor | Chat | Embeddings (RAG) | Nota |
|---|---|---|---|
| **Gemini** ✅ recomendado | sí | sí (`text-embedding-004`) | Clave gratuita, CORS abierto |
| OpenAI | sí | sí | Consume saldo |
| OpenRouter | sí | — (usa RAG local) | Muchos modelos, algunos gratis |
| Anthropic (Claude) | sí | — (usa RAG local) | Requiere el encabezado de acceso directo (ya incluido) |
| **Ollama** | sí | sí | 100% local y gratis. Arráncalo permitiendo el navegador: `OLLAMA_ORIGINS="*" ollama serve` |

Cuando el proveedor no ofrece embeddings, el RAG cae automáticamente a un método **TF-IDF local** (sin coste, sin red).

---

## 3. Arquitectura

Aplicación de una sola página, sin backend ni proceso de compilación. Todo el estado vive en **IndexedDB** (privado, persistente, offline). Cada módulo de `app.js` es autónomo y se comunica solo a través de `DB` y `State`, de modo que **se pueden añadir módulos nuevos sin modificar los existentes**.

```
atril/
├── index.html            · estructura + sistema de diseño (CSS)
├── app.js                · lógica, organizada en 16 módulos
├── manifest.webmanifest  · metadatos PWA
├── service-worker.js     · caché offline
├── icons/                · iconos de la app
└── README.md
```

Mapa de módulos (`app.js`):

| # | Módulo | Responsabilidad |
|---|---|---|
| 1 | `DB` | Capa IndexedDB (perfiles, docs, chunks, sesiones, ajustes) |
| 2 | `State` | Estado en memoria + carga/guardado de ajustes |
| 3 | `Providers` | Conectores de IA. **Añadir proveedor = añadir un objeto aquí** |
| 4 | `Docs` | Ingesta y extracción de texto (PDF, Word, PPT, Excel, EPUB, HTML…) |
| 5 | `RAG` | Troceado, embeddings, recuperación (vectorial o TF-IDF), citas |
| 6 | `Voice` | Reconocimiento (STT), síntesis (TTS), detección de silencios |
| 7 | `Analyzer` | Volumen (Web Audio) + métricas de texto (ritmo, muletillas, léxico) |
| 8 | `Modes` | Los 15 escenarios de entrenamiento |
| 9 | `Session` | Orquesta voz + IA + RAG + análisis |
| 10 | `Feedback` | Evaluación estructurada por IA con respaldo por reglas |
| 11 | `Chart` | Gráficos SVG sin dependencias |
| 12–16 | `UI`, vistas, perfiles, exportación, arranque | Interfaz y ciclo de vida |

### Esquema de datos (IndexedDB)
- **profiles**: `{id, name, goal, created}`
- **docs**: `{id, profileId, name, type, size, chars, tags, indexed, vector, chunkCount}`
- **chunks**: `{id, docId, profileId, docName, text, vec}` — unidades RAG
- **sessions**: `{id, profileId, mode, diff, topic, turns[], metrics, feedback, started, ended}`
- **kv**: ajustes globales y por perfil (proveedor, clave, voz, tema…)

### Por qué local-first
Tus requisitos —uso personal, gratis, software libre, datos privados, sin costes de servidor, PWA en tres dispositivos— apuntan a esta arquitectura. Sin servidor no hay nada que mantener ni pagar, y la privacidad es total por construcción: los documentos nunca se suben a ningún sitio.

---

## 4. Plan de desarrollo por fases

- **Fase 1 — Núcleo (esta entrega).** Perfiles, biblioteca con extracción de texto, RAG (vectorial + TF-IDF), conversación por voz con análisis del discurso, 15 modos, feedback por sesión, estadísticas, exportación, PWA instalable.
- **Fase 2 — Profundizar el análisis.** Detección de pausas más fina, entonación (pitch) vía Web Audio, objetivos personalizados y comparativa entre sesiones lado a lado.
- **Fase 3 — Cámara y lenguaje corporal.** Módulo opcional con `getUserMedia` de vídeo y detección de postura/gestos en el dispositivo.
- **Fase 4 — RAG avanzado.** Reranking, resúmenes por documento, colecciones temáticas y citas con fragmento exacto.
- **Fase 5 — Colaboración y respaldo.** Exportar/importar perfil completo, sincronización opcional cifrada, biblioteca compartida entre dispositivos.
- **Fase 6 — Contenido curricular.** Plantillas de programación/UD de Castilla-La Mancha y banco de supuestos por especialidad.

---

## 5. Cómo ampliar

**Añadir un proveedor de IA:** agrega un objeto `_miproveedor` en `Providers` con `chat()` y, opcionalmente, `embed()`, y una entrada en `Providers.defaults` y `Providers.hint`. Añade su `<option>` en el `<select id="provider">`. Nada más.

**Añadir un modo:** añade un objeto al array `Modes` con `id`, `mic`, `name`, `desc` y `role`. Aparece solo en la cuadrícula.

**Añadir un módulo (p. ej. cámara):** créalo como objeto independiente y engánchalo desde `Session`. No necesita tocar `DB`, `Voice` ni `Feedback`.

---

## 6. Privacidad y límites conocidos
- Los datos viven en IndexedDB de **este navegador**. Borrar los datos del sitio los elimina. Usa *Exportar* para respaldo.
- El reconocimiento de voz del navegador (Web Speech API) va mejor en **Chrome/Edge/Android**; Firefox y Safari tienen soporte limitado. Si no hay voz, existe el **modo escrito**.
- La clave de IA se guarda localmente. En un dispositivo compartido, ten en cuenta que es accesible desde el propio navegador.
