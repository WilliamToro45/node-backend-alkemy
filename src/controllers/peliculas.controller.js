const mensajesDeError = require("../lib/validarMensajesDeErrores");
const Peliculas = require("../models/pelicula-serie.models");
const Personajes = require("../models/personajes.models");

module.exports.obtenerPeliculas = async (req, res) => {
  try {
    // Atributes determina que atributos nos regresa la consulta
    const peliculas = await Peliculas
      .findAll({
        attributes: ["imagen", "titulo", "fechaCreacion"],
      });
      
    //if (!peliculas) return res.status(404);

    res.status(200).json(peliculas);
  } catch (error) {
    res.status(500).json(mensajesDeError(error.errors));
  }
};

module.exports.obtenerPelicula = async (req, res) => {
  try {
    // Atributes determina que atributos nos regresa la consulta
    const { id } = req.params;
    const pelicula = await Peliculas.findOne({ where: { id } });

    if (!pelicula)
      return res
        .status(404)
        .json({ mensaje: "Película o serie no encontrada" });

    res.status(200).json(pelicula);
  } catch (error) {
    res.status(500).json(mensajesDeError(error.errors));
  }
};

module.exports.crearPelicula = async (req, res) => {
  try {
    if (req.files) {
      const { imagen } = req.files;
      const { titulo, fechaCreacion, calificacion, idGenero } = req.body;
      const nuevaPelicula = await Peliculas.create({
        imagen,
        titulo,
        fechaCreacion,
        calificacion,
        idGenero,
      });
      res.status(202).json(nuevaPelicula);
    } else {
      res
        .status(500)
        .json({ mensaje: "No ha seleccionado un archivo de imagen." });
    }
  } catch (error) {
    res.status(500).json(mensajesDeError(error.errors));
  }
};

module.exports.eliminarPelicula = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminarPelicula = await Peliculas.destroy({ where: { id } });

    if (eliminarPelicula == 0)
      return res.json({ mensaje: "Película o serie no encontrada." });

    res.status(200).json({ mensaje: "Película o serie eliminada con éxito." });
  } catch (error) {
    res.status(500).json(mensajesDeError(error.errors));
  }
};

module.exports.actualizarPelicula = async (req, res) => {
  try {
    if (req.files) {
      const { id } = req.params;
      const { imagen } = req.files;
      const { titulo, fechaCreacion, calificacion, idGenero } = req.body;

      const actualizarPelicula = await Peliculas.update({
        imagen,
        titulo,
        fechaCreacion,
        calificacion,
        idGenero,
      }, {
        where: { id }
      });

      res.status(202).json(actualizarPelicula);
    } else {
      res
        .status(500)
        .json({ mensaje: "No ha seleccionado un archivo de imagen." });
    }
  } catch (error) {
    res.status(500).json(mensajesDeError(error.errors));
  }
};


module.exports.obtenerDetallesPelicula = async (req, res) => {
  try {
    const { id } = req.params;

    const detallePelicula = await Peliculas.findOne({where: { id }});
    
    const personajes = await Personajes.findAll({where: {idPelicula: detallePelicula.id} });
    res.status(200).json({detallePelicula, personajes})
  } catch (error) {
    res.status(500).json(mensajesDeError(error.errors));
  }
}