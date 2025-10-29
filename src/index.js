import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../dist/public/css/main.css";
import Swal from 'sweetalert2';  

// Obtener elementos del DOM
const bloqueTexto = document.getElementById('bloque-texto');
const inputPalabra = document.getElementById('in_palabra');
const botonBuscar = document.getElementById('btn_buscar');
const botonLimpiar = document.getElementById('btn_limpiar');
const resultado = document.getElementById('resultado');
const contador = document.getElementById('contador');
const nuevaPalabra = document.getElementById('nueva_palabra');
const botonReemplazar = document.getElementById('btn_reemplazar');

// Función principal de búsqueda
botonBuscar.addEventListener('click', () => {
  const frase = bloqueTexto.value.trim();
  const palabra = inputPalabra.value.trim();

  if (frase === '' || palabra === '') {
    Swal.fire({
      icon: 'error',
      title: 'Campos vacíos',
      text: 'Por favor, ingresa un texto y una palabra para buscar.',
      confirmButtonColor: '#4f46e5'
    });
    return;
  }

  const regex = new RegExp(`(${palabra})`, 'gi');
  const coincidencias = frase.match(regex);
  const total = coincidencias ? coincidencias.length : 0;

  if (total === 0) {
    Swal.fire({
      icon: 'info',
      title: 'Sin coincidencias',
      text: `La palabra "${palabra}" no se encontró en el texto.`,
      confirmButtonColor: '#4f46e5'
    });
    resultado.innerHTML = `<p>${frase}</p>`;
    contador.textContent = '0 coincidencias encontradas.';
    return;
  }

  // Resaltar palabra encontrada
  const fraseResaltada = frase.replace(regex, '<mark>$1</mark>');
  resultado.innerHTML = `<p>${fraseResaltada}</p>`;

  // Mostrar cantidad
  contador.textContent = `✅ Se encontró ${total} coincidencia${total > 1 ? 's' : ''}.`;

  // Alerta visual
  Swal.fire({
    icon: 'success',
    title: 'Búsqueda completada',
    text: `Se encontraron ${total} coincidencia${total > 1 ? 's' : ''} de "${palabra}".`,
    timer: 2000,
    showConfirmButton: false
  });
});

// Nueva función: reemplazar la palabra más repetida
botonReemplazar.addEventListener('click', () => {
  const texto = bloqueTexto.value.trim();
  const palabraNueva = nuevaPalabra.value.trim();

  if (texto === '' || palabraNueva === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Campos vacíos',
      text: 'Debes ingresar texto y una nueva palabra para reemplazar.',
      confirmButtonColor: '#4f46e5'
    });
    return;
  }

  // Contar frecuencia de palabras
  const palabras = texto.toLowerCase().match(/\b[\wáéíóúüñ]+\b/g);
  const conteo = {};

  palabras.forEach(p => conteo[p] = (conteo[p] || 0) + 1);

  // Obtener palabra más repetida
  const palabraMasRepetida = Object.keys(conteo).reduce((a, b) => conteo[a] > conteo[b] ? a : b);

  // Reemplazar todas sus apariciones
  const regex = new RegExp(`\\b${palabraMasRepetida}\\b`, 'gi');
  const nuevoTexto = texto.replace(regex, palabraNueva);

  bloqueTexto.value = nuevoTexto;

  resultado.innerHTML = `<p>${nuevoTexto.replace(new RegExp(`(${palabraNueva})`, 'gi'), '<mark>$1</mark>')}</p>`;

  Swal.fire({
    icon: 'success',
    title: 'Reemplazo realizado',
    text: `La palabra "${palabraMasRepetida}" fue reemplazada por "${palabraNueva}".`,
    confirmButtonColor: '#4f46e5'
  });
});

// Botón limpiar
botonLimpiar.addEventListener('click', () => {
  bloqueTexto.value = '';
  inputPalabra.value = '';
  nuevaPalabra.value = '';
  resultado.innerHTML = '<p class="text-muted text-center">Aquí aparecerá el texto con la palabra resaltada.</p>';
  contador.textContent = '';
});

// Limpiar resultados si cambia algo
inputPalabra.addEventListener('input', () => {
  resultado.innerHTML = '';
  contador.textContent = '';
});

bloqueTexto.addEventListener('input', () => {
  resultado.innerHTML = '';
  contador.textContent = '';
});

// Permitir Enter para buscar
inputPalabra.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    botonBuscar.click();
  }
});
