// Elementos del DOM
const modalOverlay = document.getElementById('modal-overlay');
const cerrarModal = document.getElementById('cerrar-modal');
const modalTitulo = document.getElementById('modal-titulo');
const modalImagen = document.getElementById('modal-imagen');
const modalDescripcion = document.getElementById('modal-descripcion');
const modalHorario = document.getElementById('modal-horario');
const modalEntrada = document.getElementById('modal-entrada');
const modalUbicacion = document.getElementById('modal-ubicacion');
const modalMaps = document.getElementById('modal-maps');
const buscador = document.getElementById('buscador');
const lugaresGrid = document.getElementById('lugares-grid');

// Abrir modal con información del lugar
function abrirModal(card) {
    const nombre = card.getAttribute('data-nombre');
    const imagen = card.getAttribute('data-imagen');
    const descripcion = card.getAttribute('data-descripcion');
    const horario = card.getAttribute('data-horario');
    const entrada = card.getAttribute('data-entrada');
    const ubicacion = card.getAttribute('data-ubicacion');
    const maps = card.getAttribute('data-maps');
    
    modalTitulo.textContent = nombre;
    modalImagen.src = imagen;
    modalImagen.alt = nombre;
    modalDescripcion.textContent = descripcion;
    modalHorario.textContent = horario;
    modalEntrada.textContent = entrada;
    modalUbicacion.textContent = ubicacion;
    modalMaps.href = maps;
    
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function cerrarModalFunc() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Filtrar lugares según búsqueda
function filtrarLugares() {
    const texto = buscador.value.toLowerCase();
    const cards = document.querySelectorAll('.lugar-card');
    
    cards.forEach(card => {
        const nombre = card.getAttribute('data-nombre').toLowerCase();
        const descripcion = card.getAttribute('data-descripcion').toLowerCase();
        
        if (nombre.includes(texto) || descripcion.includes(texto)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Configurar clic en tarjetas de lugares
    const lugarCards = document.querySelectorAll('.lugar-card');
    lugarCards.forEach(card => {
        card.addEventListener('click', function() {
            abrirModal(this);
        });
    });
    
    // Configurar botones "Ver más" del Top 3
    const verMasBtns = document.querySelectorAll('.ver-mas-btn');
    verMasBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Evitar que el clic se propague al card
            const card = this.closest('.top-card');
            const id = card.getAttribute('data-id');
            
            // Encontrar la tarjeta correspondiente en la sección de todos los lugares
            const lugarCard = document.querySelector(`.lugar-card[data-nombre="${card.querySelector('h3').textContent}"]`);
            if (lugarCard) {
                abrirModal(lugarCard);
            }
        });
    });
    
    // Configurar cierre del modal
    cerrarModal.addEventListener('click', cerrarModalFunc);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            cerrarModalFunc();
        }
    });
    
    // Configurar buscador
    buscador.addEventListener('input', filtrarLugares);
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cerrarModalFunc();
        }
    });
});