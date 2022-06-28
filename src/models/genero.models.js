const { DataTypes } = require('sequelize');
//const Peliculas = require('./pelicula-serie.models');
const sequelize = require('../db.connection');

const Generos = sequelize.define("Generos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
    }
});

module.exports = Generos;