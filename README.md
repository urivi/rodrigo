# Rodrigo Uriví — Arte y educación

One-pager para GitHub Pages. Hecho sólo con HTML, CSS y JavaScript vanilla. No requiere instalaciones, frameworks, servicios externos, base de datos ni proceso de compilación.

## Archivos

- `index.html`: estructura de la página; normalmente no hace falta editarla.
- `style.css`: aspecto del sitio y responsive.
- `script.js`: filtros, orden cronológico, galería irregular, visor de imágenes y menú móvil.
- `content.js`: **todo lo que Rodrigo necesitará editar para añadir proyectos, fotos, enlaces y exposiciones**.
- `img/`: fotografías.

## Publicar en GitHub Pages

1. Crear un repositorio de GitHub, por ejemplo `rodrigo`.
2. Subir a la raíz del repositorio los cuatro archivos y la carpeta `img` (extraer el ZIP antes de subirlo). No subir sólo el ZIP.
3. Ir a **Settings → Pages**.
4. En **Build and deployment**, escoger **Deploy from a branch**, rama **main**, carpeta **/(root)** y guardar.
5. Una vez publicada, la URL será normalmente `https://USUARIO.github.io/rodrigo/`, si el repositorio se llama `rodrigo`.

También puedes probar el sitio abriendo `index.html` directamente en un navegador.

## Agregar un nuevo proyecto de aula

1. Copiar las nuevas fotos a `img/`, con nombres sencillos, como `grabado-2026-01.webp`.
2. Abrir `content.js` en GitHub y presionar el lápiz para editar.
3. Dentro de `projects: [ ... ]`, copiar uno de los bloques existentes y pegarlo como un nuevo objeto (separado por una coma).
4. Cambiar `id` (único, sólo letras minúsculas, números y guiones), `title`, `year`, `level`, `grade`, `school`, `concept`, `description` e `images`.
5. Para ordenar del más nuevo al más antiguo, introducir `year: 2026`, no `year: "2026"` ni `year: null`. Si no hay año, dejar `null`; se listará después de los que sí tengan año.
6. Los niveles válidos son `basica`, `media`, `talleres`, `pendiente` (este último es provisional).
7. Hacer clic en **Commit changes**. GitHub Pages publicará automáticamente la actualización.

### Ficha mínima de ejemplo (NO corresponde a una actividad real)

```js
{
  id: "collage-2026",
  title: "Collage y memoria",
  year: 2026,
  level: "media",
  grade: "II medio",
  school: "Nombre del establecimiento",
  concept: "Crear imágenes a partir de fragmentos.",
  description: [
    "Texto conceptual del proyecto y objetivo pedagógico.",
    "Proceso de trabajo y resultados observados."
  ],
  images: [
    { src: "img/collage-2026-01.webp", alt: "Collage creado por estudiantes" },
    { src: "img/collage-2026-02.webp", alt: "Montaje de imágenes en el aula" }
  ]
}
```

La grilla se adapta automáticamente al ancho de pantalla y a las proporciones originales de cada fotografía; no hay que definir tamaños o filas.

## Agregar exposiciones escolares

Hacer lo mismo dentro de `exhibitions: []`. Hay una ficha de ejemplo comentada justo antes de ese arreglo. Al agregar la primera exposición, se reemplaza automáticamente el bloque “Archivo en preparación” por la lista de muestras, ordenada por año.

## Actualizar contacto y enlaces

Editar `contact` en `content.js`. El sitio dejará inactivos los enlaces cuya URL sea una cadena vacía. El correo `contact.email` está vacío hasta que Rodrigo confirme cuál desea publicar.

## Fotos y autoría

Las **20 imágenes WEBP incluidas son recortes de la captura de pantalla enviada como referencia**, a modo de maqueta. No son fotografías originales. Los textos de las fichas de muestra son preliminares. Fechas, cursos, establecimientos y relación exacta entre fotografías deben confirmarse antes de publicarse como antecedentes reales. Conviene reemplazar las fotos recortadas por las originales, si están disponibles.

Antes de publicar imágenes donde aparezcan estudiantes, especialmente menores de edad, verificar autorizaciones de uso y evitar datos personales identificables.

## Recomendaciones de imágenes

- Exportar preferentemente a WebP o JPEG de calidad media-alta.
- Como la mayoría son fotografías de cuadernos o documentos, basta un lado mayor de aproximadamente 1000–1400 px cuando el archivo original lo permite.
- Nunca agrandar fotos pequeñas artificialmente: la galería está diseñada para mostrarlas en grupos compactos.
- Usar nombres de archivo sin espacios ni tildes para evitar errores de ruta.
- En `images`, escribir una frase específica en `alt` para accesibilidad.
