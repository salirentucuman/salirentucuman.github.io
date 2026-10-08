/* Hang Out Tucumán: aplicación. El contenido vive en data/lugares.json */

/* Idioma: español o inglés. Los textos de la interfaz se traducen con t(); el contenido, con el bloque "en" de cada ficha. */
var idioma = 'es';
try { idioma = localStorage.getItem('hangout-idioma') === 'en' ? 'en' : 'es'; } catch (e) { /* sin almacenamiento */ }
document.documentElement.lang = idioma === 'en' ? 'en-GB' : 'es-AR';
var TEXTOS = { es: {"cierre": "Hang Out Tucumán no es un directorio ni pretende reunirlo todo. Es una selección de aquellos sitios que nos gustan especialmente. Un café de nicho, un productor de queso de barrio, un rincón perfecto para leer en un parque. Hang Out Tucumán es una invitación a ir a los mejores lugares, para ser turista en tu ciudad o para que los visitantes la recorran con el criterio de un local. Hang Out Tucumán es autofinanciado, no es un sitio de publicidad. Un lugar aparece porque fuimos, y porque volveríamos. Si conocés un sitio que creés que merece ser parte de esta selección, avisanos! Si conocés los sitios destacados aquí, dejá tu reseña.", "legal1": "Hang Out Tucumán es una guía independiente y autofinanciada. Las descripciones son una mirada personal. Encontraste un dato inexacto? Por favor ", " días restantes": " días", "Sorprendeme con un lugar": "Click aquí para seleccionar un lugar random", "nos escribís": "escribinos", " para corregirlo.": ".", "Dejar reseña": "Dejá tu reseña", "sobre1": "Hang Out Tucumán no es un directorio ni pretende reunirlo todo. Es una selección de aquellos sitios que nos gustan especialmente, una invitación a ser turista en tu ciudad o para que los visitantes la recorran con el criterio de un local.", "sobre2": "Hang Out Tucumán es autofinanciado, no es un sitio de publicidad. Un lugar aparece aquí porque fuimos, y porque volveríamos.", "sobreCorto": "Hang Out Tucumán no es un directorio ni pretende reunirlo todo. Es una selección de aquellos sitios que nos gustan especialmente. Un lugar aparece porque fuimos, y porque volveríamos.", "aviso1": "Hang Out Tucumán es una guía independiente. Las descripciones son subjetivas. Encontraste un dato inexacto? Agradecemos que ", "aviso2": "nos escribas", "base1": "Si conocés un sitio que creés que merece ser parte de esta selección, avisanos ", "base2": "aquí"}, en: {
 "La guía para salir en Tucumán": "A considered guide to enjoying Tucumán.",
 "Todo": "All",
 "Agenda": "Diary",
 "Categorías": "Categories",
 "Último hallazgo": "Latest find",
 "Lugares": "Places",
 "Curiosear": "Curiosities",
 "Iniciativas tucumanas que tenés que conocer": "Tucumán initiatives worth knowing",
 "Café y copas": "Coffee & drinks",
 "Cafés, bares, pastelerías": "Cafés, bars, pâtisseries",
 "Restaurantes y bodegones": "Restaurants & bodegones",
 "Para almorzar o cenar": "For lunch or supper",
 "De autor": "Makers",
 "De barrio": "Buy as a local",
 "Productores locales o tiendas de barrio destacadas": "Local producers and shops of note",
 "Aire libre": "Outdoors",
 "Parques, callecitas, rincones": "Parks, quiet streets, corners",
 "Cultura": "Culture",
 "Museos, teatros, muestras": "Museums, theatres, exhibitions",
 "Eventos": "Events",
 "Sorprendeme con un lugar": "Click here for a place at random",
 "Falta algún lugar?": "Somewhere we have missed?",
 "Contanos cuál y por qué vale la pena.": "Tell us where, and why it deserves a place within this guide.",
 "Mail": "Email",
 "Ver toda la agenda": "View the full diary",
 "Todavía no hay lugares en esta categoría.": "Nothing here yet.",
 "No hay nada cargado para este momento del día. Probá con Todo.": "Nothing for this time of day. Try All.",
 "No hay lugares cargados para este momento del día.": "Nothing for this time of day.",
 "Guardados": "Saved",
 "Buscar por zona": "Browse by area",
 "Elegí una zona": "Choose an area",
 "Los lugares que marcaste para ir": "The places you have set aside",
 "Todavía no guardaste ningún lugar. Tocá el marcador en la ficha de un lugar para tenerlo acá.": "Nothing saved yet. Tap the bookmark on any place to keep it here.",
 "Este lugar ya no está disponible.": "This entry is no longer available.",
 "Tipo": "Type",
 "Momento": "When",
 "Dirección": "Address",
 "Precio": "Price",
 "Ideal para": "Well suited to",
 "De día": "By day",
 "De noche": "By night",
 "De día y de noche": "Day and night",
 "Fotos: ": "Photographs: ",
 "Cómo llegar": "Directions",
 "Compartir": "Share",
 "De qué se trata": "About",
 "Por qué ir": "Why go",
 "Datos prácticos": "Practicalities",
 "Ya fuiste?": "Been already?",
 "Dejar reseña": "Leave your note",
 "Inicio": "Home",
 "Guardado": "Saved",
 "Quitado de guardados": "Removed",
 "Enlace copiado": "Link copied",
 "Empieza hoy": "Begins today",
 "Empieza mañana": "Begins tomorrow",
 "Empieza en ": "Begins in ",
 " días": " days",
 "Se repite": "Recurring",
 "Termina hoy": "Ends today",
 "Últimos días": "Final days",
 "Está pasando · quedan ": "Now on · ",
 " días restantes": " days left",
 " lugar": " place",
 " lugares": " places",
 " y ": " and ",
 " evento": " event",
 " eventos": " events",
 "Hola, te sugiero un lugar para Hang Out Tucumán: ": "Hello, may I suggest a place for Hang Out Tucumán: ",
 "Sugerencia para Hang Out Tucumán": "A suggestion for Hang Out Tucumán",
 "Hola, quiero corregir un dato de Hang Out Tucumán: ": "Hello, I should like to correct a detail on Hang Out Tucumán: ",
 "Hola, quisiera saber cómo llegar a ": "Hello, could you tell me how to find ",
 "Mi reseña de ": "My note on ",
 " para Hang Out Tucumán: ": " for Hang Out Tucumán: ",
 "cierre": "Hang Out Tucumán is not a directory, nor does it try to gather everything. It is a selection of the places we are especially fond of. A coffee house for the few, a neighbourhood cheesemaker, the right corner of a park in which to read. It is an invitation to the best of the city: to be a visitor in your own town, or to see it with the eye of someone who lives here. Hang Out Tucumán is self-funded and carries no advertising. A place appears because we went, and because we would go back. If you know somewhere that belongs in this selection, do tell us. And if you know the places gathered here, leave a note.",
 "legal1": "Hang Out Tucumán is an independent, self-funded guide. The descriptions are a personal view. Found a detail that is not quite right? Please ",
 "nos escribís": "write to us",
 " para corregirlo.": ".",
 "Curiosidad": "Curiosity",
 "pronto": "soon",
 "Abrir índice": "Open index",
 "Cerrar índice": "Close index",
 "Índice": "Index",
 "Sugerilo por ": "Tell us by ",
 " o por ": " or by ",
 "mail": "email",
 "Diseño": "Design",
 "Ver foto ": "View photograph ",
 "Foto anterior": "Previous photograph",
 "Foto siguiente": "Next photograph",
 "Seguinos en Instagram": "Follow us on Instagram",
 "Volver": "Back",
 "Favorito de Hang Out": "A Hang Out favourite",
 "Sugerir un lugar": "Suggest a place",
 "Qué lugar es?": "Which place?",
 "Por qué vale la pena?": "Why does it deserve a place?",
 "Contanos cómo te fue": "Tell us how it was",
 "Tu nombre o contacto (opcional)": "Your name or contact (optional)",
 "Enviar": "Send",
 "Enviando…": "Sending…",
 "No se pudo enviar. Probá de nuevo o escribinos por WhatsApp.": "It could not be sent. Please try again, or write to us on WhatsApp.",
 "Completá los campos para enviar.": "Please fill in the fields before sending.",
 "Contacto": "Contact",
 "Hola, te escribo por Hang Out Tucumán: ": "Hello, I am writing about Hang Out Tucumán: ",
 "Gracias! Hemos recibido tu sugerencia exitosamente.": "Thank you. Your suggestion has reached us safely.",
 "Gracias! Hemos recibido tu reseña exitosamente.": "Thank you. Your note has reached us safely.",
 "Dejar otra sugerencia": "Suggest another",
 "Dejar otra reseña": "Leave another note",
 "Zona / Barrio": "Area",
 "sobre1": "Hang Out Tucumán is not a directory, nor does it try to gather everything. It is a selection of the places we are especially fond of: an invitation to be a visitor in your own town, or to see it with the eye of someone who lives here.",
 "sobre2": "Hang Out Tucumán is self-funded and carries no advertising. A place appears here because we went, and because we would go back.",
 "sobreCorto": "Hang Out Tucumán is not a directory, nor does it try to gather everything. It is a selection of the places we are especially fond of. A place appears because we went, and because we would go back.",
 "aviso1": "Hang Out Tucumán is an independent guide. The descriptions are subjective. Found a detail that is not quite right? We would be grateful if you would ",
 "aviso2": "write to us",
 "base1": "If you know somewhere that belongs in this selection, tell us ",
 "base2": "here",
 "Sobre la guía": "About the guide",
 "Aviso": "Note",
 "E-mail": "Email",
 "Ver más lugares": "View more places",
 "Página anterior": "Previous page",
 "Página siguiente": "Next page",
 "Escribí acá": "Write here",
 "Cerrar": "Close"
} };
function t(clave) { var v = TEXTOS[idioma][clave]; return v === undefined ? clave : v; }
function L(lugar) {
  if (idioma !== 'en' || !lugar.en) return lugar;
  var copia = {}, k;
  for (k in lugar) copia[k] = lugar[k];
  for (k in lugar.en) if (k !== 'cuando' && lugar.en[k]) copia[k] = lugar.en[k];
  if (lugar.evento && lugar.en.cuando) { copia.evento = { cuando: lugar.en.cuando, inicio: lugar.evento.inicio, fin: lugar.evento.fin }; }
  return copia;
}

var CATEGORIAS = [
  { id: 'comer', nombre: t('Café y copas'), sub: t('Cafés, bares, pastelerías'),
    icono: '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 3v3"/><path d="M12 3v3"/>',
    icono2: '<path d="M5 4h14l-7 8z"/><path d="M12 12v8"/><path d="M8 20h8"/>' },
  { id: 'restaurantes', nombre: t('Restaurantes y bodegones'), sub: t('Para almorzar o cenar'),
    icono: '<path d="M7 3v8"/><path d="M4 3v5a3 3 0 0 0 6 0V3"/><path d="M7 11v10"/><path d="M17 3c-2 2-3 4.500-3 8h3"/><path d="M17 3v18"/>' },
  { id: 'street', nombre: t('Street food'), sub: '',
    icono: '<path d="M3 7h12v9H3z"/><path d="M15 10h3l3 3v3h-6"/><circle cx="7" cy="17.500" r="1.800"/><circle cx="17" cy="17.500" r="1.800"/><path d="M6 10h6"/>' },
  { id: 'autor', nombre: t('De autor'), sub: '',
    icono: '<path d="M4 20l1.200-4.800L16.500 3.900a2 2 0 0 1 2.800 0l.8.8a2 2 0 0 1 0 2.800L8.800 18.800z"/><path d="m14.500 6 3.500 3.500"/><path d="M13 20h7"/>' },
  { id: 'barrio', nombre: t('De barrio'), sub: t('Productores locales o tiendas de barrio destacadas'),
    icono: '<path d="M4 10 5.5 4h13L20 10"/><path d="M4 10h16"/><path d="M5.5 10v10h13V10"/><path d="M10 20v-5h4v5"/>' },
  { id: 'pasear', nombre: t('Aire libre'), sub: t('Parques, callecitas, rincones'),
    icono: '<path d="M12 3 6 12h3l-4 6h14l-4-6h3z"/><path d="M12 18v3"/>' },
  { id: 'cultura', nombre: t('Cultura'), sub: t('Museos, teatros, muestras'),
    icono: '<path d="M3 9 12 4l9 5"/><path d="M4 9h16"/><path d="M6 9v9"/><path d="M10 9v9"/><path d="M14 9v9"/><path d="M18 9v9"/><path d="M3 20h18"/>' },
  { id: 'diseno', nombre: t('Diseño'), sub: '',
    icono: '<path d="M12 3 4 7v6c0 4 3.500 7 8 8 4.500-1 8-4 8-8V7z"/>' },
  { id: 'eventos', nombre: t('Eventos'), sub: '',
    icono: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16"/><path d="M8 3v4"/><path d="M16 3v4"/>' }
];

var ICONOS = {
  azar: '<path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="M21 16v5h-5"/><path d="m15 15 6 6"/><path d="m4 4 5 5"/>',
  volver: '<path d="M15 5 8 12l7 7"/>',
  guardar: '<path d="M6 4h12v17l-6-4.5L6 21z"/>',
  mapa: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  compartir: '<path d="M12 15V4"/><path d="m8 8 4-4 4 4"/><path d="M5 13v6h14v-6"/>',
  chat: '<path d="M4 20l1.4-4.2A8 8 0 1 1 8.2 18.6z"/>',
  inicio: '<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z"/>'
};

var datos = { config: {}, lugares: [] };
var app = document.getElementById('app');

function svg(trazos, tam, grosor) {
  return '<svg width="' + tam + '" height="' + tam + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' +
    (grosor || 1.6) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + trazos + '</svg>';
}

function esc(texto) {
  return String(texto == null ? '' : texto).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function categoria(id) {
  for (var i = 0; i < CATEGORIAS.length; i++) if (CATEGORIAS[i].id === id) return CATEGORIAS[i];
  return null;
}

/* Un evento con fecha de fin ya pasada deja de mostrarse solo. */
function vigente(lugar) {
  var fin = lugar.evento && lugar.evento.fin;
  if (!fin) return true;
  var fecha = new Date(fin);
  return isNaN(fecha.getTime()) || fecha.getTime() >= Date.now();
}

/* Filtro Day Out / Night Out. Un lugar sin momento cargado aparece en los dos. */
var MOMENTOS = [['todo', t('Todo')], ['dia', 'Day Out'], ['noche', 'Night Out']];
var momento = 'todo';
try { momento = localStorage.getItem('dayout-momento') || 'todo'; } catch (e) { /* sin almacenamiento */ }

function coincide(lugar) {
  if (momento === 'todo') return true;
  if (lugar.curiosidad) return false;
  var m = lugar.momento || 'ambos';
  return m === 'ambos' || m === momento;
}

function etiquetaMomento(lugar) {
  return { dia: t('De día'), noche: t('De noche'), ambos: t('De día y de noche') }[lugar.momento] || '';
}

function filtroMomento() {
  return '<div class="momentos" role="group" aria-label="Filtrar por momento del día">' + MOMENTOS.map(function (m) {
    return '<button class="momento" data-accion="momento" data-valor="' + m[0] + '" aria-pressed="' + (momento === m[0]) + '">' + m[1] + '</button>';
  }).join('') + '</div>';
}

function lugaresVigentes() {
  return datos.lugares.filter(vigente).filter(coincide);
}

function deCategoria(id) {
  return lugaresVigentes().filter(function (l) { return (l.categorias || []).indexOf(id) !== -1; });
}

/* Zonas: lista fija; un lugar pertenece a una zona si su campo "Zona / Barrio" la nombra. */
var ZONAS = ['Barrio Norte', 'Barrio Sur', 'Ciudadela', 'Yerba Buena'];
function deZona(z) {
  return lugaresVigentes().filter(function (l) { return !l.curiosidad && !l.evento && (l.zona || '').toLowerCase().indexOf(z.toLowerCase()) !== -1; });
}
function buscadorZona() {
  var filas = ZONAS.map(function (z, i) { return deZona(z).length ? [z, i] : null; }).filter(Boolean);
  if (!filas.length) return '';
  return '<section class="bloque buscar-zona"><h2 class="etiqueta">' + t('Buscar por zona') + '</h2><details class="desplegable"><summary><span>' + t('Elegí una zona') + '</span>' + svg('<path d="m6 9 6 6 6-6"/>', 14, 1.6) + '</summary>' +
    '<div class="zona-lista">' + filas.map(function (f, n) {
      return '<a class="zona-fila" href="#/zona/' + f[1] + '"><span class="zona-num">' + (n < 9 ? '0' : '') + (n + 1) + '</span><span class="zona-nombre">' + f[0] + '</span><span class="zona-flecha" aria-hidden="true">→</span></a>';
    }).join('') + '</div></details></section>';
}
function vistaZona(i) {
  var z = ZONAS[Number(i)];
  if (!z) return vistaInicio();
  var lista = deZona(z), pg = paginado(lista, 'zona-' + i, 32);
  return '<main class="pagina">' + marca() +
    '<div><h1 class="titulo">' + z + '</h1></div>' + filtroMomento() +
    (lista.length ? '<div class="lista" id="lista-lugares">' + pg.items.map(tarjeta).join('') + '</div>' + pg.nav : '<p class="vacio">' + t('No hay nada cargado para este momento del día. Probá con Todo.') + '</p>') +
    pie(false) + '</main>' + nav('');
}

function nombresCategorias(lugar) {
  var nombres = (lugar.categorias || []).map(function (id) {
    var c = categoria(id);
    return c ? c.nombre : '';
  }).filter(Boolean);
  if (lugar.curiosidad) nombres.unshift(t('Curiosidad'));
  return nombres.join(' · ');
}

/* Guardados: se recuerdan solo en este dispositivo. */
function leerGuardados() {
  try { return JSON.parse(localStorage.getItem('dayout-guardados') || '[]'); } catch (e) { return []; }
}
function alternarGuardado(id) {
  var lista = leerGuardados();
  var pos = lista.indexOf(id);
  if (pos === -1) lista.push(id); else lista.splice(pos, 1);
  try { localStorage.setItem('dayout-guardados', JSON.stringify(lista)); } catch (e) { /* sin almacenamiento */ }
  return pos === -1;
}

function whatsapp(texto) {
  var numero = String(datos.config.whatsapp || '').replace(/\D/g, '');
  return 'https://wa.me/' + numero + '?text=' + encodeURIComponent(texto);
}

function aviso(texto) {
  var el = document.createElement('div');
  el.className = 'aviso';
  el.setAttribute('role', 'status');
  el.textContent = texto;
  document.body.appendChild(el);
  setTimeout(function () { el.remove(); }, 2200);
}

function foto(lugar, clase) {
  if (lugar.foto) return '<img class="' + clase + '" src="' + esc(lugar.foto) + '" alt="" loading="lazy"' + encuadre(lugar, lugar.foto) + '>';
  return '<div class="' + clase + '"></div>';
}

/* Estado de un evento: marca la urgencia según la fecha de hoy. */
function estadoEvento(lugar) {
  var ev = lugar.evento || {}, ahora = Date.now(), dia = 86400000;
  var inicio = ev.inicio ? new Date(ev.inicio).getTime() : NaN;
  var fin = ev.fin ? new Date(ev.fin).getTime() : NaN;
  if (!isNaN(inicio) && ahora < inicio) {
    if (new Date(inicio).toDateString() === new Date().toDateString()) return { vivo: false, texto: t('Empieza hoy') };
    var faltan = Math.ceil((inicio - ahora) / dia);
    return { vivo: false, texto: faltan <= 1 ? t('Empieza mañana') : t('Empieza en ') + faltan + t(' días') };
  }
  if (isNaN(fin)) return { vivo: false, texto: t('Se repite') };
  var quedan = Math.ceil((fin - ahora) / dia);
  if (quedan <= 1) return { vivo: true, texto: t('Termina hoy') };
  if (quedan <= 2) return { vivo: true, texto: t('Últimos días') };
  return { vivo: true, texto: t('Está pasando · quedan ') + quedan + t(' días restantes') };
}

/* Orden de la agenda: primero lo que termina antes, después lo que está por empezar, al final lo que se repite. */
function urgencia(lugar) {
  var ev = lugar.evento || {}, ahora = Date.now();
  var inicio = ev.inicio ? new Date(ev.inicio).getTime() : NaN;
  var fin = ev.fin ? new Date(ev.fin).getTime() : NaN;
  if (!isNaN(inicio) && inicio > ahora) return [1, inicio];
  if (!isNaN(fin)) return [0, fin];
  return [2, 0];
}
function porUrgencia(a, b) {
  var x = urgencia(a), y = urgencia(b);
  return x[0] - y[0] || x[1] - y[1];
}

function pildora(lugar) {
  var e = estadoEvento(lugar);
  return '<div class="pildora"><span class="punto' + (e.vivo ? ' vivo' : '') + '"></span>' + e.texto + '</div>';
}

/* Estrella propia para los favoritos de la selección. */
var ESTRELLA = '<svg class="estrella" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 1.500c.9 6.200 4.400 9.700 10.500 10.500-6.100.8-9.600 4.300-10.500 10.500C11.100 16.300 7.600 12.800 1.500 12 7.600 11.200 11.100 7.700 12 1.500z"/></svg>';
/* Encuadre elegido en el panel para cada foto (object-position). */
function encuadre(lugar, ruta) { var e = (lugar.encuadre || {})[ruta]; return e ? ' style="object-position:' + esc(e) + '"' : ''; }
function leyendaFavorito() { return '<div class="favorito">' + ESTRELLA + '<span>' + t('Favorito de Hang Out') + '</span></div>'; }
function nombreCon(lugar) {
  return esc(lugar.nombre) + (lugar.favorito ? ' <svg class="estrella" viewBox="0 0 24 24" role="img" aria-label="Favorito de Hang Out"><path fill="currentColor" d="M12 1.500c.9 6.200 4.400 9.700 10.500 10.500-6.100.8-9.600 4.300-10.500 10.500C11.100 16.300 7.600 12.800 1.500 12 7.600 11.200 11.100 7.700 12 1.500z"/></svg>' : '');
}

function tarjetaEvento(lugar, compacta) {
  lugar = L(lugar);
  var cuando = lugar.evento && lugar.evento.cuando;
  return '<a class="tarjeta-evento' + (compacta === true ? ' compacta' : '') + '" href="#/lugar/' + encodeURIComponent(lugar.id) + '">' +
    (lugar.foto ? '<img class="tarjeta-evento-foto" src="' + esc(lugar.foto) + '" alt="" loading="lazy"' + encuadre(lugar, lugar.foto) + '>' : '') +
    '<div class="tarjeta-evento-texto">' + pildora(lugar) +
    '<div class="tarjeta-evento-nombre">' + nombreCon(lugar) + '</div>' +
    (cuando ? '<div class="tarjeta-evento-cuando">' + esc(cuando) + '</div>' : '') +
    '</div></a>';
}

function tarjeta(lugar) {
  if (lugar.evento) return tarjetaEvento(lugar);
  lugar = L(lugar);
  return '<a class="tarjeta" href="#/lugar/' + encodeURIComponent(lugar.id) + '">' +
    foto(lugar, 'tarjeta-foto') +
    '<div class="tarjeta-texto">' +
    '<div class="tarjeta-cat">' + esc(nombresCategorias(lugar)) + '</div>' +
    '<div class="tarjeta-nombre">' + nombreCon(lugar) + '</div>' +
    (lugar.breve ? '<div class="tarjeta-breve">' + esc(lugar.breve) + '</div>' : '') +
    '</div></a>';
}

function nav(actual) {
  function item(ruta, id, icono, texto) {
    return '<a href="' + ruta + '"' + (actual === id ? ' aria-current="page"' : '') + '>' + svg(icono, 22, 1.8) + '<span>' + texto + '</span></a>';
  }
  return '<nav class="nav" aria-label="Principal"><div class="nav-interior">' +
    item('#/', 'inicio', ICONOS.inicio, t('Inicio')) +
    item('#/guardados', 'guardados', ICONOS.guardar, t('Guardados')) +
    '</div></nav>';
}

/* Encabezado: las tres rayitas abren el índice; el logo lleva siempre al inicio. */
var LOGO = '<b>HANG OUT</b> TUCUMÁN';
var INSTAGRAM = 'https://www.instagram.com/hangout_tucuman/';
var ICONO_IG = '<rect x="4" y="4" width="16" height="16" rx="4.500"/><circle cx="12" cy="12" r="3.600"/><circle cx="16.600" cy="7.400" r="0.600" fill="currentColor"/>';
function sugerir() {
  return t('Falta algún lugar?') + ' ' + t('Sugerilo por ') + '<a target="_blank" rel="noopener" href="' + esc(whatsapp(t('Hola, te sugiero un lugar para Hang Out Tucumán: '))) + '">WhatsApp</a>' +
    t(' o por ') + '<a href="mailto:hola@hangout-tucuman.com?subject=' + encodeURIComponent(t('Sugerencia para Hang Out Tucumán')) + '">' + t('mail') + '</a>.';
}
function idiomas() {
  return '<div class="idiomas" role="group" aria-label="Idioma / Language">' + [['es', 'ES'], ['en', 'EN']].map(function (i, n) {
    return (n ? '<span aria-hidden="true">/</span>' : '') + '<button class="idioma" data-accion="idioma" data-valor="' + i[0] + '" aria-pressed="' + (idioma === i[0]) + '">' + i[1] + '</button>';
  }).join('') + '</div>';
}
/* Buzón: sugerencias y reseñas se envían desde la web y llegan a la planilla y al mail de Hang Out. */
var BUZON = 'https://script.google.com/macros/s/AKfycbwvoVw61GuKXi8-dW1FNIQP2RemJcBIkQtiOQipCZdQJa6aExXCJJrC_vjSs78ZD0Rvcg/exec';
function contacto() {
  return '<a target="_blank" rel="noopener" href="' + esc(whatsapp(t('Hola, te escribo por Hang Out Tucumán: '))) + '">WhatsApp</a>' +
    '<a href="mailto:hola@hangout-tucuman.com">' + t('Mail') + '</a>' +
    '<a target="_blank" rel="noopener" href="' + INSTAGRAM + '">Instagram</a>';
}
function buzon(tipo, lugar) {
  var n = tipo + '-' + Math.random().toString(36).slice(2, 7);
  return '<form class="buzon" data-tipo="' + tipo + '"' + (lugar ? ' data-lugar="' + esc(lugar) + '"' : '') + ' novalidate>' +
    (lugar ? '' : '<label for="l-' + n + '">' + t('Qué lugar es?') + '</label><input id="l-' + n + '" name="lugar" type="text" maxlength="150" autocomplete="off" placeholder="' + t('Escribí acá') + '">') +
    '<label for="m-' + n + '">' + (lugar ? t('Contanos cómo te fue') : t('Por qué vale la pena?')) + '</label><textarea id="m-' + n + '" name="mensaje" rows="4" maxlength="3000" placeholder="' + t('Escribí acá') + '"></textarea>' +
    '<label for="c-' + n + '">' + t('Tu nombre o contacto (opcional)') + '</label><input id="c-' + n + '" name="contacto" type="text" maxlength="150" autocomplete="off" placeholder="' + t('Escribí acá') + '">' +
    '<input class="trampa" name="web" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">' +
    '<div class="buzon-pie"><button class="boton buzon-enviar" type="submit">' + t('Enviar') + '</button><div class="buzon-estado" role="status"></div></div></form>';
}
function indice() {
  var filas = CATEGORIAS.map(function (c) {
    var n = deCategoria(c.id).length;
    /* "pronto" solo si la categoría no tiene nada cargado; si está vacía por el filtro de momento, va un cero. */
    var total = datos.lugares.filter(vigente).filter(function (l) { return (l.categorias || []).indexOf(c.id) !== -1; }).length;
    return '<a class="indice-fila' + (n ? '' : ' apagada') + '" href="#/categoria/' + c.id + '"><span>' + c.nombre + '</span><span>' + (n || (total ? '0' : t('pronto'))) + '</span></a>';
  }).join('');
  return '<div class="velo" data-accion="cerrar-menu"></div>' +
    '<aside class="indice" aria-label="' + t('Índice') + '">' +
    '<div class="indice-cabeza"><a class="marca" href="#/" data-accion="inicio">' + LOGO + '</a>' +
    '<button class="menu-btn" data-accion="cerrar-menu" aria-label="' + t('Cerrar índice') + '">' + svg('<path d="M6 6l12 12"/><path d="M18 6 6 18"/>', 22, 1.8) + '</button></div>' +
    idiomas() +
    '<div><div class="etiqueta indice-titulo">' + t('Categorías') + '</div>' + filas + '</div>' +
    '<button class="enlace-azar" data-accion="azar">' + svg(ICONOS.azar, 18, 1.8) + '<span>' + t('Sorprendeme con un lugar') + '</span></button>' +
    '<a class="indice-link" href="#/guardados">' + svg(ICONOS.guardar, 18, 1.8) + '<span>' + t('Guardados') + '</span></a>' +
    '<a class="indice-link" target="_blank" rel="noopener" href="' + INSTAGRAM + '">' + svg(ICONO_IG, 18, 1.8) + '<span>' + t('Seguinos en Instagram') + '</span></a>' +
    '<div class="indice-pie"><div class="etiqueta indice-titulo">' + t('Contacto') + '</div>' + contacto() + '</div></aside>';
}
function marca() {
  return '<header class="cabecera"><button class="menu-btn" data-accion="menu" aria-label="' + t('Abrir índice') + '">' + svg('<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>', 24, 1.8) + '</button>' +
    '<a class="marca" href="#/" data-accion="inicio" aria-label="Hang Out Tucumán">' + LOGO + '</a></header>' + indice();
}

/* Pie: completo en la portada; en el resto, solo "Sobre la guía". */
function pie(completo) {
  if (!completo) return '<div class="zona sola"><div class="pie1"><div class="pie-rotulo">' + t('Sobre la guía') + '</div>' + t('sobreCorto') + '</div></div>';
  return '<div class="pie3"><div><div class="pie-rotulo">' + t('Sobre la guía') + '</div><p>' + t('sobre1') + '</p><p>' + t('sobre2') + '</p></div>' +
    '<div class="pie-contacto"><div class="pie-rotulo">' + t('Contacto') + '</div><a target="_blank" rel="noopener" href="' + INSTAGRAM + '">Instagram</a>' +
    '<a target="_blank" rel="noopener" href="' + esc(whatsapp(t('Hola, te escribo por Hang Out Tucumán: '))) + '">WhatsApp</a><a href="mailto:hola@hangout-tucuman.com">' + t('E-mail') + '</a></div>' +
    '<div class="pie-aviso"><div class="pie-rotulo">' + t('Aviso') + '</div>' + t('aviso1') + '<a target="_blank" rel="noopener" href="' + esc(whatsapp(t('Hola, quiero corregir un dato de Hang Out Tucumán: '))) + '">' + t('aviso2') + '</a>!</div>' +
    '<div class="pie-base">' + t('base1') + '<a href="#/" data-accion="abrir-buzon" data-tipo="sugerencia">' + t('base2') + '</a>!</div></div>';
}

/* Listas largas: páginas con números discretos (hasta cuatro a la vista, que se van corriendo). */
var paginas = {}, expandido = false;
function paginado(lista, clave, porPagina) {
  var total = Math.max(1, Math.ceil(lista.length / porPagina));
  var p = Math.min(paginas[clave] || 1, total);
  var nav = '';
  {
    var desde = Math.max(1, Math.min(p - 2, total - 3)), hasta = Math.min(total, desde + 3), nums = [];
    for (var i = desde; i <= hasta; i++) nums.push('<button class="pag-n" data-accion="pagina" data-clave="' + clave + '" data-valor="' + i + '"' + (i === p ? ' aria-current="page"' : '') + '>' + i + '</button>');
    nav = '<nav class="paginas" aria-label="Páginas"><button class="pag-f" data-accion="pagina" data-clave="' + clave + '" data-valor="' + Math.max(1, p - 1) + '" aria-label="' + t('Página anterior') + '"' + (p === 1 ? ' disabled' : '') + '>‹</button>' +
      '<span>' + nums.join(', ') + '</span><button class="pag-f" data-accion="pagina" data-clave="' + clave + '" data-valor="' + Math.min(total, p + 1) + '" aria-label="' + t('Página siguiente') + '"' + (p === total ? ' disabled' : '') + '>›</button></nav>';
  }
  return { items: lista.slice((p - 1) * porPagina, p * porPagina), nav: nav };
}

function vistaInicio() {
  var filtrado = momento !== 'todo';
  var eventos = deCategoria('eventos').filter(function (l) { return l.evento; }).sort(porUrgencia);
  var agenda = eventos.slice(0, 4);
  var agendaHtml = !agenda.length ? '' : '<section class="bloque"><h2 class="etiqueta">' + t('Agenda') + '</h2>' +
    '<div class="lista-eventos">' + agenda.map(function (l) { return tarjetaEvento(l); }).join('') + '</div>' +
    (eventos.length > agenda.length ? '<a class="ver-todo" href="#/categoria/eventos">' + t('Ver toda la agenda') + '</a>' : '') + '</section>';
  /* Hallazgos: solo los marcados a mano en el panel; primero el más reciente. */
  var nuevos = datos.lugares.filter(vigente).filter(function (l) { return l.hallazgo && !l.evento; }).reverse().slice(0, 3);
  /* Las curiosidades no son una salida: solo se ven con Todo y no entran en el conteo. */
  var sitios = lugaresVigentes().filter(function (l) { return !l.evento && !l.curiosidad; });
  var nEventos = lugaresVigentes().filter(function (l) { return l.evento; }).length;
  var curiosos = datos.lugares.filter(vigente).filter(function (l) { return l.curiosidad; });
  /* El hallazgo más reciente abre la portada en grande; los demás encabezan la grilla de lugares. */
  var destacado = nuevos[0];
  var resto = filtrado ? sitios : nuevos.slice(1).concat(sitios.filter(function (l) { return nuevos.indexOf(l) === -1; }));
  var conteo = (momento === 'noche' ? 'Night Out' : 'Day Out') + ' · ' + sitios.length + (sitios.length === 1 ? t(' lugar') : t(' lugares')) +
    (nEventos ? t(' y ') + nEventos + (nEventos === 1 ? t(' evento') : t(' eventos')) : '');
  var lateral = '<div class="lateral">' + agendaHtml +
    (sitios.length ? '<button class="boton boton-lleno" data-accion="azar">' + svg(ICONOS.azar, 18, 1.8) + '<span>' + t('Sorprendeme con un lugar') + '</span></button>' : '') + '</div>';
  function bloque(titulo, lista, sub) {
    return !lista.length ? '' : '<section class="bloque"><div><h2 class="etiqueta">' + titulo + '</h2>' + (sub ? '<div class="bloque-sub">' + sub + '</div>' : '') + '</div><div class="mosaico">' + lista.map(tarjeta).join('') + '</div></section>';
  }

  /* Portada: 8 lugares; "Ver más" despliega una vez hasta 16; de ahí en más, páginas. */
  var lugaresHtml;
  if (!expandido) {
    lugaresHtml = '<section class="bloque" id="lista-lugares"><h2 class="etiqueta">' + t('Lugares') + '</h2><div class="mosaico">' + resto.slice(0, 8).map(tarjeta).join('') + '</div>' +
      (resto.length > 8 ? '<button class="boton ver-mas" data-accion="ver-mas">' + t('Ver más lugares') + '</button>' : paginado(resto, 'inicio', 16).nav) + '</section>';
  } else {
    var pg = paginado(resto, 'inicio', 16);
    lugaresHtml = '<section class="bloque" id="lista-lugares"><h2 class="etiqueta">' + t('Lugares') + '</h2><div class="mosaico">' + pg.items.map(tarjeta).join('') + '</div>' + pg.nav + '</section>';
  }

  return '<main class="pagina">' +
    '<div class="tope">' + marca() + '<nav class="menu-centro" aria-label="' + t('Índice') + '">' + filtroMomento() +
    '<a class="menu-enlace" href="#/guardados">' + t('Guardados') + '</a>' + idiomas() + '</nav></div>' +
    (filtrado ? '<h1 class="lema conteo">' + conteo + '</h1>' : '<h1 class="lema">' + t('La guía para salir en Tucumán') + '</h1>') +
    (filtrado ? agendaHtml : destacado ?
      '<div class="apertura"><section class="bloque destacado"><h2 class="etiqueta">' + t('Último hallazgo') + '</h2>' + tarjeta(destacado) + '</section>' + lateral + '</div>' : lateral) +
    (resto.length ? lugaresHtml : (filtrado ? '<p class="vacio">' + t('No hay lugares cargados para este momento del día.') + '</p>' : '')) +
    (filtrado || !resto.length ? '' : buscadorZona()) +
    '<div class="final">' +
    (filtrado || !curiosos.length ? '' : '<section class="curiosear"><div><h2 class="curiosear-titulo">' + t('Curiosear') + '</h2><div class="curiosear-sub">' + t('Iniciativas tucumanas que tenés que conocer') + '</div></div>' +
      '<div class="curiosear-lista">' + curiosos.map(function (l, i) {
        l = L(l);
        return '<a class="curiosear-fila" href="#/lugar/' + encodeURIComponent(l.id) + '"><span class="curiosear-num">' + (i < 9 ? '0' : '') + (i + 1) + '</span>' +
          '<span><span class="curiosear-nombre">' + esc(l.nombre) + '</span>' + (l.breve ? '<span class="curiosear-breve">' + esc(l.breve) + '</span>' : '') + '</span>' +
          '<span class="curiosear-flecha" aria-hidden="true">→</span></a>';
      }).join('') + '</div></section>') +
    '<div class="zona"><section class="banda"><div class="banda-cabeza"><div class="banda-texto"><span class="banda-titulo">' + t('Falta algún lugar?') + '</span> <span class="banda-sub">' + t('Contanos cuál y por qué vale la pena.') + '</span></div>' +
    '<button class="boton banda-lleno" data-accion="abrir-buzon" data-tipo="sugerencia">' + t('Sugerir un lugar') + '</button></div></section>' +
    pie(true) + '</div></div>' +
    '</main>' + nav('inicio');
}

function vistaCategoria(id) {
  var c = categoria(id);
  if (!c) return vistaInicio();
  var lista = deCategoria(id);
  if (id === 'eventos') lista.sort(porUrgencia);
  var pg = paginado(lista, 'cat-' + id, 32);
  return '<main class="pagina">' +
    marca() +
    '<div><h1 class="titulo">' + c.nombre + '</h1>' + (c.sub ? '<div class="subtitulo">' + c.sub + '</div>' : '') + '</div>' +
    filtroMomento() +
    (lista.length ? '<div class="lista" id="lista-lugares">' + pg.items.map(tarjeta).join('') + '</div>' + pg.nav : '<p class="vacio">' + (momento === 'todo' ? 'Todavía no hay lugares en esta categoría.' : t('No hay nada cargado para este momento del día. Probá con Todo.')) + '</p>') +
    pie(false) + '</main>' + nav('');
}

function vistaGuardados() {
  var ids = leerGuardados();
  var lista = datos.lugares.filter(vigente).filter(function (l) { return ids.indexOf(l.id) !== -1; });
  return '<main class="pagina">' +
    marca() +
    '<div><h1 class="titulo">' + t('Guardados') + '</h1><div class="subtitulo">' + t('Los lugares que marcaste para ir') + '</div></div>' +
    (lista.length ? '<div class="lista">' + lista.map(tarjeta).join('') + '</div>' : '<p class="vacio">' + t('Todavía no guardaste ningún lugar. Tocá el marcador en la ficha de un lugar para tenerlo acá.') + '</p>') +
    pie(false) + '</main>' + nav('guardados');
}

function vistaLugar(id) {
  var lugar = null;
  datos.lugares.forEach(function (l) { if (l.id === id) lugar = l; });
  if (!lugar || !vigente(lugar)) {
    return '<main class="pagina"><a class="volver" href="#/" aria-label="Volver al inicio">' + svg(ICONOS.volver, 20, 1.8) + '</a>' +
      '<p class="vacio">' + t('Este lugar ya no está disponible.') + '</p></main>' + nav('');
  }
  lugar = L(lugar);
  if (lugar.curiosidad) lugar.sinMapa = true;
  var guardado = leerGuardados().indexOf(lugar.id) !== -1;
  var filas = [
    [t('Tipo'), lugar.tipo], [t('Momento'), lugar.curiosidad ? '' : etiquetaMomento(lugar)], [t('Zona / Barrio'), lugar.zona], [t('Dirección'), lugar.direccion], [t('Precio'), lugar.precio],
    [t('Ideal para'), lugar.idealPara], ['Web', lugar.web], [t('Mail'), lugar.mail], ['Instagram', lugar.instagram], ['WhatsApp', lugar.whatsapp]
  ].filter(function (f) { return f[1]; }).map(function (f) {
    var valor = esc(f[1]);
    if (f[0] === 'Web') valor = '<a class="enlace" target="_blank" rel="noopener" href="https://' + esc(String(f[1]).replace(/^https?:\/\//, '')) + '">' + valor + '</a>';
    if (f[0] === t('Mail')) valor = '<a class="enlace" href="mailto:' + esc(f[1]) + '">' + valor + '</a>';
    if (f[0] === 'Instagram') valor = '<a class="enlace" target="_blank" rel="noopener" href="https://www.instagram.com/' + encodeURIComponent(String(f[1]).replace(/^@/, '')) + '/">' + valor + '</a>';
    if (f[0] === 'WhatsApp') valor = '<a class="enlace" target="_blank" rel="noopener" href="https://wa.me/' + String(f[1]).replace(/\D/g, '') + '">' + valor + '</a>';
    return '<div class="dato"><dt>' + f[0] + '</dt><dd>' + valor + '</dd></div>';
  }).join('');
  var zona = lugar.zona ? ' · ' + esc(lugar.zona) : '';
  var cuando = lugar.evento && lugar.evento.cuando;
  var consulta = [lugar.nombre, lugar.direccion, 'Tucumán'].filter(Boolean).join(', ');
  var todas = [lugar.foto].concat(lugar.galeria || []).filter(Boolean);
  var miniaturas = todas.length < 2 ? '' : todas.map(function (ruta, i) {
    return '<button class="miniatura" data-accion="elegir" data-indice="' + i + '" aria-label="' + t('Ver foto ') + (i + 1) + '"' + (i === 0 ? ' aria-current="true"' : '') + '><img src="' + esc(ruta) + '" alt="" loading="lazy"' + encuadre(lugar, ruta) + '></button>';
  }).join('');
  var fotosBloque = (miniaturas || lugar.credito) ? '<div class="fotos">' +
    (miniaturas ? '<div class="miniaturas">' + miniaturas + '</div>' : '') +
    (lugar.credito ? '<div class="credito">© ' + esc(lugar.credito) + '</div>' : '') + '</div>' : '';
  var pasos = todas.length < 2 ? '' :
    '<div class="contador"><button class="paso" data-accion="paso" data-dir="-1" aria-label="' + t('Foto anterior') + '">' + svg('<path d="M15 5 8 12l7 7"/>', 11, 2) + '</button>' +
    '<span class="contador-n" aria-live="polite">1 / ' + todas.length + '</span>' +
    '<button class="paso" data-accion="paso" data-dir="1" aria-label="' + t('Foto siguiente') + '">' + svg('<path d="m9 5 7 7-7 7"/>', 11, 2) + '</button></div>';

  return '<main' + (lugar.evento ? ' class="evento"' : '') + '>' +
    '<div class="ficha-tope">' + marca() + '<a class="volver-texto" href="#/" data-accion="volver">' + svg(ICONOS.volver, 14, 2) + '<span>' + t('Volver') + '</span></a></div>' +
    '<div class="lado"><div class="tapa">' + (lugar.foto ? '<img src="' + esc(lugar.foto) + '" alt="' + esc(lugar.nombre) + '" data-accion="ver" data-id="' + esc(lugar.id) + '" data-indice="0"' + encuadre(lugar, lugar.foto) + '>' : '') + pasos +
    '<button class="guardar" data-accion="guardar" data-id="' + esc(lugar.id) + '" aria-pressed="' + guardado + '" aria-label="Guardar lugar">' + svg(ICONOS.guardar, 20, 1.8) + '</button>' +
    '</div>' + fotosBloque + '</div>' +
    '<div class="pagina">' +
    '<div class="ficha-cabecera">' + (lugar.evento ? pildora(lugar) : '') + '<div class="ficha-cat">' + esc(nombresCategorias(lugar)) + zona + '</div>' +
    '<h1 class="ficha-nombre">' + nombreCon(lugar) + '</h1>' +
    (cuando ? '<div class="ficha-cuando">' + esc(cuando) + '</div>' : '') +
    (lugar.breve ? '<div class="ficha-breve">' + esc(lugar.breve) + '</div>' : '') + '</div>' +
    '<div class="acciones' + (lugar.sinMapa && !lugar.whatsapp ? ' solo' : '') + '">' +
    '<a class="boton boton-lleno" target="_blank" rel="noopener" href="' + (lugar.sinMapa && lugar.whatsapp
      ? 'https://wa.me/' + String(lugar.whatsapp).replace(/\D/g, '') + '?text=' + encodeURIComponent(t('Hola, quisiera saber cómo llegar a ') + lugar.nombre + '.')
      : 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(consulta)) + '">' + svg(ICONOS.mapa, 18, 1.8) + '<span>' + t('Cómo llegar') + '</span></a>' +
    '<button class="boton" data-accion="compartir" data-nombre="' + esc(lugar.nombre) + '">' + svg(ICONOS.compartir, 18, 1.8) + '<span>' + t('Compartir') + '</span></button>' +
    '</div>' +
    (lugar.favorito ? leyendaFavorito() : '') +
    (filas ? '<dl class="datos">' + filas + '</dl>' : '') +
    (lugar.texto ? '<section class="bloque con-raya"><h2 class="etiqueta">' + (lugar.evento ? 'De qué se trata' : t('Por qué ir')) + '</h2><div class="texto">' + esc(lugar.texto) + '</div></section>' : '') +
    (lugar.practico ? '<section class="bloque con-raya"><h2 class="etiqueta">' + t('Datos prácticos') + '</h2><div class="texto">' + esc(lugar.practico) + '</div></section>' : '') +
    '<section class="fuiste"><div class="fuiste-cabeza"><div class="fuiste-titulo">' + t('Ya fuiste?') + '</div>' +
    '<button class="boton boton-chico" data-accion="abrir-buzon" data-tipo="resena" data-lugar="' + esc(lugar.nombre) + '">' + t('Dejar reseña') + '</button></div></section>' +
    '</div></main><div class="fuera">' + pie(false) + '</div>' + nav('');
}

/* Visor de fotos a pantalla completa: se pasan deslizando. */
function abrirVisor(id, indice) {
  var lugar = null;
  datos.lugares.forEach(function (l) { if (l.id === id) lugar = l; });
  if (!lugar) return;
  var fotos = [lugar.foto].concat(lugar.galeria || []).filter(Boolean);
  if (!fotos.length) return;
  var visor = document.createElement('div');
  visor.className = 'visor';
  visor.setAttribute('role', 'dialog');
  visor.setAttribute('aria-modal', 'true');
  visor.setAttribute('aria-label', 'Fotos de ' + lugar.nombre);
  visor.innerHTML = '<div class="visor-pista">' + fotos.map(function (ruta) {
    return '<div class="visor-foto"><img src="' + esc(ruta) + '" alt=""></div>';
  }).join('') + '</div><button class="visor-cerrar" aria-label="Cerrar fotos">' +
    svg('<path d="M6 6l12 12"/><path d="M18 6 6 18"/>', 20, 1.8) + '</button>';
  function cerrar() { visor.remove(); document.removeEventListener('keydown', tecla); document.body.style.overflow = ''; }
  function tecla(ev) { if (ev.key === 'Escape') cerrar(); }
  visor.querySelector('.visor-cerrar').addEventListener('click', cerrar);
  document.addEventListener('keydown', tecla);
  document.body.style.overflow = 'hidden';
  document.body.appendChild(visor);
  var pista = visor.querySelector('.visor-pista');
  pista.scrollLeft = pista.clientWidth * indice;
  visor.querySelector('.visor-cerrar').focus();
}

function pintar() {
  var partes = location.hash.replace(/^#\/?/, '').split('/');
  var html;
  if (partes[0] === 'categoria') html = vistaCategoria(partes[1]);
  else if (partes[0] === 'lugar') html = vistaLugar(decodeURIComponent(partes[1] || ''));
  else if (partes[0] === 'zona') html = vistaZona(partes[1]);
  else if (partes[0] === 'guardados') html = vistaGuardados();
  else html = vistaInicio();
  document.body.classList.toggle('noche', momento === 'noche');
  document.body.classList.remove('indice-abierto');
  app.innerHTML = html;
  window.scrollTo(0, 0);
}

/* Formulario emergente de sugerencias y reseñas. */
function abrirBuzon(tipo, lugar) {
  var esResena = tipo === 'resena';
  var v = document.createElement('div');
  v.className = 'ventana';
  v.setAttribute('role', 'dialog');
  v.setAttribute('aria-modal', 'true');
  function cerrar() { v.remove(); document.removeEventListener('keydown', tecla); document.body.style.overflow = ''; }
  function tecla(ev) { if (ev.key === 'Escape') cerrar(); }
  function armar() {
    v.innerHTML = '<div class="caja"><button class="caja-x" type="button" aria-label="' + t('Cerrar') + '">' + svg('<path d="M6 6l12 12"/><path d="M18 6 6 18"/>', 18, 1.8) + '</button>' +
      '<h3 class="caja-titulo">' + (esResena ? t('Dejar reseña') : t('Sugerir un lugar')) + '</h3><p class="caja-sub">' + (esResena ? esc(lugar) : t('Contanos cuál y por qué vale la pena.')) + '</p>' +
      buzon(tipo, esResena ? lugar : '') + '</div>';
    v.querySelector('.caja-x').addEventListener('click', cerrar);
    var f = v.querySelector('.buzon');
    f.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var estado = f.querySelector('.buzon-estado'), boton = f.querySelector('.buzon-enviar');
      var nombre = f.getAttribute('data-lugar') || (f.elements.lugar ? f.elements.lugar.value.trim() : '');
      var mensaje = f.elements.mensaje.value.trim();
      if (!nombre || !mensaje) { estado.textContent = t('Completá los campos para enviar.'); return; }
      var envio = new URLSearchParams({ tipo: tipo, lugar: nombre, mensaje: mensaje, contacto: f.elements.contacto.value.trim(), idioma: idioma, web: f.elements.web.value });
      boton.disabled = true;
      estado.textContent = t('Enviando…');
      fetch(BUZON, { method: 'POST', mode: 'no-cors', body: envio }).then(function () {
        v.querySelector('.caja').innerHTML = '<button class="caja-x" type="button" aria-label="' + t('Cerrar') + '">' + svg('<path d="M6 6l12 12"/><path d="M18 6 6 18"/>', 18, 1.8) + '</button>' +
          '<h3 class="caja-titulo" role="status">' + (esResena ? t('Gracias! Hemos recibido tu reseña exitosamente.') : t('Gracias! Hemos recibido tu sugerencia exitosamente.')) + '</h3>' +
          '<button class="boton caja-otra" type="button">' + (esResena ? t('Dejar otra reseña') : t('Dejar otra sugerencia')) + '</button>';
        v.querySelector('.caja-x').addEventListener('click', cerrar);
        v.querySelector('.caja-otra').addEventListener('click', armar);
      }).catch(function () {
        boton.disabled = false;
        estado.textContent = t('No se pudo enviar. Probá de nuevo o escribinos por WhatsApp.');
      });
    });
    var primero = f.querySelector('input:not(.trampa), textarea');
    if (primero) primero.focus();
  }
  v.addEventListener('click', function (ev) { if (ev.target === v) cerrar(); });
  document.addEventListener('keydown', tecla);
  document.body.style.overflow = 'hidden';
  document.body.appendChild(v);
  armar();
}

app.addEventListener('click', function (ev) {
  var el = ev.target.closest('[data-accion]');
  if (!el) return;
  var accion = el.getAttribute('data-accion');
  if (accion === 'abrir-buzon') { ev.preventDefault(); document.body.classList.remove('indice-abierto'); abrirBuzon(el.getAttribute('data-tipo'), el.getAttribute('data-lugar') || ''); return; }
  if (accion === 'ver-mas' || accion === 'pagina') {
    var antes = window.scrollY;
    if (accion === 'ver-mas') expandido = true; else paginas[el.getAttribute('data-clave')] = Number(el.getAttribute('data-valor'));
    pintar();
    var destino = document.getElementById('lista-lugares');
    if (accion === 'ver-mas' || !destino) window.scrollTo(0, antes); else window.scrollTo(0, destino.getBoundingClientRect().top + window.scrollY - 110);
    return;
  }
  if (accion === 'menu') { document.body.classList.add('indice-abierto'); return; }
  if (accion === 'cerrar-menu') { document.body.classList.remove('indice-abierto'); return; }
  if (accion === 'inicio') { document.body.classList.remove('indice-abierto'); window.scrollTo(0, 0); return; }
  if (accion === 'idioma') {
    try { localStorage.setItem('hangout-idioma', el.getAttribute('data-valor')); } catch (e) { /* sin almacenamiento */ }
    location.reload();
    return;
  }
  if (accion === 'azar') {
    var lista = datos.lugares.filter(vigente).filter(function (l) { return !l.curiosidad; });
    if (lista.length) location.hash = '#/lugar/' + encodeURIComponent(lista[Math.floor(Math.random() * lista.length)].id);
  } else if (accion === 'volver') {
    if (history.length > 1) { ev.preventDefault(); history.back(); }
  } else if (accion === 'momento') {
    momento = el.getAttribute('data-valor');
    paginas = {}; expandido = false;
    try { localStorage.setItem('dayout-momento', momento); } catch (e) { /* sin almacenamiento */ }
    var arriba = window.scrollY;
    pintar();
    window.scrollTo(0, arriba);
  } else if (accion === 'paso' || accion === 'elegir') {
    var grande = document.querySelector('.tapa img');
    var minis = Array.prototype.slice.call(document.querySelectorAll('.miniatura'));
    if (!grande || !minis.length) return;
    var actual = Number(grande.getAttribute('data-indice')) || 0;
    var nuevo = accion === 'elegir' ? Number(el.getAttribute('data-indice')) : (actual + Number(el.getAttribute('data-dir')) + minis.length) % minis.length;
    grande.src = minis[nuevo].querySelector('img').src;
    grande.style.objectPosition = minis[nuevo].querySelector('img').style.objectPosition;
    grande.setAttribute('data-indice', nuevo);
    var cuenta = document.querySelector('.contador-n');
    if (cuenta) cuenta.textContent = (nuevo + 1) + ' / ' + minis.length;
    minis.forEach(function (m, i) { if (i === nuevo) m.setAttribute('aria-current', 'true'); else m.removeAttribute('aria-current'); });
    var pista = minis[nuevo].parentNode;
    pista.scrollLeft = minis[nuevo].offsetLeft - pista.offsetLeft - (pista.clientWidth - minis[nuevo].offsetWidth) / 2;
  } else if (accion === 'ver') {
    abrirVisor(el.getAttribute('data-id'), Number(el.getAttribute('data-indice')) || 0);
  } else if (accion === 'guardar') {
    var ahora = alternarGuardado(el.getAttribute('data-id'));
    el.setAttribute('aria-pressed', String(ahora));
    aviso(ahora ? 'Guardado' : t('Quitado de guardados'));
  } else if (accion === 'compartir') {
    var info = { title: el.getAttribute('data-nombre') + ' · Hang Out Tucumán', url: location.href };
    if (navigator.share) navigator.share(info).catch(function () {});
    else if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(function () { aviso(t('Enlace copiado')); });
  }
});

window.addEventListener('hashchange', pintar);
document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') document.body.classList.remove('indice-abierto'); });

fetch('data/lugares.json', { cache: 'no-cache' })
  .then(function (r) { return r.json(); })
  .then(function (json) { datos = { config: json.config || {}, lugares: json.lugares || [] }; })
  .catch(function () { /* sin conexión y sin copia guardada: se muestra la guía vacía */ })
  .then(pintar);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(function () {});
}
