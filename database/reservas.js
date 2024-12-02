function validarReserva(reserva) {
    // Verifica que todos los campos necesarios estén presentes y no estén vacíos
    if (reserva.clienteNombre && reserva.fecha && reserva.abogado && reserva.hora) {
      return true; // La reserva es válida
    }
    return false; // La reserva es inválida
  }
  
  // Exporta la función para que pueda ser utilizada en otros archivos
  module.exports = { validarReserva };  