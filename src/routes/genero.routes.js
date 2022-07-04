const express = require('express');
const router = express.Router();
const controllerGeneros = require('../controllers/generos.controller');

router.get('/', controllerGeneros.obtenerGeneros);
router.get('/:id', controllerGeneros.obtenerGenero);
router.post('/', controllerGeneros.crearGenero);
router.put('/:id', controllerGeneros.actualizarGenero);
router.delete('/:id', controllerGeneros.eliminarGenero);

module.exports = router;