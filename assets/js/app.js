
// ==========================================
// 1. LÓGICA DE INICIO DE SESIÓN Y ROLES
// ==========================================
function mostrarLogin() {
    document.getElementById('modal-login').style.display = 'flex';
}

function cerrarLogin() {
    document.getElementById('modal-login').style.display = 'none';
    document.getElementById('correo-login').value = '';
    document.getElementById('pass-login').value = '';
}

function validarUsuario() {
    const correo = document.getElementById('correo-login').value;
    const pass = document.getElementById('pass-login').value;

    if(correo === '' || pass === '') {
        alert("Por favor, ingresa tu correo y contraseña.");
        return;
    }

    if (correo === 'admin@nutrivida.cl') {
        localStorage.setItem('rolUsuario', 'admin');
        window.location.href = './admin.html';
    } else if (correo === 'nutri@nutrivida.cl') {
        localStorage.setItem('rolUsuario', 'nutricionista');
        window.location.href = './agenda.html';
    } else if (correo === 'paciente@correo.cl') {
        localStorage.setItem('rolUsuario', 'paciente');
        alert("Bienvenido Paciente (Vista en construcción)");
    } else {
        alert("Correo o contraseña incorrectos.");
    }
}


// ========================
// 2. LÓGICA DE SERVICIOS 
// ========================


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

// ==========================================
// 3. LÓGICA DEL FORMULARIO DE CONTACTO
// ==========================================

// Expresión regular para validar dominios específicos
const patronCorreo = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

function validarCorreo(correo) {
  if (correo.trim() === "") {
    return "El correo es obligatorio.";
  }
  if (correo.length > 100) {
    return "El correo no puede superar los 100 caracteres.";
  }
  if (!patronCorreo.test(correo)) {
    return "Use un correo válido (ej: @gmail.com, @duoc.cl o @outlook.com)";
  }
  return "";
}

const formContacto = document.getElementById("form-contacto");
const nombreContacto = document.getElementById("nombre-contacto");
const correoContacto = document.getElementById("correo-contacto");
const comentarioContacto = document.getElementById("comentario-contacto");

const errorNombreContacto = document.getElementById("error-nombre-contacto");
const errorCorreoContacto = document.getElementById("error-correo-contacto");
const errorComentarioContacto = document.getElementById("error-comentario-contacto");
const mensajeContacto = document.getElementById("mensaje-contacto");

function validarNombreContacto() {
  const nombre = nombreContacto.value.trim();
  if (nombre === "") {
    errorNombreContacto.textContent = "El nombre es obligatorio.";
    return false;
  }
  if (nombre.length > 100) {
    errorNombreContacto.textContent = "El nombre no puede superar los 100 caracteres.";
    return false;
  }
  errorNombreContacto.textContent = "";
  return true;
}

function validarCorreoContacto() {
  const error = validarCorreo(correoContacto.value);
  errorCorreoContacto.textContent = error;
  return error === "";
}

function validarComentarioContacto() {
  const comentario = comentarioContacto.value.trim();
  if (comentario === "") {
    errorComentarioContacto.textContent = "El comentario es obligatorio.";
    return false;
  }
  if (comentario.length > 500) {
    errorComentarioContacto.textContent = "El comentario no puede superar los 500 caracteres.";
    return false;
  }
  errorComentarioContacto.textContent = "";
  return true;
}

// Eventos para validar en tiempo real (mientras se escribe)
nombreContacto.addEventListener("input", validarNombreContacto);
correoContacto.addEventListener("input", validarCorreoContacto);
comentarioContacto.addEventListener("input", validarComentarioContacto);

// Evento al presionar "Enviar"
formContacto.addEventListener("submit", (event) => {
  event.preventDefault();

  const nombreValido = validarNombreContacto();
  const correoValido = validarCorreoContacto();
  const comentarioValido = validarComentarioContacto();

  if (nombreValido && correoValido && comentarioValido) {
    mensajeContacto.textContent = "Mensaje enviado correctamente. Gracias por contactarnos.";
    
    // Resetea los campos
    formContacto.reset();
    errorNombreContacto.textContent = "";
    errorCorreoContacto.textContent = "";
    errorComentarioContacto.textContent = "";
    
    // Ocultar mensaje de éxito después de 5 segundos 
    setTimeout(() => { mensajeContacto.textContent = ""; }, 5000);
  } else {
    mensajeContacto.textContent = "Revise los campos marcados antes de enviar.";
  }
});