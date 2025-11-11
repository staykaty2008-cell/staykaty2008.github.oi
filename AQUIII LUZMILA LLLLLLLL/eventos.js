// Elementos del DOM
const modalOverlay = document.getElementById('modal-overlay');
const cerrarModal = document.getElementById('cerrar-modal');
const modalTitulo = document.getElementById('modal-titulo');
const modalImagen = document.getElementById('modal-imagen');
const modalDescripcion = document.getElementById('modal-descripcion');
const modalFecha = document.getElementById('modal-fecha');
const modalHora = document.getElementById('modal-hora');
const modalLugar = document.getElementById('modal-lugar');
const modalPrecio = document.getElementById('modal-precio');

// Abrir modal con información del evento
function abrirModal(card) {
    const nombre = card.getAttribute('data-nombre');
    const imagen = card.getAttribute('data-imagen');
    const descripcion = card.getAttribute('data-descripcion');
    const fecha = card.getAttribute('data-fecha');
    const hora = card.getAttribute('data-hora');
    const lugar = card.getAttribute('data-lugar');
    const precio = card.getAttribute('data-precio');
    
    modalTitulo.textContent = nombre;
    modalImagen.src = imagen;
    modalImagen.alt = nombre;
    modalDescripcion.textContent = descripcion;
    modalFecha.textContent = fecha;
    modalHora.textContent = hora;
    modalLugar.textContent = lugar;
    modalPrecio.textContent = precio;
    
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function cerrarModalFunc() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Configurar clic en tarjetas de eventos
    const eventoCards = document.querySelectorAll('.evento-card');
    eventoCards.forEach(card => {
        card.addEventListener('click', function() {
            abrirModal(this);
        });
    });
    
    // Configurar cierre del modal
    cerrarModal.addEventListener('click', cerrarModalFunc);
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            cerrarModalFunc();
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cerrarModalFunc();
        }
    });
});
