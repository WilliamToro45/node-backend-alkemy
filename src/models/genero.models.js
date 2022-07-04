const { DataTypes } = require('sequelize');
//const Peliculas = require('./pelicula-serie.models');
const sequelize = require('../db.connection');
const Peliculas = require('./pelicula-serie.models');

const Generos = sequelize.define("Generos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        unique: true
    },
    imagen: {
        type: DataTypes.BLOB,
        allowNull: false,
        required: true
    }
});

// Un genero puede tener varias peliculas
Generos.hasMany(Peliculas, {
    foreignKey: 'idGenero',
    sourceKey: 'id'
})

Peliculas.belongsTo(Generos, {
    foreignKey: 'idGenero',
    targetKey: 'id'
})

module.exports = Generos;