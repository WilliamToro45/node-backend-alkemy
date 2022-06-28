const { DataTypes } = require('sequelize');
const sequelize = require('../db.connection');

const Peliculas =  sequelize.define("Peliculas", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    imagen: {
        type: DataTypes.STRING,
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

//Peliculas.hasMany(Personajes);

module.exports = Peliculas;