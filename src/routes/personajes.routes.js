const express = require('express');
const router = express.Router();
const personajesController = require('../controllers/personajes.controller');

router.get("/", personajesController.obtenerPersonajes);
router.post("/", personajesController.crearPersonaje);
router.put("/:id", personajesController.actualizarPersonaje);
router.delete("/:id", personajesController.eliminarPersonaje);
router.get("/:id", personajesController.obtenerPersonaje);

// Consultar detalles de personajes y películas relacionadas.
router.get('/:id/details', personajesController.obtenerDetallesPersonaje);

// Rutas de consulta
//router.get('/characters?name', personajesController.busquedaPorNombre)

module.exports = router;