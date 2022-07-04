const express = require('express');
const router = express.Router();
const personajesController = require('../controllers/personajes.controller');

router.get("/characters", personajesController.obtenerPersonajes);
router.post("/characters", personajesController.crearPersonaje);
router.put("/characters/:id", personajesController.actualizarPersonaje);
router.delete("/characters/:id", personajesController.eliminarPersonaje);
router.get("/characters/:id", personajesController.obtenerPersonaje);

// Consultar detalles de personajes y películas relacionadas.
router.get('/characters/:id/details', personajesController.obtenerDetallesPersonaje);

// Rutas de consulta
//router.get('/characters?name', personajesController.busquedaPorNombre)

module.exports = router;