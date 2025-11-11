// Elementos del DOM
const modalOverlay = document.getElementById('modal-overlay');
const cerrarModal = document.getElementById('cerrar-modal');
const modalTitulo = document.getElementById('modal-titulo');
const modalImagen = document.getElementById('modal-imagen');
const modalDescripcion = document.getElementById('modal-descripcion');
const modalPrecio = document.getElementById('modal-precio');
const modalTipo = document.getElementById('modal-tipo');
const modalDonde = document.getElementById('modal-donde');

// Abrir modal con información del plato
function abrirModal(card) {
    const nombre = card.getAttribute('data-nombre');
    const imagen = card.getAttribute('data-imagen');
    const descripcion = card.getAttribute('data-descripcion');
    const precio = card.getAttribute('data-precio');
    const tipo = card.getAttribute('data-tipo');
    const donde = card.getAttribute('data-donde');
    
    modalTitulo.textContent = nombre;
    modalImagen.src = imagen;
    modalImagen.alt = nombre;
    modalDescripcion.textContent = descripcion;
    modalPrecio.textContent = precio;
    modalTipo.textContent = tipo;
    modalDonde.textContent = donde;
    
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
    // Configurar clic en tarjetas de platos
    const platoCards = document.querySelectorAll('.plato-card');
    platoCards.forEach(card => {
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
            
            // Encontrar la tarjeta correspondiente en la sección de todos los platos
            const platoCard = document.querySelector(`.plato-card[data-nombre="${card.querySelector('h3').textContent}"]`);
            if (platoCard) {
                abrirModal(platoCard);
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
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cerrarModalFunc();
        }
    });
});