const Peliculas = require("../models/pelicula-serie.models");

module.exports.obtenerPeliculas = async (req, res) => {
  try {
    // Atributes determina que atributos nos regresa la consulta
    const peliculas = await Peliculas.findAll(
        /*{
      attributes: ["imagen", "titulo", "fechaCreacion"],
    }*/
    );
    if (!peliculas) return res.status(404);

    res.status(200).json(peliculas);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports.obtenerPelicula = async (req, res) => {
  try {
    // Atributes determina que atributos nos regresa la consulta
    const { id } = req.params;
    const pelicula = await Peliculas.findOne({ where: { id }});
    
    if (!pelicula) return res.status(404).json({message: "File not Found"});

    res.status(200).json(pelicula);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports.crearPelicula = async (req, res) => {
  try {
    const { imagen, titulo, fechaCreacion, calificacion, idPersonaje } =
      req.body;
    const nuevaPelicula = await Peliculas.create({
      imagen,
      titulo,
      fechaCreacion,
      calificacion,
      idPersonaje,
    });
    res.status(202).json(nuevaPelicula);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports.eliminarPelicula = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminarPelicula = await Peliculas.destroy({ where: { id }});

        if(eliminarPelicula == 0) return res.json({message: "File not exits"});

        res.status(200).json({message: "File delete"});
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.actualizarPelicula = async (req, res) => {
    try {
        const { id } = req.params;
        const pelicula = await Peliculas.findOne({ where: { id }});
        // Actualizar la tarea
        pelicula.set(req.body);
        const actualizarPelicula = await pelicula.save();

        res.status(202).json(actualizarPelicula);
        
    } catch (error) {
        res.status(500).json(error.message);
    }
};
