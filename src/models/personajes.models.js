const { DataTypes } = require("sequelize");
const sequelize = require("../db.connection");

const Personajes = sequelize.define(
  "Personaje",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    imagen: {
      type: DataTypes.BLOB,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "El campo imagen no puede estar vacío.",
        },
        notNull: {
          msg: "El campo imagen no admite valores tipo null.",
        },
      },
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "El campo nombre no puede estar vacío."},
        notNull: { msg: "El campo nombre no admite valores de tipo null."}
      },
    },
    edad: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: { msg: "El campo edad solo admite valores enteros."}
      }
    },
    peso: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: { msg: "El campo peso solo admite valores enteros."}
      }
    },
    historia: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other options
    timestamps: true,
  }
);

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
