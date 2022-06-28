const Peliculas = require('../models/pelicula-serie.models');
const Personajes = require('../models/personajes.models');

module.exports.obtenerPersonajes = async (req, res) =>{
    try {
        const consulta = await Personajes.findAll();
        res.status(200).json(consulta);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.obtenerPersonaje = async (req, res) => {
    try {
        const { id } = req.params;
        const personaje = await Personajes.findOne({where: {id}})

        if(!personaje) return res.status(404).json({message: "El personaje solucicitado no existe"});
        
        res.json(personaje);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports.crearPersonaje = async (req, res) =>{
    const datos = req.body;
    try {
        const crear = await Personajes.create({
            imagen: datos.imagen,
            nombre: datos.nombre,
            edad: datos.edad,
            peso: datos.peso,
            historia: datos.historia
        });
        res.status(200).json(crear);
    } catch (error) {
        res.sendStatus(500).json(error);
    }
}

module.exports.actualizarPersonaje = async (req, res) => {
    try {
        const {id} = req.params;
        const body = req.body;

        const actualizar = await Personajes.update({
            imagen: body.imagen,
            nombre: body.nombre,
            edad: body.edad,
            peso: body.peso,
            historia: body.historia
        }, {
            where: {id}
        })
        res.status(202).json(actualizar);
    } catch (error) {
        res.status(400).json({error});
    }
}

module.exports.eliminarPersonaje = async (req, res ) => {
    try {
        const { id } = req.params;
        const eliminar = await Personajes.destroy({
            where: { id }
        })
        res.status(204).json(eliminar);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.obtenerPersonajesPeliculas = async (req, res) => {
    try {
        const { id } = req.params;
        const peliculas = await Peliculas.findAll({where:{idPersonaje: id}})
        res.json(peliculas);
    } catch (error) {
        res.status(500).json(error);
    }
}