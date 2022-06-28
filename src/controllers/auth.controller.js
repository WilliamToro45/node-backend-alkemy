const jwt = require("jsonwebtoken");
const Users = require("../models/users.models");

module.exports.login = async (req, res) => {
    try {
        const body = req. body;
        console.log(body);
    } catch (error) {
        
    }
};

module.exports.register = async (req, res) => {
    try {
        const { username, password} = req.body;
        const nuevoUsuario = await Users.create({ username, password });
        console.log(password);
        res.status(200).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json(error.message);   
    }
};