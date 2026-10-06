/* Panel privado: publica sitios y eventos escribiendo data/lugares.json y fotos/ en el repositorio de GitHub. */

var CATEGORIAS = [
  ['comer', 'Café y copas'], ['restaurantes', 'Restaurantes y bodegones'], ['pasear', 'Pasear'],
  ['curiosear', 'Curiosear'], ['barrio', 'De barrio']
];
var CAMPOS = ['nombre', 'tipo', 'zona', 'direccion', 'whatsapp', 'web', 'mail', 'instagram', 'breve', 'texto', 'precio', 'credito'];
var ARCHIVO = 'data/lugares.json';
var REPO = 'salirentucuman/salirentucuman.github.io';

var datos = null;
var fotos = [];   /* { ruta } para las ya publicadas, { archivo, vista } para las nuevas */
var portada = 0;
var $ = function (id) { return document.getElementById(id); };

function guardado(clave) { try { return localStorage.getItem(clave) || ''; } catch (e) { return ''; } }
function recordar(clave, valor) { try { localStorage.setItem(clave, valor); } catch (e) { /* sin almacenamiento */ } }

function estado(texto, error, id) {
  var el = $(id || 'estado');
  el.textContent = texto;
  el.className = 'estado' + (error ? ' error' : '');
}

function aBase64(texto) {
  var bytes = new TextEncoder().encode(texto), binario = '';
  for (var i = 0; i < bytes.length; i++) binario += String.fromCharCode(bytes[i]);
  return btoa(binario);
}
function deBase64(b64) {
  var binario = atob(b64.replace(/\s/g, '')), bytes = new Uint8Array(binario.length);
  for (var i = 0; i < binario.length; i++) bytes[i] = binario.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function api(ruta, opciones) {
  opciones = opciones || {};
  opciones.headers = { 'Authorization': 'Bearer ' + $('token').value.trim(), 'Accept': 'application/vnd.github+json' };
  return fetch('https://api.github.com/repos/' + $('repo').value.trim() + '/contents/' + ruta, opciones).then(function (r) {
    if (!r.ok) throw new Error(r.status === 401 || r.status === 403 ? 'La clave no es válida o no tiene permiso.' : r.status === 404 ? 'No se encontró el repositorio o el archivo.' : r.status === 409 ? 'Alguien más guardó cambios recién. Probá de nuevo.' : 'GitHub respondió con un error (' + r.status + ').');
    return r.json();
  });
}

/* Lee siempre la versión más reciente, para no pisar lo que se haya cargado por otra vía. */
function leer() {
  return api(ARCHIVO + '?t=' + Date.now(), { cache: 'no-store' }).then(function (archivo) {
    var json = JSON.parse(deBase64(archivo.content));
    return { sha: archivo.sha, json: { config: json.config || {}, lugares: json.lugares || [] } };
  });
}
function escribir(json, sha, mensaje) {
  return api(ARCHIVO, { method: 'PUT', body: JSON.stringify({ message: mensaje, content: aBase64(JSON.stringify(json, null, 2) + '\n'), sha: sha }) });
}

function slug(texto) {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/* Lleva la foto a 1600 px de ancho como máximo y la pasa a JPG. */
function prepararFoto(archivo) {
  return new Promise(function (resolver, rechazar) {
    var img = new Image();
    img.onload = function () {
      var escala = Math.min(1, 1600 / img.width);
      var lienzo = document.createElement('canvas');
      lienzo.width = Math.round(img.width * escala);
      lienzo.height = Math.round(img.height * escala);
      lienzo.getContext('2d').drawImage(img, 0, 0, lienzo.width, lienzo.height);
      URL.revokeObjectURL(img.src);
      resolver(lienzo.toDataURL('image/jpeg', 0.82).split(',')[1]);
    };
    img.onerror = function () { rechazar(new Error('No se pudo leer una de las fotos.')); };
    img.src = URL.createObjectURL(archivo);
  });
}

function opciones(select, primera) {
  select.innerHTML = (primera ? '<option value="">' + primera + '</option>' : '') + CATEGORIAS.map(function (c) {
    return '<option value="' + c[0] + '">' + c[1] + '</option>';
  }).join('');
}

function pintarFotos() {
  if (portada >= fotos.length) portada = 0;
  $('galeria').innerHTML = fotos.map(function (f, i) {
    return '<div class="foto' + (i === portada ? ' es-portada' : '') + '">' +
      '<img src="' + (f.vista || f.ruta) + '" alt="">' +
      '<button type="button" class="quitar" data-quitar="' + i + '" aria-label="Quitar foto ' + (i + 1) + '">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6 6 18"/></svg></button>' +
      '<label><input type="radio" name="portada" value="' + i + '"' + (i === portada ? ' checked' : '') + '>Portada</label></div>';
  }).join('');
}

function ajustarClase() {
  var evento = $('clase').value === 'evento';
  document.querySelectorAll('.solo-evento').forEach(function (el) { el.hidden = !evento; });
  $('campo-cat2').hidden = evento;
  $('rotulo-cat1').textContent = evento ? 'Además de Eventos, aparece en (opcional)' : 'Categoría';
  var previa = $('cat1').value;
  opciones($('cat1'), evento ? 'Solo en Eventos' : 'Elegí una categoría');
  $('cat1').value = previa;
  $('rotulo-texto').textContent = evento ? 'De qué se trata' : 'Por qué ir';
}

function llenarSelector() {
  var sel = $('elegir');
  sel.innerHTML = '<option value="">Nueva ficha</option>';
  datos.lugares.forEach(function (l) {
    var op = document.createElement('option');
    op.value = l.id;
    op.textContent = 'Editar: ' + l.nombre;
    sel.appendChild(op);
  });
}

function buscar(id) {
  for (var i = 0; i < datos.lugares.length; i++) if (datos.lugares[i].id === id) return datos.lugares[i];
  return null;
}

function fechaLocal(iso) {
  var f = iso ? new Date(iso) : null;
  return f && !isNaN(f.getTime()) ? new Date(f.getTime() - f.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : '';
}

function cargarFormulario(lugar) {
  lugar = lugar || {};
  CAMPOS.forEach(function (c) { $(c).value = lugar[c] || ''; });
  var cats = (lugar.categorias || []).filter(function (c) { return c !== 'eventos'; });
  var esEvento = !!lugar.evento || (lugar.categorias || []).indexOf('eventos') !== -1;
  $('clase').value = esEvento ? 'evento' : 'sitio';
  ajustarClase();
  $('cat1').value = cats[0] || '';
  $('cat2').value = cats[1] || '';
  $('momento').value = lugar.momento || 'dia';
  $('favorito').checked = !!lugar.favorito;
  var ev = lugar.evento || {};
  $('cuando').value = ev.cuando || '';
  $('inicio').value = fechaLocal(ev.inicio);
  $('fin').value = fechaLocal(ev.fin);
  fotos = [lugar.foto].concat(lugar.galeria || []).filter(Boolean).map(function (r) { return { ruta: r }; });
  portada = 0;
  $('fotos').value = '';
  pintarFotos();
  $('borrar').hidden = !lugar.id;
  $('publicar').textContent = lugar.id ? 'Guardar cambios' : 'Publicar';
  estado('');
}

function entrar() {
  estado('Conectando…', false, 'estado-acceso');
  leer().then(function (actual) {
    datos = actual.json;
    recordar('dayout-token', $('token').value.trim());
    recordar('dayout-repo', $('repo').value.trim());
    $('acceso').hidden = true;
    $('formulario').hidden = false;
    llenarSelector();
    cargarFormulario(null);
  }).catch(function (e) { estado(e.message, true, 'estado-acceso'); });
}

function publicar(ev) {
  ev.preventDefault();
  var idActual = $('elegir').value;
  var nombre = $('nombre').value.trim();
  var esEvento = $('clase').value === 'evento';
  var cats = esEvento ? ['eventos'] : [];
  if ($('cat1').value) cats.push($('cat1').value);
  if (!esEvento && $('cat2').value && cats.indexOf($('cat2').value) === -1) cats.push($('cat2').value);
  if (!nombre) return estado('Falta el nombre.', true);
  if (!cats.length) return estado('Elegí una categoría.', true);
  if (esEvento && !$('cuando').value.trim()) return estado('Falta indicar cuándo es el evento.', true);

  $('publicar').disabled = true;
  var id = idActual || slug(nombre) || 'ficha';
  var nuevas = fotos.filter(function (f) { return f.archivo; });
  var hechas = 0;

  var subir = nuevas.reduce(function (cadena, f) {
    return cadena.then(function () {
      estado('Subiendo foto ' + (hechas + 1) + ' de ' + nuevas.length + '…');
      return prepararFoto(f.archivo);
    }).then(function (b64) {
      var ruta = 'fotos/' + id + '-' + Date.now() + '-' + (hechas + 1) + '.jpg';
      return api(ruta, { method: 'PUT', body: JSON.stringify({ message: 'Foto de ' + nombre, content: b64 }) }).then(function () {
        f.ruta = ruta; delete f.archivo; hechas++;
      });
    });
  }, Promise.resolve());

  subir.then(function () {
    estado('Publicando…');
    return leer();
  }).then(function (actual) {
    var lista = actual.json.lugares, lugar = null;
    lista.forEach(function (l) { if (l.id === idActual) lugar = l; });
    if (!lugar) {
      var base = id, n = 2;
      while (lista.some(function (l) { return l.id === id; })) id = base + '-' + n++;
      lugar = { id: id, alta: new Date().toISOString().slice(0, 10) };
      lista.push(lugar);
    }
    CAMPOS.forEach(function (c) { lugar[c] = $(c).value.trim(); });
    lugar.categorias = cats;
    lugar.momento = $('momento').value;
    if ($('favorito').checked) lugar.favorito = true; else delete lugar.favorito;
    var rutas = fotos.map(function (f) { return f.ruta; });
    lugar.foto = rutas[portada] || '';
    var resto = rutas.filter(function (r, i) { return i !== portada; });
    if (resto.length) lugar.galeria = resto; else delete lugar.galeria;
    if (esEvento) {
      lugar.evento = { cuando: $('cuando').value.trim() };
      if ($('inicio').value) lugar.evento.inicio = new Date($('inicio').value).toISOString();
      if ($('fin').value) lugar.evento.fin = new Date($('fin').value).toISOString();
    } else delete lugar.evento;
    return escribir(actual.json, actual.sha, (idActual ? 'Actualiza ' : 'Suma ') + nombre).then(function () { datos = actual.json; });
  }).then(function () {
    llenarSelector();
    cargarFormulario(null);
    window.scrollTo(0, 0);
    estado('Listo. En uno o dos minutos se ve en la web.');
  }).catch(function (e) { pintarFotos(); estado(e.message, true); }).then(function () { $('publicar').disabled = false; });
}

function borrar() {
  var id = $('elegir').value, lugar = buscar(id);
  if (!lugar || !confirm('¿Eliminar "' + lugar.nombre + '"? No se puede deshacer desde acá.')) return;
  estado('Eliminando…');
  leer().then(function (actual) {
    actual.json.lugares = actual.json.lugares.filter(function (l) { return l.id !== id; });
    return escribir(actual.json, actual.sha, 'Elimina ' + lugar.nombre).then(function () { datos = actual.json; });
  }).then(function () {
    llenarSelector();
    cargarFormulario(null);
    estado('Eliminado. En uno o dos minutos desaparece de la web.');
  }).catch(function (e) { estado(e.message, true); });
}

opciones($('cat1'), 'Elegí una categoría');
opciones($('cat2'), 'Ninguna');
$('token').value = guardado('dayout-token');
$('repo').value = guardado('dayout-repo') || REPO;
$('entrar').addEventListener('click', entrar);
$('formulario').addEventListener('submit', publicar);
$('borrar').addEventListener('click', borrar);
$('clase').addEventListener('change', ajustarClase);
$('elegir').addEventListener('change', function () { cargarFormulario(buscar($('elegir').value)); });
$('fotos').addEventListener('change', function () {
  Array.prototype.forEach.call($('fotos').files, function (a) { fotos.push({ archivo: a, vista: URL.createObjectURL(a) }); });
  $('fotos').value = '';
  pintarFotos();
});
$('galeria').addEventListener('change', function (ev) {
  if (ev.target.name === 'portada') { portada = Number(ev.target.value); pintarFotos(); }
});
$('galeria').addEventListener('click', function (ev) {
  var b = ev.target.closest('[data-quitar]');
  if (!b) return;
  var i = Number(b.getAttribute('data-quitar'));
  fotos.splice(i, 1);
  if (i < portada) portada--; else if (i === portada) portada = 0;
  pintarFotos();
});
if ($('token').value && $('repo').value) entrar();
