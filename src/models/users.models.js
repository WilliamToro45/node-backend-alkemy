const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const sequelize = require('../db.connection');

const Users = sequelize.define("Users", {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        required: true,
        validate: {
            notEmpty: false,
            len:{
                args: [5, 30],
                msg: "Ingrese su username entres 5 y 30 caracteres"
            },
            async validarUsername(value){
                const username = await Users.findOne({where: {username: value}});
                if (username) throw new Error("El usuario ya se encuetra registrado");
            }
        },
        set(value) {
            this.setDataValue('username', value.toLowerCase());
        }
    },
    password: {
        type: DataTypes.STRING(64),
        required: true,
        allowNull: false,
        set(value) {
            const saltos = bcrypt.genSaltSync();
            const pwd = bcrypt.hashSync(value, saltos);
            this.setDataValue('password', pwd);
        }
    }
})

module.exports = Users;