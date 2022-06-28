const express = require('express');
const router = express.Router();
const personajesController = require('../controllers/personaje.controller');

router.get("/characters", personajesController.obtenerPersonajes);
router.post("/characters", personajesController.crearPersonaje);
router.put("/characters/:id", personajesController.actualizarPersonaje);
router.delete("/characters/:id", personajesController.eliminarPersonaje);
router.get("/characters/:id", personajesController.obtenerPersonaje);

// Consultas relacionaes
router.get('/characters/:id/peliculas', personajesController.obtenerPersonajesPeliculas)

module.exports = router;