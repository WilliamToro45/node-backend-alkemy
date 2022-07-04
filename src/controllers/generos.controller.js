//const Peliculas = require('../models/pelicula-serie.models');
const Generos = require('../models/genero.models');

module.exports.obtenerGeneros = async (req, res) =>{
    try {
        const consulta = await Generos.findAll();
        res.status(200).json(consulta);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.obtenerGenero = async (req, res) => {
    try {
        const { id } = req.params;
        const genero = await Generos.findOne({where: {id}})

        if(!genero) return res.status(404).json({mensaje: "El genero solucicitado no existe"});
        
        res.json(genero);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports.crearGenero = async (req, res) =>{
    const { nombre, imagen } = req.body;
    try {
        const crear = await Generos.create({
            nombre,
            imagen
        });
        res.status(200).json(crear);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.actualizarGenero = async (req, res) => {
    try {
        const {id} = req.params;
        const { nombre, genero } = req.body;

        const actualizar = await Generos.update({
            nombre,
            genero
        }, {
            where: {id}
        })
        res.status(202).json(actualizar);
    } catch (error) {
        res.status(400).json({error});
    }
}

module.exports.eliminarGenero = async (req, res ) => {
    try {
        const { id } = req.params;
        const eliminar = await Generos.destroy({
            where: { id }
        })
        res.status(204).json(eliminar);
    } catch (error) {
        res.status(500).json(error);
    }
}