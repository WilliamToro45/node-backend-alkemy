const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const sequelize = require('../db.connection');
const useBcrypt = require('sequelize-bcrypt');
require('dotenv').config();

const Users = sequelize.define("Users", {
    email: {
        type: DataTypes.STRING,
        unique: {
            msg: "El usuario ya se encuentra registrado."
        },
        allowNull: false,
        required: true,
        validate: {
            notEmpty: {
                msg: "El campo email no puede estar vacío",
            },
            isEmail:{
                msg: "Ingrese un email válido."
            }
            /*
            async validarUser(value){
                const user = await Users.findOne({where: {username: value}});
                if (user) throw new Error("El usuario ya se encuentra registrado.");
            }*/
        },
        set(value) {
            this.setDataValue('email', value.toLowerCase());
        }
    },
    password: {
        type: DataTypes.STRING(64),
        required: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "El campo contraseña no puede estar vacío."
            },
        }
        /*set(value) {
            const saltos = bcrypt.genSaltSync();
            const pwd = bcrypt.hashSync(value, saltos);
            this.setDataValue('password', pwd);
        }*/
    }
});

const options = {
    field: 'password',
    rounds: 12,
    compare: 'authenticate'
}

useBcrypt(Users, options);

module.exports = Users;