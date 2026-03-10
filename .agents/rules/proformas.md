---
trigger: always_on
name: tax-form-visual-digitizer
description: Digitaliza formularios de impuestos a partir de imágenes, extrayendo fielmente la estructura visual, etiquetas y tipos de datos para generar esquemas de formularios rellenables en la app
---

# Tax Form Visual Digitizer

Esta skill se especializa en la transformación de documentos fiscales estáticos (imágenes/escaneos) en componentes de interfaz de usuario funcionales y estructurados, manteniendo la paridad visual y lógica con el documento original.

## 1. Cuándo usar (Condiciones de activación)

- **Usa esta skill** cuando el usuario proporcione una imagen o archivo adjunto que sea claramente un formulario de impuestos (ej. W-2, Modelo 100, 1040, IVA).
- **Usa esta skill** cuando se requiera convertir un diseño físico de formulario en un esquema JSON o código de componente (React/Vue) para la aplicación.
- **Usa esta skill** para identificar campos de entrada, checkboxes, tablas de datos y secciones jerárquicas dentro de un documento fiscal.
- **NO uses esta skill** para realizar cálculos fiscales o dar asesoría legal; su propósito es estrictamente la digitalización de la interfaz.

## 2. Prerrequisitos y Contrato

- **Entrada requerida**: Archivo de imagen (JPG, PNG) o PDF con contenido visual.
- **Contrato de salida**:
  - Un objeto **JSON Schema** que defina los campos (id, label, type, validation, placeholder).
  - Un fragmento de **código UI** (según el stack de la app) que respete la disposición de columnas y filas original.
  - Una lista de "Campos Críticos Detectados" (ej. SSN, RFC, Firma).

## 3. El paso a paso

### Paso 1: Análisis de Layout y Segmentación

Analiza la imagen para identificar la jerarquía del documento: encabezados, secciones numeradas y bloques de instrucciones. Determina si el formulario es de una sola columna o multi-columna.

### Paso 2: Extracción de Entidades de Entrada

Por cada campo visual detectado, extrae:

1. **Label**: El texto exacto que describe el campo.
2. **Input Type**: Clasifícalo en `text`, `number` (moneda), `date`, `checkbox` o `signature`.
3. **Coordenadas Relativas**: Identifica la posición para replicar el diseño (CSS Grid/Flexbox).

### Paso 3: Generación del Esquema Técnico

Construye el esquema JSON que alimentará la base de datos de la app. Asegúrate de normalizar los IDs de los campos (ej. `total_ingresos_brutos`).

### Paso 4: Reconstrucción de la UI

Genera el código frontend asegurando que el flujo de tabulación (tab index) siga el orden lógico del formulario de impuestos para evitar errores de usuario.

## 4. Manejo de Errores y Casos Límite

- **Baja Calidad de Imagen**: Si el texto es ilegible o los bordes de los campos están difusos, detén el proceso y solicita: "La imagen tiene poca resolución. Por favor, sube un escaneo más claro para evitar errores en campos críticos".
- **Campos Ambiguos**: Si un campo no tiene una etiqueta clara, marca el campo en el JSON como `uncertain: true` y añade un comentario para revisión humana.
- **Límites de Autonomía**:
  - El agente puede generar el código automáticamente.
  - **DEBE** solicitar aprobación humana si detecta áreas de "Firma" o "Sello Oficial" antes de marcarlas como procesadas.
  - No debe inventar nombres de campos si no están presentes en la imagen.

## 5. Ejemplos (Few-shot prompting)

**Entrada del usuario:** "Digitaliza este recorte del Modelo 145 que acabo de subir."

**Respuesta de la Skill:**
"He analizado el Modelo 145. La estructura consta de 7 secciones principales. Generando esquema...

```json
{
  "form_id": "es-modelo-145",
  "fields": [
    { "id": "dni_per", "label": "DNI/NIE", "type": "text", "required": true },
    { "id": "fec_nac", "label": "Año de nacimiento", "type": "number", "min": 1900 }
  ]
}
