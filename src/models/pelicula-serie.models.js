const { DataTypes } = require('sequelize');
const sequelize = require('../db.connection');
const Personajes = require('./personajes.models');

const Peliculas =  sequelize.define("Peliculas", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    imagen: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING
    },
    fechaCreacion: {
        type: DataTypes.DATEONLY
    },
    calificacion: {
        type: DataTypes.INTEGER
    }
})

// Relaciones
// Un personaje puede tener varias peliculas o series
Peliculas.hasMany(Personajes, {
    // Especificar opciones como foreigmkey y sourceKey
    foreignKey: 'idPelicula',
    sourceKey: 'id'
})

Personajes.belongsTo(Peliculas, {
    foreignKey: 'idPelicula',
    targetKey: 'id'
})

module.exports = Peliculas;