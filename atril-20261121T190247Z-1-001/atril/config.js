/* =====================================================================
   ATRIL · config.js  ·  CONFIGURACIÓN RÁPIDA
   ---------------------------------------------------------------------
   Pega tu clave de Google Gemini entre las comillas de "apiKey".
   Con eso, la app arranca ya conectada y no tienes que tocar Ajustes.

   Cómo conseguir la clave (gratis):
     1. Entra en  https://aistudio.google.com
     2. Pulsa «Get API key» y copia la clave (empieza por AIza...)
     3. Pégala abajo, guarda el archivo y abre index.html

   ⚠️  Seguridad: esta clave queda escrita en este archivo.
       Es perfecto para uso personal en tu equipo.
       NO subas config.js a un sitio público (GitHub, etc.)
       o cualquiera podría ver tu clave. Si publicas la app,
       deja apiKey en "" y escribe la clave desde Ajustes.
   ===================================================================== */

window.ATRIL_CONFIG = {
  provider: 'gemini',
  apiKey: 'AQ.Ab8RN6LuyArRDmjR6rGgg-Lmr-7JEXvXXptiiq5crRFa11JedQ',   // clave proporcionada
  chatModel: 'gemini-2.0-flash',    // modelo de conversación
  embModel: 'text-embedding-004'    // modelo para el RAG (buscar en tus documentos)
};
