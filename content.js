/*
 * CONTENIDO EDITABLE DEL PORTAFOLIO DE RODRIGO
 *
 * 1. Para agregar un proyecto, copia un bloque de "projects" y cámbiale el id.
 * 2. Usa year: 2026 (un número) para que el sitio ordene de nuevo a antiguo.
 * 3. level: "basica", "media", "talleres" o "pendiente".
 * 4. Guarda fotos dentro de img/ y escribe aquí la ruta exacta.
 * 5. Para exposiciones escolares, agrega bloques a "exhibitions".
 * 6. No hace falta editar index.html ni script.js.
 *
 * IMPORTANTE: Las fotografías iniciales son RECORTES DE LA CAPTURA facilitada
 * para la maqueta. Fechas, niveles, establecimientos y contexto de las
 * actividades NO ESTÁN CONFIRMADOS. Reemplazar por archivos originales y
 * revisar permisos de publicación antes de usar el sitio como portafolio público.
 */

window.RODRIGO_CONTENT = {
  contact: {
    // Si se confirma un correo de contacto público, agregarlo aquí.
    email: "",
    // Agregar enlaces públicos cuando estén disponibles; mientras tanto
    // aparecerán como "próximamente" y NO enviarán a páginas inexistentes.
    links: [
      { label: "Portafolio artístico", url: "" },
      { label: "Instagram", url: "" },
      { label: "Otros proyectos", url: "" }
    ]
  },

  projects: [
    {
      id: "reflexion-paisajes-afectivos",
      title: "Reflexión y paisajes afectivos",
      year: null,                  // Ejemplo: 2026
      level: "pendiente",          // Cambiar a basica / media / talleres
      grade: "",                  // Ejemplo: "7° básico"
      school: "",                 // Nombre del establecimiento, si se confirma
      concept: "Imagen, memoria y experiencia.",
      description: [
        "La documentación presenta páginas de cuadernos en torno a la reflexión y los paisajes afectivos. Textos, dibujos y referencias visuales conviven en trabajos que muestran diferentes formas de abordar una misma propuesta.",
        "Texto de muestra: aquí Rodrigo podrá explicar el objetivo del ejercicio, las técnicas utilizadas y lo que observó en el proceso de aprendizaje."
      ],
      images: [
        { src: "img/paisajes-04.webp", alt: "Cuaderno con el título Reflexión y paisajes afectivos" },
        { src: "img/paisajes-01.webp", alt: "Cuaderno de reflexión con paisaje dibujado" },
        { src: "img/paisajes-02.webp", alt: "Página de cuaderno con texto, dibujo y collage" },
        { src: "img/paisajes-05.webp", alt: "Página de reflexión con flores dibujadas" },
        { src: "img/paisajes-03.webp", alt: "Cuaderno con texto y decoración en tonos pastel" },
        { src: "img/paisajes-06.webp", alt: "Cuaderno con escritura y paisaje ilustrado" },
        { src: "img/paisajes-07.webp", alt: "Cuaderno con texto y composición visual" }
      ]
    },
    {
      id: "angulos-y-planos",
      title: "Ángulos y planos",
      year: null,
      level: "pendiente",
      grade: "",
      school: "",
      concept: "Mirar, encuadrar y representar.",
      description: [
        "Una serie de cuadernos reúne exploraciones gráficas sobre ángulos, planos y composición. Las páginas combinan imágenes de referencia, ilustraciones y anotaciones realizadas a mano.",
        "Texto de muestra: este espacio permitirá describir la secuencia de actividades, el nivel participante y el trabajo visual realizado por el curso."
      ],
      images: [
        { src: "img/planos-01.webp", alt: "Cuaderno con ejercicios de planos y perspectivas" },
        { src: "img/planos-02.webp", alt: "Cuaderno con dibujos de encuadres" },
        { src: "img/planos-03.webp", alt: "Página con el título Ángulos" },
        { src: "img/planos-04.webp", alt: "Cuaderno con catálogo de planos" },
        { src: "img/planos-05.webp", alt: "Página con bocetos de planos de cámara" },
        { src: "img/planos-06.webp", alt: "Cuaderno con catálogo de ángulos y planos" }
      ]
    },
    {
      id: "procesos-de-dibujo",
      title: "Procesos de dibujo",
      year: null,
      level: "pendiente",
      grade: "",
      school: "",
      concept: "Ensayar, observar, transformar.",
      description: [
        "Registros de trabajo sobre mesas: bocetos, lápices, reglas, hojas de referencia y materiales en uso. Las imágenes permiten observar el desarrollo de los ejercicios, más allá de las piezas terminadas.",
        "Texto de muestra: Rodrigo podrá explicar aquí cómo organiza las etapas del proyecto y acompaña el proceso de sus estudiantes."
      ],
      images: [
        { src: "img/proceso-01.webp", alt: "Mesa de trabajo con materiales de dibujo y una persona trabajando" },
        { src: "img/proceso-02.webp", alt: "Mesa con reglas, hojas y dibujos" },
        { src: "img/proceso-03.webp", alt: "Materiales de dibujo sobre mesa de trabajo" },
        { src: "img/proceso-04.webp", alt: "Proceso de dibujo a lápiz sobre mesa" },
        { src: "img/proceso-05.webp", alt: "Mano realizando una actividad de dibujo" },
        { src: "img/proceso-06.webp", alt: "Materiales de dibujo y cuadernos" },
        { src: "img/proceso-07.webp", alt: "Actividad de dibujo con hojas de referencia" }
      ]
    }
  ],

  // Aquí irán las exposiciones REALES de obras de alumnos.
  // Copia este ejemplo (sin los //) dentro del arreglo y completa sus campos:
  // {
  //   id: "muestra-artes-2026",
  //   title: "Nombre de la exposición",
  //   year: 2026,
  //   school: "Nombre del colegio",
  //   grades: "Niveles participantes",
  //   concept: "Breve encabezado conceptual.",
  //   description: ["Primer párrafo.", "Segundo párrafo."],
  //   images: [{ src: "img/muestra-2026-01.webp", alt: "Obras en la exposición" }]
  // },
  exhibitions: []
};
