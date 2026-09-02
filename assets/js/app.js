document.addEventListener('DOMContentLoaded', () => {
    
    // Lógica para la selección de servicios (Simulación de carrito)
    const botonesReserva = document.querySelectorAll('.add-to-cart');
    const panelResumen = document.getElementById('resumen-reserva');
    const textoServicio = document.getElementById('servicio-seleccionado');

    if (botonesReserva.length > 0) {
        botonesReserva.forEach(boton => {
            boton.addEventListener('click', (e) => {
                // Obtener el nombre del servicio desde el atributo data
                const servicio = e.target.getAttribute('data-servicio');
                
                // Mostrar el panel inferior
                panelResumen.style.display = 'block';
                
                // Actualizar el texto
                textoServicio.textContent = `Has seleccionado: ${servicio}. Listo para buscar fechas disponibles.`;
                
                // Efecto visual en el botón
                e.target.textContent = "Seleccionado";
                e.target.style.backgroundColor = "#555";
                
                // Resetear los otros botones
                botonesReserva.forEach(btn => {
                    if(btn !== e.target) {
                        btn.textContent = "Seleccionar";
                        btn.style.backgroundColor = "var(--accent-color)";
                    }
                });
            });
        });
    }
});