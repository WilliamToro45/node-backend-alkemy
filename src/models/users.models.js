const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const sequelize = require('../db.connection');

const Users = sequelize.define("Users", {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        required: true
    },
    password: {
        type: DataTypes.STRING,
        required: true,
        set(value) {
            this.setDataValue('password', await bcrypt.hash(value, bcrypt.genSalt()))
        }
    }
})

module.exports = Users;