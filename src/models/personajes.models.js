const { DataTypes } = require('sequelize');
//const Peliculas = require('./pelicula-serie.models');
const sequelize = require('../db.connection');
const Peliculas = require('./pelicula-serie.models');

const Personajes =  sequelize.define("Personaje", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    imagen: {
        type: DataTypes.BLOB,
        allowNull: false 
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
    },
    peso: {
        type: DataTypes.INTEGER
    },
    historia: {
        type: DataTypes.STRING
    }
},{
    // Other options
    timestamps: true,
})

//Personajes.hasMany(Peliculas);
// Relaciones
// Un personaje puede tener varias peliculas o series
//Personajes.hasMany(Peliculas, {
    // Especificar opciones como foreigmkey y sourceKey
//    foreignKey: 'idPersonaje',
//    sourceKey: 'id'
//})
/*
Peliculas.belongsTo(Personajes, {
    foreignKey: 'idPersonaje',
    targetKey: 'id'
})
*/
module.exports = Personajes;