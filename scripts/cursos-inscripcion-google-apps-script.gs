/**
 * Google Apps Script — Inscripciones SONOCRÍTICO
 *
 * 1. Crear Google Sheet con columnas (fila 1):
 *    Timestamp | Nombre | Especialidad | Institución | Email | WhatsApp | EsResidente | CodigoDescuento | Curso | Slug
 * 2. Extensiones → Apps Script → pegar este código
 * 3. Implementar → Nueva implementación → Aplicación web
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquier persona
 * 4. Copiar URL de la app web → NEXT_PUBLIC_SHEETS_WEBHOOK en el build
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const body = JSON.parse(e.postData.contents);

    const row = [
      new Date(),
      body.nombre || "",
      body.especialidad || "",
      body.institucion || "",
      body.email || "",
      body.whatsapp || "",
      body.esResidente === true || body.esResidente === "true" ? "Sí" : "No",
      body.codigoDescuento || "",
      body.curso || "",
      body.slug || "",
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/** Opcional: respuesta a preflight CORS desde el navegador */
function doOptions() {
  return ContentService.createTextOutput("").setMimeType(ContentService.MimeType.TEXT);
}
