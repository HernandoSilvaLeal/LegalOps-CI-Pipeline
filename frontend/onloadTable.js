window.onload = async () => {
    const citasTableBody = document.querySelector('#citasTable tbody');
  
    if (!citasTableBody) {
      console.error("El elemento 'citasTable' no se encontró en el DOM.");
      return;
    }
  
    // Función para llenar la tabla con citas
    async function cargarCitas() {
      try {
        const response = await fetch('http://localhost:3000/ver-reservas'); // Ruta a tu API
        const citas = await response.json();
  
        citas.forEach(cita => {
          const row = document.createElement('tr');
  
          const clienteCell = document.createElement('td');
          clienteCell.textContent = cita.clienteNombre;
  
          const abogadoCell = document.createElement('td');
          abogadoCell.textContent = cita.abogado;
  
          const fechaCell = document.createElement('td');
          fechaCell.textContent = cita.fecha;
  
          const horaCell = document.createElement('td');
          horaCell.textContent = cita.hora;
  
          row.appendChild(clienteCell);
          row.appendChild(abogadoCell);
          row.appendChild(fechaCell);
          row.appendChild(horaCell);
  
          citasTableBody.appendChild(row);
        });
      } catch (error) {
        console.error('Error al cargar citas:', error);
      }
    }
  
    // Llamar a la función para cargar las citas al cargar la página
    cargarCitas();
  };
  