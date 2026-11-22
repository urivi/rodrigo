(() => {
  "use strict";

  const data = window.RODRIGO_CONTENT;
  if (!data) {
    console.error("Falta content.js: no se pudo cargar el contenido del sitio.");
    return;
  }

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const el = (tag, className, textValue) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (textValue !== undefined) node.textContent = textValue;
    return node;
  };

  const LEVELS = [
    { key: "all", text: "Todos" },
    { key: "basica", text: "Educación Básica" },
    { key: "media", text: "Enseñanza Media" },
    { key: "talleres", text: "Talleres / ACLES" },
    { key: "pendiente", text: "Por clasificar" }
  ];
  const levelText = key => LEVELS.find(level => level.key === key)?.text || "Nivel por confirmar";
  const sorted = items => [...items].sort((a, b) => {
    const aYear = Number.isFinite(a.year) ? a.year : -1;
    const bYear = Number.isFinite(b.year) ? b.year : -1;
    return bYear - aYear;
  });

  function makeGallery(images, title) {
    const gallery = el("div", "mosaic-gallery");
    gallery.setAttribute("aria-label", `Galería de ${title}`);
    images.forEach((item, index) => {
      const button = el("button", "mosaic-tile");
      button.type = "button";
      button.setAttribute("aria-label", `Ver imagen ${index + 1} de ${images.length}: ${item.alt || title}`);
      const image = el("img");
      image.src = item.src;
      image.alt = item.alt || `${title}, imagen ${index + 1}`;
      image.loading = "lazy";
      image.decoding = "async";
      image.addEventListener("load", () => scheduleMosaic(gallery));
      image.addEventListener("error", () => {
        button.classList.add("image-error");
        button.title = "No se encontró la imagen. Revisa la ruta en content.js";
        scheduleMosaic(gallery);
      });
      button.append(image);
      button.addEventListener("click", () => openLightbox(images, index, title));
      gallery.append(button);
    });
    mosaicObserver.observe(gallery);
    requestAnimationFrame(() => sizeMosaic(gallery));
    return gallery;
  }

  /* Galería de filas justificadas, inspirada en el referente visual.
     Se redistribuye según el ancho disponible, sin frameworks. */
  const measuredWidths = new WeakMap();
  const mosaicObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      const gallery = entry.target;
      const width = Math.round(entry.contentRect.width);
      if (measuredWidths.get(gallery) !== width) scheduleMosaic(gallery);
    });
  });
  const pendingMosaics = new Set();
  let mosaicFrame = 0;
  function scheduleMosaic(gallery) {
    pendingMosaics.add(gallery);
    if (mosaicFrame) return;
    mosaicFrame = requestAnimationFrame(() => {
      pendingMosaics.forEach(sizeMosaic);
      pendingMosaics.clear();
      mosaicFrame = 0;
    });
  }
  function sizeMosaic(gallery) {
    if (!gallery.isConnected || gallery.clientWidth < 10) return;
    const width = gallery.clientWidth;
    measuredWidths.set(gallery, Math.round(width));
    const tiles = [...gallery.querySelectorAll(".mosaic-tile")];
    if (!tiles.length) return;
    const ratios = tiles.map(tile => {
      const photo = $("img", tile);
      return photo?.naturalWidth && photo?.naturalHeight
        ? photo.naturalWidth / photo.naturalHeight
        : 0.75;
    });
    const gap = 4;
    const innerWidth = width - 8; // margen interior del mosaico
    const idealHeight = innerWidth >= 1100 ? 285 : innerWidth >= 700 ? 230 : innerWidth >= 460 ? 175 : 150;
    const count = tiles.length;
    const costs = Array(count + 1).fill(Infinity);
    const ends = Array(count).fill(count);
    costs[count] = 0;
    // Busca la combinación de filas más próxima a la altura objetivo.
    for (let start = count - 1; start >= 0; start--) {
      let aspectSum = 0;
      for (let end = start + 1; end <= count; end++) {
        aspectSum += ratios[end - 1];
        const rowCount = end - start;
        const height = (innerWidth - gap * (rowCount - 1)) / aspectSum;
        const diff = height - idealHeight;
        let penalty = diff * diff;
        if (height < idealHeight * 0.58) penalty += 28000;
        if (height > idealHeight * 1.65) penalty += 28000;
        if (rowCount === 1 && count > 1) penalty += 32000;
        const total = penalty + costs[end];
        if (total < costs[start]) {
          costs[start] = total;
          ends[start] = end;
        }
      }
    }
    const rows = [];
    for (let start = 0; start < count;) {
      const end = ends[start];
      const aspectSum = ratios.slice(start, end).reduce((sum, value) => sum + value, 0);
      const height = Math.min(490, Math.max(90, (innerWidth - gap * (end - start - 1)) / aspectSum));
      const row = el("div", "mosaic-row");
      row.style.height = `${height.toFixed(1)}px`;
      for (let index = start; index < end; index++) {
        const tile = tiles[index];
        tile.style.flex = `${ratios[index]} 1 0px`;
        tile.style.gridColumn = "";
        tile.style.gridRow = "";
        row.append(tile);
      }
      rows.push(row);
      start = end;
    }
    gallery.replaceChildren(...rows);
  }

  function createEntry(item, index, isExhibition = false) {
    const article = el("article", "archive-entry container");
    article.id = `${isExhibition ? "expo" : "proyecto"}-${item.id}`;
    const head = el("div", "archive-head");
    const eyebrow = el("div", "entry-eyebrow");
    eyebrow.append(el("span", "entry-serial", String(index + 1).padStart(2, "0")));
    eyebrow.append(el("span", "", item.year || "AÑO POR CONFIRMAR"));
    const label = isExhibition
      ? [item.school, item.grades].filter(Boolean).join(" · ")
      : [item.grade || (item.level === "pendiente" ? "NIVEL POR CONFIRMAR" : levelText(item.level)), item.school].filter(Boolean).join(" · ");
    if (label) eyebrow.append(el("span", "entry-details", label));
    const title = el("h3", "entry-title", item.title);
    const text = el("div", "entry-text");
    if (item.concept) text.append(el("p", "entry-concept", item.concept));
    (item.description || []).forEach(paragraph => text.append(el("p", "", paragraph)));
    head.append(eyebrow, title, text);
    article.append(head);
    if (Array.isArray(item.images) && item.images.length) {
      article.append(makeGallery(item.images, item.title));
      article.append(el("p", "gallery-caption", "REGISTRO VISUAL  /  ABRIR IMAGEN PARA AMPLIAR"));
    }
    return article;
  }

  const projectList = $("#projects-list");
  const filters = $("#project-filters");
  const count = $("#project-count");
  let selectedLevel = "all";

  function renderFilters() {
    filters.replaceChildren();
    LEVELS.forEach(({key, text}) => {
      if (key === "pendiente" && !data.projects.some(item => item.level === "pendiente")) return;
      const button = el("button", `filter-button${selectedLevel === key ? " active" : ""}`, text);
      button.type = "button";
      button.setAttribute("aria-pressed", String(selectedLevel === key));
      button.addEventListener("click", () => {
        selectedLevel = key;
        renderFilters();
        renderProjects();
      });
      filters.append(button);
    });
  }

  function renderProjects() {
    const list = sorted(data.projects).filter(item => selectedLevel === "all" || item.level === selectedLevel);
    projectList.querySelectorAll(".mosaic-gallery").forEach(gallery => mosaicObserver.unobserve(gallery));
    projectList.replaceChildren();
    list.forEach((item, i) => projectList.append(createEntry(item, i)));
    if (!list.length) {
      const empty = el("div", "empty-projects container");
      empty.append(el("p", "", "Todavía no hay proyectos publicados en esta categoría."));
      projectList.append(empty);
    }
    count.textContent = `${list.length} ${list.length === 1 ? "PROYECTO" : "PROYECTOS"}`;
  }

  function renderExhibitions() {
    const container = $("#exhibitions-list");
    container.replaceChildren();
    if (!data.exhibitions.length) {
      const empty = el("div", "exhibitions-empty");
      const mark = el("div", "exhibitions-empty-mark", "✳");
      mark.setAttribute("aria-hidden", "true");
      const content = el("div", "exhibitions-empty-text");
      content.append(el("p", "micro-label", "ARCHIVO EN PREPARACIÓN"));
      content.append(el("h3", "", "Próximamente, las muestras."));
      content.append(el("p", "", "Aquí se incorporarán exposiciones realizadas en los colegios, con fotografías de las obras, el montaje y la participación de los estudiantes."));
      empty.append(mark, content);
      container.append(empty);
      return;
    }
    sorted(data.exhibitions).forEach((item, index) => container.append(createEntry(item, index, true)));
  }

  function renderContact() {
    const container = $("#contact-links");
    container.replaceChildren();
    if (data.contact?.email) {
      const link = el("a", "footer-link footer-email", data.contact.email + " ↗");
      link.href = `mailto:${data.contact.email}`;
      container.append(link);
    } else {
      container.append(el("span", "footer-link inactive-link", "Correo de contacto · Por confirmar"));
    }
    (data.contact?.links || []).forEach(item => {
      if (item.url && /^https?:\/\//i.test(item.url)) {
        const link = el("a", "footer-link", `${item.label} ↗`);
        link.href = item.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        container.append(link);
      } else {
        container.append(el("span", "footer-link inactive-link", `${item.label} · Próximamente`));
      }
    });
  }

  const dialog = $("#image-lightbox");
  const largeImage = $("#lightbox-image");
  const lightboxPosition = $("#lightbox-position");
  const lightboxCaption = $("#lightbox-caption");
  const previousButton = $("#lightbox-prev");
  const nextButton = $("#lightbox-next");
  let activeGallery = [];
  let activeIndex = 0;
  let activeTitle = "";
  function openLightbox(images, index, title) {
    activeGallery = images;
    activeIndex = index;
    activeTitle = title;
    updateLightbox();
    if (!dialog.open) dialog.showModal();
  }
  function updateLightbox() {
    const item = activeGallery[activeIndex];
    if (!item) return;
    largeImage.src = item.src;
    largeImage.alt = item.alt || activeTitle;
    lightboxPosition.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(activeGallery.length).padStart(2, "0")}`;
    lightboxCaption.textContent = `${activeTitle} — ${item.alt || "Registro visual"}`;
    previousButton.hidden = nextButton.hidden = activeGallery.length < 2;
  }
  function changeLightbox(delta) {
    activeIndex = (activeIndex + delta + activeGallery.length) % activeGallery.length;
    updateLightbox();
  }
  $("#lightbox-close").addEventListener("click", () => dialog.close());
  previousButton.addEventListener("click", () => changeLightbox(-1));
  nextButton.addEventListener("click", () => changeLightbox(1));
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") { event.preventDefault(); changeLightbox(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); changeLightbox(1); }
  });

  const menuButton = $("#menu-toggle");
  const menu = $("#site-nav");
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.querySelector("span").textContent = isOpen ? "−" : "+";
  });
  menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.querySelector("span").textContent = "+";
  }));

  $("#current-year").textContent = String(new Date().getFullYear());
  renderFilters();
  renderProjects();
  renderExhibitions();
  renderContact();
})();
