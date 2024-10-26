document.addEventListener('DOMContentLoaded', () => {
  const reservaForm = document.getElementById('reservaForm');
  const mensajeDiv = document.getElementById('mensaje');

  // Enviar la reserva
  reservaForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const clienteNombre = document.getElementById('clienteNombre').value;
    const clienteEmail = document.getElementById('clienteEmail').value;
    const abogado = document.getElementById('abogado').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;

    const reserva = {
      clienteNombre,
      clienteEmail,
      abogado,
      fecha,
      hora
    };

    try {
      const response = await fetch('http://localhost:3000/reservar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reserva)
      });

      const data = await response.json();
      mensajeDiv.innerText = response.ok ? data.message : data.message;
    } catch (error) {
      mensajeDiv.innerText = 'Error de conexión con el servidor.';
    }
  });

  // Lógica para marcar horas no disponibles
  async function cargarHorasDisponibles() {
    const fechaSeleccionada = document.getElementById('fecha').value;
    const abogadoSeleccionado = document.getElementById('abogado').value;

    if (fechaSeleccionada && abogadoSeleccionado) {
      const response = await fetch(`http://localhost:3000/citas?fecha=${fechaSeleccionada}&abogado=${abogadoSeleccionado}`);
      const citas = await response.json();

      const horasNoDisponibles = citas.map(cita => cita.hora);

      // Deshabilitar horas ocupadas en el select
      const horaSelect = document.getElementById('hora');
      horaSelect.querySelectorAll('option').forEach(option => {
        option.disabled = horasNoDisponibles.includes(option.value);
      });
    }
  }

  // Agregar eventos para cargar horas disponibles
  document.getElementById('fecha').addEventListener('change', cargarHorasDisponibles);
  document.getElementById('abogado').addEventListener('change', cargarHorasDisponibles);
});
