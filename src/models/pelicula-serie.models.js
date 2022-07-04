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
        allowNull: false,
        validate: {
            notEmpty: { msg: "El campo imagen no puede estar vacío."},
            notNull: { msg: "El campo imagen no admite valores tipo null."}
        }
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        validate: {
            notEmpty: { msg: "El campo título no puede estar vacío."},
            notNull: { msg: "El campo título no admite valores tipo null."}
        }
    },
    fechaCreacion: {
        type: DataTypes.DATEONLY
    },
    calificacion: {
        type: DataTypes.INTEGER,
        validate: {
            is: {
                args: /[1-5]/,
                msg: "La calificación debe ser un valor entre 1 y 5."
            },
        }
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