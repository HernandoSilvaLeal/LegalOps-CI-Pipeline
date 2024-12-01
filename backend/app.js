const Sentry = require('@sentry/node');
const { ProfilingIntegration } = require('@sentry/profiling-node');
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
Sentry.init({
  dsn:"https://bf688513625d7ada7768307d9f31daa3@o4508393825239040.ingest.us.sentry.io/4508394262888448",
  integrations: [new ProfilingIntegration()],
  tracesSampleRate: 1.0, // Ajusta según lo que desees rastrear.
  profilesSampleRate: 1.0, // Ajusta según el nivel de perfiles que quieras capturar.
});
// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend - Sistema de Reservas de Abogados API',
      version: '1.0.0',
      description: 'API para manejar reservas de citas con abogados',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./app.js'], // Define where the comments for API documentation are
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(express.json());
app.use(Sentry.Handlers.requestHandler());
app.use(express.static('../frontend')); // Serve frontend from corresponding folder
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

let reservas = [];

// Cargar reservas desde el archivo JSON
fs.readFile('../database/reservas.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo reservas.json:', err);
  } else {
    try {
      reservas = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error al parsear JSON:', parseErr);
      reservas = [];
    }
  }
});

// Guardar reservas en el archivo JSON
function guardarReservas() {
  fs.writeFileSync('../database/reservas.json', JSON.stringify(reservas, null, 2));
}

// Enviar notificación de reserva (simulada)
function notificarReserva(clienteNombre, clienteEmail, abogado, fecha, hora) {
  console.log(`Enviando notificación a ${clienteEmail}: Reserva confirmada con ${abogado} el ${fecha} a las ${hora}.`);
}

/**
 * @swagger
 * /abogados:
 *   get:
 *     summary: Servir el archivo HTML de citas de abogados
 *     description: Muestra el archivo `abogados.html` en el navegador.
 *     responses:
 *       200:
 *         description: Página HTML mostrada correctamente
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<!DOCTYPE html><html><head><title>Citas de Abogados</title></head><body><h1>Citas Agendadas</h1></body></html>"
 *       500:
 *         description: Error al cargar el archivo HTML
 */
app.get('/abogados', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/abogados.html'));
});


/**
 * @swagger
 * /reservar:
 *   post:
 *     summary: Crear una nueva reserva
 *     description: Permite a un cliente hacer una reserva con un abogado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clienteNombre:
 *                 type: string
 *                 description: Nombre del cliente
 *               clienteEmail:
 *                 type: string
 *                 description: Correo electrónico del cliente
 *               abogado:
 *                 type: string
 *                 description: Nombre del abogado
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la cita
 *               hora:
 *                 type: string
 *                 description: Hora de la cita
 *     responses:
 *       200:
 *         description: Reserva realizada con éxito
 *       400:
 *         description: El abogado ya tiene una reserva en ese horario
 */
app.post('/reservar', (req, res) => {
  const { clienteNombre, clienteEmail, abogado, fecha, hora } = req.body;

  const reservaExistente = reservas.find(r => r.fecha === fecha && r.hora === hora);
  if (reservaExistente) {
    return res.status(400).json({ message: 'El abogado ya tiene una reserva en ese horario.' });
  }

  const nuevaReserva = { clienteNombre, clienteEmail, abogado, fecha, hora };
  reservas.push(nuevaReserva);
  guardarReservas();

  notificarReserva(clienteNombre, clienteEmail, abogado, fecha, hora);

  res.json({ message: 'Reserva realizada con éxito y notificación enviada.' });
});

/**
 * @swagger
 * /citas:
 *   get:
 *     summary: Obtener citas agendadas según fecha y abogado
 *     description: Devuelve todas las citas agendadas para un abogado específico en una fecha determinada.
 *     parameters:
 *       - in: query
 *         name: fecha
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: La fecha de las citas
 *       - in: query
 *         name: abogado
 *         schema:
 *           type: string
 *         required: true
 *         description: El nombre del abogado
 *     responses:
 *       200:
 *         description: Lista de citas para el abogado en la fecha indicada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   clienteNombre:
 *                     type: string
 *                     description: Nombre del cliente
 *                   abogado:
 *                     type: string
 *                     description: Nombre del abogado
 *                   fecha:
 *                     type: string
 *                     format: date
 *                     description: Fecha de la cita
 *                   hora:
 *                     type: string
 *                     description: Hora de la cita
 */
app.get('/citas', (req, res) => {
  const { abogado } = req.query;
  const citasFiltradas = reservas.filter(r => r.abogado === abogado);
  res.json(citasFiltradas);
});


/**
 * @swagger
 * /ver-reservas:
 *   get:
 *     summary: Ver todas las reservas en el archivo JSON
 *     description: Devuelve todo el contenido del archivo `reservas.json` con todas las reservas almacenadas.
 *     responses:
 *       200:
 *         description: Lista completa de reservas almacenadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   clienteNombre:
 *                     type: string
 *                     description: Nombre del cliente
 *                   clienteEmail:
 *                     type: string
 *                     description: Correo electrónico del cliente
 *                   abogado:
 *                     type: string
 *                     description: Nombre del abogado
 *                   fecha:
 *                     type: string
 *                     format: date
 *                     description: Fecha de la cita
 *                   hora:
 *                     type: string
 *                     description: Hora de la cita
 */
app.get('/ver-reservas', (req, res) => {
  fs.readFile('../database/reservas.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error al leer el archivo de reservas' });
    }

    try {
      const reservas = JSON.parse(data); // Parsear el contenido JSON
      res.json(reservas); // Enviar el contenido como respuesta
    } catch (error) {
      res.status(500).json({ message: 'Error al parsear el archivo JSON' });
    }
  });
});
app.use(Sentry.Handlers.errorHandler());
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
