// notificaciones.js
function notificarReserva(clienteNombre, clienteEmail, abogado, fecha, hora) {
    // lógica de notificación
    console.log(`Notificación enviada a ${clienteNombre} (${clienteEmail}) sobre su cita con el abogado ${abogado} el ${fecha} a las ${hora}`);
  }
  
  module.exports = { notificarReserva };
  