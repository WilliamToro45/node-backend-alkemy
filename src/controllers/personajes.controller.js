const mensajesDeError = require("../lib/validarMensajesDeErrores");
const Peliculas = require("../models/pelicula-serie.models");
const Personajes = require("../models/personajes.models");

module.exports.obtenerPersonajes = async (req, res) => {
  try {
    const consulta = await Personajes.findAll({
      attributes: ["imagen", "nombre"],
    });

    res.status(200).json(consulta);
  } catch (error) {
    res.status(500).json(mensajesDeError(error.erros));
  }
};

module.exports.obtenerPersonaje = async (req, res) => {
  try {
    const { id } = req.params;
    const personaje = await Personajes.findOne({ where: { id } });

    if (!personaje)
      return res
        .status(404)
        .json({ mensaje: "El personaje solicitado no existe." });

    res.json(personaje);
  } catch (error) {
    res.status(400).json(mensajesDeError(error.errors));
  }
};

module.exports.crearPersonaje = async (req, res) => {
  try {
    if (req.files) {
      const { imagen } = req.files;
      const { nombre, edad, peso, historia, idPelicula } = req.body;

      const nuevoRegistro = await Personajes.create({
        imagen,
        nombre,
        edad,
        peso,
        historia,
        idPelicula,
      });
      res.status(200).json(nuevoRegistro);
    } else {
      res
        .status(500)
        .json({ mensaje: "No ha seleccionado un archivo de imagen." });
    }
  } catch (error) {
    res.status(500).json(mensajesDeError(error.errors));
  }
};

module.exports.actualizarPersonaje = async (req, res) => {
  try {
    if (req.files) {
      const { id } = req.params;
      const { imagen } = req.files;
      const { nombre, edad, peso, historia, idPelicula } = req.body;

      const actualizar = await Personajes.update(
        {
          imagen,
          nombre,
          edad,
          peso,
          historia,
          idPelicula,
        },
        {
          where: { id },
        }
      );
      res.status(202).json(actualizar);
    } else {
      res
        .status(500)
        .json({ mensaje: "No ha seleccionado un archivo de imagen." });
    }
  } catch (error) {
    res.status(400).json(mensajesDeError(error.errors));
  } 
};

module.exports.eliminarPersonaje = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminarRegistro = await Personajes.destroy({
      where: { id },
    });
    res.status(204).json(eliminarRegistro);
  } catch (error) {
    res.status(500).json(mensajesDeError(error.errors));
  }
};

module.exports.obtenerDetallesPersonaje = async (req, res) => {
  try {
    const { id } = req.params;

    const detallesPersonaje = await Personajes.findOne({ where: { id: id } });
    const peliculas = await Peliculas.findAll({
      where: { id: detallesPersonaje.idPelicula },
    });
    console.log(peliculas);
    res.status(200).json({ detallesPersonaje, peliculas });
  } catch (error) {
    res.status(500).json(mensajesDeError(error.errors));
  }
};
