const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const sequelize = require('../db.connection');
const useBcrypt = require('sequelize-bcrypt');

const Users = sequelize.define("Users", {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        required: true,
        validate: {
            notEmpty: false,
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
        /*set(value) {
            const saltos = bcrypt.genSaltSync();
            const pwd = bcrypt.hashSync(value, saltos);
            this.setDataValue('password', pwd);
        }*/
    }
})

const options = {
    field: 'password',
    rounds: 12,
    compare: 'authenticate'
}

useBcrypt(Users, options);

module.exports = Users;