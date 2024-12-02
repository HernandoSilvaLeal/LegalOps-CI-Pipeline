const assert = require('assert');
const { validarReserva } = require('../database/reservas');

describe('Pruebas de validación de reservas', function() {
  it('Debería devolver true para una reserva válida', function() {
    const reservaValida = { clienteNombre: 'Juan', fecha: '2024-01-01', abogados: 'Abogado1', hora: '10:00' };
    const resultado = validarReserva(reservaValida);
    assert.strictEqual(resultado, true);  // Debería ser true
  });

  it('Debería devolver false para una reserva inválida', function() {
    const reservaInvalida = { clienteNombre: '', fecha: '', abogados: '', hora: '' };
    const resultado = validarReserva(reservaInvalida);
    assert.strictEqual(resultado, false);  // Debería ser false
  });
});
