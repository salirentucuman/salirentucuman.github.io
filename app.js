/* Hang Out Tucumán: aplicación. El contenido vive en data/lugares.json */

var CATEGORIAS = [
  { id: 'comer', nombre: 'Café y copas', sub: 'Cafés, bares, pastelerías',
    icono: '<path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 3v3"/><path d="M12 3v3"/>' },
  { id: 'pasear', nombre: 'Pasear', sub: 'Parques, callecitas, rincones',
    icono: '<path d="M12 3 6 12h3l-4 6h14l-4-6h3z"/><path d="M12 18v3"/>' },
  { id: 'curiosear', nombre: 'Curiosear', sub: 'Librerías, tiendas, cultura',
    icono: '<path d="M12 6c-2-1.5-5-2-8-1.5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-13c-3-.5-6 0-8 1.5z"/><path d="M12 6v13"/>' },
  { id: 'barrio', nombre: 'De barrio', sub: 'Productores locales o tiendas de barrio destacadas',
    icono: '<path d="M4 10 5.5 4h13L20 10"/><path d="M4 10h16"/><path d="M5.5 10v10h13V10"/><path d="M10 20v-5h4v5"/>' },
  { id: 'eventos', nombre: 'Eventos', sub: 'Ferias, música, muestras',
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
var MOMENTOS = [['todo', 'Todo'], ['dia', 'Day Out'], ['noche', 'Night Out']];
var momento = 'todo';
try { momento = localStorage.getItem('dayout-momento') || 'todo'; } catch (e) { /* sin almacenamiento */ }

function coincide(lugar) {
  if (momento === 'todo') return true;
  var m = lugar.momento || 'ambos';
  return m === 'ambos' || m === momento;
}

function etiquetaMomento(lugar) {
  return { dia: 'De día', noche: 'De noche', ambos: 'De día y de noche' }[lugar.momento] || '';
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

function nombresCategorias(lugar) {
  return (lugar.categorias || []).map(function (id) {
    var c = categoria(id);
    return c ? c.nombre : '';
  }).filter(Boolean).join(' · ');
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
  if (lugar.foto) return '<img class="' + clase + '" src="' + esc(lugar.foto) + '" alt="" loading="lazy">';
  return '<div class="' + clase + '"></div>';
}

/* Estado de un evento: marca la urgencia según la fecha de hoy. */
function estadoEvento(lugar) {
  var ev = lugar.evento || {}, ahora = Date.now(), dia = 86400000;
  var inicio = ev.inicio ? new Date(ev.inicio).getTime() : NaN;
  var fin = ev.fin ? new Date(ev.fin).getTime() : NaN;
  if (!isNaN(inicio) && ahora < inicio) {
    if (new Date(inicio).toDateString() === new Date().toDateString()) return { vivo: false, texto: 'Empieza hoy' };
    var faltan = Math.ceil((inicio - ahora) / dia);
    return { vivo: false, texto: faltan <= 1 ? 'Empieza mañana' : 'Empieza en ' + faltan + ' días' };
  }
  if (isNaN(fin)) return { vivo: false, texto: 'Se repite' };
  var quedan = Math.ceil((fin - ahora) / dia);
  if (quedan <= 1) return { vivo: true, texto: 'Termina hoy' };
  if (quedan <= 2) return { vivo: true, texto: 'Últimos días' };
  return { vivo: true, texto: 'Está pasando · quedan ' + quedan + ' días' };
}

function pildora(lugar) {
  var e = estadoEvento(lugar);
  return '<div class="pildora"><span class="punto' + (e.vivo ? ' vivo' : '') + '"></span>' + e.texto + '</div>';
}

function tarjetaEvento(lugar) {
  var cuando = lugar.evento && lugar.evento.cuando;
  return '<a class="tarjeta-evento" href="#/lugar/' + encodeURIComponent(lugar.id) + '">' +
    (lugar.foto ? '<img class="tarjeta-evento-foto" src="' + esc(lugar.foto) + '" alt="" loading="lazy">' : '') +
    '<div class="tarjeta-evento-texto">' + pildora(lugar) +
    '<div class="tarjeta-evento-nombre">' + esc(lugar.nombre) + '</div>' +
    (cuando ? '<div class="tarjeta-evento-cuando">' + esc(cuando) + '</div>' : '') +
    '</div></a>';
}

function tarjeta(lugar) {
  if (lugar.evento) return tarjetaEvento(lugar);
  return '<a class="tarjeta" href="#/lugar/' + encodeURIComponent(lugar.id) + '">' +
    foto(lugar, 'tarjeta-foto') +
    '<div class="tarjeta-texto">' +
    '<div class="tarjeta-cat">' + esc(nombresCategorias(lugar)) + '</div>' +
    '<div class="tarjeta-nombre">' + esc(lugar.nombre) + '</div>' +
    (lugar.breve ? '<div class="tarjeta-breve">' + esc(lugar.breve) + '</div>' : '') +
    '</div></a>';
}

function nav(actual) {
  function item(ruta, id, icono, texto) {
    return '<a href="' + ruta + '"' + (actual === id ? ' aria-current="page"' : '') + '>' + svg(icono, 22, 1.8) + '<span>' + texto + '</span></a>';
  }
  return '<nav class="nav" aria-label="Principal"><div class="nav-interior">' +
    item('#/', 'inicio', ICONOS.inicio, 'Inicio') +
    item('#/guardados', 'guardados', ICONOS.guardar, 'Guardados') +
    '</div></nav>';
}

function vistaInicio() {
  var visibles = CATEGORIAS.filter(function (c) { return c.id !== 'eventos' || deCategoria('eventos').length > 0; });
  var impar = visibles.length % 2 === 1;
  var cats = visibles.map(function (c, i) {
    var ancha = impar && i === visibles.length - 1;
    return '<a class="categoria' + (ancha ? ' ancha' : '') + '" href="#/categoria/' + c.id + '">' + svg(c.icono, 22) +
      '<span><span class="categoria-nombre">' + c.nombre + '</span><span class="categoria-sub">' + c.sub + '</span></span></a>';
  }).join('');

  var agenda = deCategoria('eventos').filter(function (l) { return l.evento; });
  /* Hallazgos: el último lugar y el último evento cargados. */
  var visibles2 = lugaresVigentes();
  var ultimoLugar = visibles2.filter(function (l) { return !l.evento; }).pop();
  var ultimoEvento = visibles2.filter(function (l) { return l.evento; }).pop();
  var nuevos = [ultimoLugar, ultimoEvento].filter(Boolean);

  var hayLugares = datos.lugares.filter(vigente).length > 0;

  return '<main class="pagina">' +
    '<div class="marca"><div class="marca-nombre">Hang Out</div><div class="marca-ciudad">Tucumán</div></div>' +
    '<h1 class="lema">¡La guía para salir en Tucumán, seas residente o turista!</h1>' +
    filtroMomento() +
    (agenda.length ? '<section class="bloque"><h2 class="etiqueta">Agenda</h2><div class="lista">' + agenda.map(tarjetaEvento).join('') + '</div></section>' : '') +
    '<section class="bloque"><h2 class="etiqueta">Categorías</h2><div class="categorias">' + cats + '</div></section>' +
    (nuevos.length ? '<section class="bloque"><h2 class="etiqueta">Hallazgos</h2><div class="lista">' + nuevos.map(tarjeta).join('') + '</div></section>' : '') +
    (hayLugares ? '<button class="boton boton-lleno boton-grande" data-accion="azar">' + svg(ICONOS.azar, 20, 1.8) + '<span>Sorprendeme con un lugar</span></button>' : '') +
    '<section class="sugerir"><div class="sugerir-titulo">¿Falta algún lugar?</div>' +
    '<a class="boton" target="_blank" rel="noopener" href="' + esc(whatsapp('Hola, te sugiero un lugar para Hang Out Tucumán: ')) + '">' + svg(ICONOS.chat, 18, 1.8) + '<span>Sugerilo por WhatsApp</span></a></section>' +
    '<section class="cierre">' +
    '<p>Hang Out Tucumán no es un directorio ni pretende reunirlo todo. Es una selección de aquellos sitios que nos gustan especialmente. Un café de nicho, una librería, un productor de queso de barrio, un rincón perfecto para leer en un parque.</p>' +
    '<p>Hang Out Tucumán es una invitación a ir a los mejores lugares y a ser turista en tu ciudad, o a recorrer San Miguel de Tucumán y Yerba Buena con el criterio de un local para quien está de visita.</p>' +
    '<p>Hang Out Tucumán es autofinanciado, no es un sitio de publicidad. Un lugar aparece porque fuimos, y porque volveríamos.</p>' +
    '<p>Si conocés los sitios destacados aquí, ¡nos gustaría saber qué te parecen! Dejanos tu reseña por privado.</p>' +
    '<p>Si conocés un sitio que creés que merece ser parte de esta selección, ¡avisanos!</p>' +
    '</section>' +
    '</main>' + nav('inicio');
}

function vistaCategoria(id) {
  var c = categoria(id);
  if (!c) return vistaInicio();
  var lista = deCategoria(id);
  return '<main class="pagina">' +
    '<a class="volver" href="#/" aria-label="Volver al inicio">' + svg(ICONOS.volver, 20, 1.8) + '</a>' +
    '<div><h1 class="titulo">' + c.nombre + '</h1><div class="subtitulo">' + c.sub + '</div></div>' +
    filtroMomento() +
    (lista.length ? '<div class="lista">' + lista.map(tarjeta).join('') + '</div>' : '<p class="vacio">' + (momento === 'todo' ? 'Todavía no hay lugares en esta categoría.' : 'No hay nada cargado para este momento del día. Probá con Todo.') + '</p>') +
    '</main>' + nav('');
}

function vistaGuardados() {
  var ids = leerGuardados();
  var lista = datos.lugares.filter(vigente).filter(function (l) { return ids.indexOf(l.id) !== -1; });
  return '<main class="pagina">' +
    '<div><h1 class="titulo">Guardados</h1><div class="subtitulo">Los lugares que marcaste para ir</div></div>' +
    (lista.length ? '<div class="lista">' + lista.map(tarjeta).join('') + '</div>' : '<p class="vacio">Todavía no guardaste ningún lugar. Tocá el marcador en la ficha de un lugar para tenerlo acá.</p>') +
    '</main>' + nav('guardados');
}

function vistaLugar(id) {
  var lugar = null;
  datos.lugares.forEach(function (l) { if (l.id === id) lugar = l; });
  if (!lugar || !vigente(lugar)) {
    return '<main class="pagina"><a class="volver" href="#/" aria-label="Volver al inicio">' + svg(ICONOS.volver, 20, 1.8) + '</a>' +
      '<p class="vacio">Este lugar ya no está disponible.</p></main>' + nav('');
  }
  var guardado = leerGuardados().indexOf(lugar.id) !== -1;
  var filas = [
    ['Tipo', lugar.tipo], ['Momento', etiquetaMomento(lugar)], ['Dirección', lugar.direccion], ['Precio', lugar.precio],
    ['Ideal para', lugar.idealPara], ['Instagram', lugar.instagram], ['WhatsApp', lugar.whatsapp]
  ].filter(function (f) { return f[1]; }).map(function (f) {
    var valor = esc(f[1]);
    if (f[0] === 'Instagram') valor = '<a class="enlace" target="_blank" rel="noopener" href="https://www.instagram.com/' + encodeURIComponent(String(f[1]).replace(/^@/, '')) + '/">' + valor + '</a>';
    if (f[0] === 'WhatsApp') valor = '<a class="enlace" target="_blank" rel="noopener" href="https://wa.me/' + String(f[1]).replace(/\D/g, '') + '">' + valor + '</a>';
    return '<div class="dato"><dt>' + f[0] + '</dt><dd>' + valor + '</dd></div>';
  }).join('');
  var zona = lugar.zona ? ' · ' + esc(lugar.zona) : '';
  var cuando = lugar.evento && lugar.evento.cuando;
  var consulta = [lugar.nombre, lugar.direccion, 'Tucumán'].filter(Boolean).join(', ');
  var galeria = (lugar.galeria || []).filter(Boolean);
  var desfase = lugar.foto ? 1 : 0;
  var miniaturas = galeria.map(function (ruta, i) {
    return '<button class="miniatura" data-accion="ver" data-id="' + esc(lugar.id) + '" data-indice="' + (i + desfase) + '" aria-label="Ver foto ' + (i + 1 + desfase) + '"><img src="' + esc(ruta) + '" alt="" loading="lazy"></button>';
  }).join('');
  var fotosBloque = (miniaturas || lugar.credito) ? '<div class="fotos">' +
    (miniaturas ? '<div class="miniaturas">' + miniaturas + '</div>' : '') +
    (lugar.credito ? '<div class="credito">Fotos: ' + esc(lugar.credito) + '</div>' : '') + '</div>' : '';

  return '<main' + (lugar.evento ? ' class="evento"' : '') + '>' +
    '<div class="tapa">' + (lugar.foto ? '<img src="' + esc(lugar.foto) + '" alt="' + esc(lugar.nombre) + '" data-accion="ver" data-id="' + esc(lugar.id) + '" data-indice="0">' : '') +
    '<a class="volver" href="#/" data-accion="volver" aria-label="Volver">' + svg(ICONOS.volver, 20, 1.8) + '</a>' +
    '<button class="guardar" data-accion="guardar" data-id="' + esc(lugar.id) + '" aria-pressed="' + guardado + '" aria-label="Guardar lugar">' + svg(ICONOS.guardar, 20, 1.8) + '</button>' +
    '</div>' +
    '<div class="pagina">' + fotosBloque +
    '<div class="ficha-cabecera">' + (lugar.evento ? pildora(lugar) : '') + '<div class="ficha-cat">' + esc(nombresCategorias(lugar)) + zona + '</div>' +
    '<h1 class="ficha-nombre">' + esc(lugar.nombre) + '</h1>' +
    (cuando ? '<div class="ficha-cuando">' + esc(cuando) + '</div>' : '') +
    (lugar.breve ? '<div class="ficha-breve">' + esc(lugar.breve) + '</div>' : '') + '</div>' +
    '<div class="acciones">' +
    '<a class="boton boton-lleno" target="_blank" rel="noopener" href="' + (lugar.sinMapa && lugar.whatsapp
      ? 'https://wa.me/' + String(lugar.whatsapp).replace(/\D/g, '') + '?text=' + encodeURIComponent('Hola, quisiera saber cómo llegar a ' + lugar.nombre + '.')
      : 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(consulta)) + '">' + svg(ICONOS.mapa, 18, 1.8) + '<span>Cómo llegar</span></a>' +
    '<button class="boton" data-accion="compartir" data-nombre="' + esc(lugar.nombre) + '">' + svg(ICONOS.compartir, 18, 1.8) + '<span>Compartir</span></button>' +
    '</div>' +
    (filas ? '<dl class="datos">' + filas + '</dl>' : '') +
    (lugar.texto ? '<section class="bloque"><h2 class="etiqueta">' + (lugar.evento ? 'De qué se trata' : 'Por qué ir') + '</h2><div class="texto">' + esc(lugar.texto) + '</div></section>' : '') +
    '<div class="fuiste"><div class="fuiste-titulo">¿Ya fuiste?</div>' +
    '<a class="boton boton-chico" target="_blank" rel="noopener" href="' + esc(whatsapp('Mi reseña de ' + lugar.nombre + ' para Hang Out Tucumán: ')) + '">Dejar reseña</a></div>' +
    '</div></main>' + nav('');
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
  else if (partes[0] === 'guardados') html = vistaGuardados();
  else html = vistaInicio();
  app.innerHTML = html;
  window.scrollTo(0, 0);
}

app.addEventListener('click', function (ev) {
  var el = ev.target.closest('[data-accion]');
  if (!el) return;
  var accion = el.getAttribute('data-accion');
  if (accion === 'azar') {
    var lista = datos.lugares.filter(vigente);
    if (lista.length) location.hash = '#/lugar/' + encodeURIComponent(lista[Math.floor(Math.random() * lista.length)].id);
  } else if (accion === 'volver') {
    if (history.length > 1) { ev.preventDefault(); history.back(); }
  } else if (accion === 'momento') {
    momento = el.getAttribute('data-valor');
    try { localStorage.setItem('dayout-momento', momento); } catch (e) { /* sin almacenamiento */ }
    var arriba = window.scrollY;
    pintar();
    window.scrollTo(0, arriba);
  } else if (accion === 'ver') {
    abrirVisor(el.getAttribute('data-id'), Number(el.getAttribute('data-indice')) || 0);
  } else if (accion === 'guardar') {
    var ahora = alternarGuardado(el.getAttribute('data-id'));
    el.setAttribute('aria-pressed', String(ahora));
    aviso(ahora ? 'Guardado' : 'Quitado de guardados');
  } else if (accion === 'compartir') {
    var info = { title: el.getAttribute('data-nombre') + ' · Hang Out Tucumán', url: location.href };
    if (navigator.share) navigator.share(info).catch(function () {});
    else if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(function () { aviso('Enlace copiado'); });
  }
});

window.addEventListener('hashchange', pintar);

fetch('data/lugares.json', { cache: 'no-cache' })
  .then(function (r) { return r.json(); })
  .then(function (json) { datos = { config: json.config || {}, lugares: json.lugares || [] }; })
  .catch(function () { /* sin conexión y sin copia guardada: se muestra la guía vacía */ })
  .then(pintar);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(function () {});
}
