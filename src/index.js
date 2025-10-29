// Obtener elementos del DOM
const bloqueTexto = document.getElementById('bloque-texto');
const inputPalabra = document.getElementById('in_palabra');
const botonBuscar = document.getElementById('btn_buscar');
const botonLimpiar = document.getElementById('btn_limpiar');
const resultado = document.getElementById('resultado');
const contador = document.getElementById('contador');

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

// Botón limpiar
botonLimpiar.addEventListener('click', () => {
  bloqueTexto.value = '';
  inputPalabra.value = '';
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
