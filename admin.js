/* Panel privado: publica lugares escribiendo data/lugares.json y fotos/ en el repositorio de GitHub. */

var CATEGORIAS = [
  ['comer', 'Café y copas'], ['pasear', 'Pasear'], ['curiosear', 'Curiosear'], ['barrio', 'De barrio'], ['eventos', 'Eventos']
];
var CAMPOS = ['nombre', 'zona', 'breve', 'texto', 'tipo', 'direccion', 'precio', 'idealPara', 'web', 'instagram', 'whatsapp', 'credito'];
var ARCHIVO = 'data/lugares.json';

var datos = null;
var $ = function (id) { return document.getElementById(id); };

function guardado(clave) { try { return localStorage.getItem(clave) || ''; } catch (e) { return ''; } }
function recordar(clave, valor) { try { localStorage.setItem(clave, valor); } catch (e) { /* sin almacenamiento */ } }

function repoPorDefecto() {
  var m = location.hostname.match(/^(.+)\.github\.io$/);
  if (!m) return '';
  var carpeta = location.pathname.split('/')[1];
  return m[1] + '/' + (carpeta && carpeta.indexOf('.') === -1 ? carpeta : m[1] + '.github.io');
}

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
  opciones.headers = {
    'Authorization': 'Bearer ' + $('token').value.trim(),
    'Accept': 'application/vnd.github+json'
  };
  return fetch('https://api.github.com/repos/' + $('repo').value.trim() + '/contents/' + ruta, opciones).then(function (r) {
    if (!r.ok) throw new Error(r.status === 401 || r.status === 403 ? 'La clave no es válida o no tiene permiso.' : r.status === 404 ? 'No se encontró el repositorio o el archivo.' : 'GitHub respondió con un error (' + r.status + ').');
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
  return api(ARCHIVO, {
    method: 'PUT',
    body: JSON.stringify({ message: mensaje, content: aBase64(JSON.stringify(json, null, 2) + '\n'), sha: sha })
  });
}

function slug(texto) {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/* Achica la foto a 1600 px de lado mayor y la pasa a JPG. */
function prepararFoto(archivo) {
  return new Promise(function (resolver, rechazar) {
    var img = new Image();
    img.onload = function () {
      var escala = Math.min(1, 1600 / Math.max(img.width, img.height));
      var lienzo = document.createElement('canvas');
      lienzo.width = Math.round(img.width * escala);
      lienzo.height = Math.round(img.height * escala);
      lienzo.getContext('2d').drawImage(img, 0, 0, lienzo.width, lienzo.height);
      URL.revokeObjectURL(img.src);
      resolver(lienzo.toDataURL('image/jpeg', 0.82).split(',')[1]);
    };
    img.onerror = function () { rechazar(new Error('No se pudo leer la foto.')); };
    img.src = URL.createObjectURL(archivo);
  });
}

function llenarSelector() {
  var sel = $('elegir');
  sel.innerHTML = '<option value="">Cargar un lugar nuevo</option>';
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

function cargarFormulario(lugar) {
  lugar = lugar || {};
  CAMPOS.forEach(function (c) { $(c).value = lugar[c] || ''; });
  document.querySelectorAll('#categorias input').forEach(function (caja) {
    caja.checked = (lugar.categorias || []).indexOf(caja.value) !== -1;
  });
  $('momento').value = lugar.momento || '';
  var ev = lugar.evento || {};
  $('cuando').value = ev.cuando || '';
  ['inicio', 'fin'].forEach(function (campo) {
    $(campo).value = '';
    var f = ev[campo] ? new Date(ev[campo]) : null;
    if (f && !isNaN(f.getTime())) $(campo).value = new Date(f.getTime() - f.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  });
  $('foto').value = '';
  $('galeria').value = '';
  $('vista-foto').hidden = !lugar.foto;
  if (lugar.foto) $('vista-foto').src = lugar.foto;
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
  var cats = [];
  document.querySelectorAll('#categorias input:checked').forEach(function (c) { cats.push(c.value); });
  if (!nombre) return estado('Falta el nombre.', true);
  if (!cats.length) return estado('Marcá al menos una categoría.', true);

  $('publicar').disabled = true;
  estado('Publicando…');
  var archivoFoto = $('foto').files[0];
  var id = idActual || slug(nombre) || 'lugar';

  var subirFoto = !archivoFoto ? Promise.resolve(null) : prepararFoto(archivoFoto).then(function (b64) {
    var ruta = 'fotos/' + id + '-' + Date.now() + '.jpg';
    return api(ruta, { method: 'PUT', body: JSON.stringify({ message: 'Foto de ' + nombre, content: b64 }) }).then(function () { return ruta; });
  });

  var extras = Array.prototype.slice.call($('galeria').files);
  var rutasGaleria = [];
  var subirGaleria = function () {
    return extras.reduce(function (cadena, archivo, i) {
      return cadena.then(function () { return prepararFoto(archivo); }).then(function (b64) {
        var ruta = 'fotos/' + id + '-' + Date.now() + '-' + (i + 1) + '.jpg';
        return api(ruta, { method: 'PUT', body: JSON.stringify({ message: 'Foto de ' + nombre, content: b64 }) }).then(function () { rutasGaleria.push(ruta); });
      });
    }, Promise.resolve());
  };

  subirFoto.then(function (rutaFoto) {
    return subirGaleria().then(function () { return rutaFoto; });
  }).then(function (rutaFoto) {
    return leer().then(function (actual) {
      var lista = actual.json.lugares, lugar = null;
      lista.forEach(function (l) { if (l.id === idActual) lugar = l; });
      if (!lugar) {
        var base = id, n = 2;
        while (lista.some(function (l) { return l.id === id; })) id = base + '-' + n++;
        lugar = { id: id, alta: new Date().toISOString().slice(0, 10) };
        lista.push(lugar);
      }
      lugar.nombre = nombre;
      lugar.categorias = cats;
      CAMPOS.forEach(function (c) { if (c !== 'nombre') lugar[c] = $(c).value.trim(); });
      if ($('momento').value) lugar.momento = $('momento').value; else delete lugar.momento;
      if (rutaFoto) lugar.foto = rutaFoto;
      if (!lugar.foto) lugar.foto = '';
      if (rutasGaleria.length) lugar.galeria = (lugar.galeria || []).concat(rutasGaleria);
      var cuando = $('cuando').value.trim(), inicio = $('inicio').value, fin = $('fin').value;
      if (cuando || inicio || fin) {
        lugar.evento = { cuando: cuando };
        if (inicio) lugar.evento.inicio = new Date(inicio).toISOString();
        if (fin) lugar.evento.fin = new Date(fin).toISOString();
      } else delete lugar.evento;
      return escribir(actual.json, actual.sha, (idActual ? 'Actualiza ' : 'Suma ') + nombre).then(function () { datos = actual.json; });
    });
  }).then(function () {
    llenarSelector();
    cargarFormulario(null);
    estado('Listo. En uno o dos minutos se ve en la web.');
  }).catch(function (e) { estado(e.message, true); }).then(function () { $('publicar').disabled = false; });
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

$('categorias').innerHTML = CATEGORIAS.map(function (c) {
  return '<label class="opcion"><input type="checkbox" value="' + c[0] + '">' + c[1] + '</label>';
}).join('');
$('token').value = guardado('dayout-token');
$('repo').value = guardado('dayout-repo') || repoPorDefecto();
$('entrar').addEventListener('click', entrar);
$('formulario').addEventListener('submit', publicar);
$('borrar').addEventListener('click', borrar);
$('elegir').addEventListener('change', function () { cargarFormulario(buscar($('elegir').value)); });
if ($('token').value && $('repo').value) entrar();
