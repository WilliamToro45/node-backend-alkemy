const express = require('express');
const router = express.Router();
const controllerPeliculas = require('../controllers/peliculas.controller');

router.get('/', controllerPeliculas.obtenerPeliculas);
router.get('/:id', controllerPeliculas.obtenerPelicula);
router.post('/', controllerPeliculas.crearPelicula);
router.put('/:id', controllerPeliculas.actualizarPelicula);
router.delete('/:id', controllerPeliculas.eliminarPelicula);

// Consultar detalles de peliculas y personajes relacionados.
router.get('/:id/details', controllerPeliculas.obtenerDetallesPelicula);

module.exports = router;