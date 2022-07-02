const jwt = require("jsonwebtoken");
const Users = require("../models/users.models");

// Duración del toke
const duracionToken = 365 * 24 * 60 * 60; 

// Crear token
const crearToken = (id) => {
    return jwt.sign({ id }, "SECRET MESSAGE", {expiresIn: duracionToken});
}

module.exports.login = async (req, res) => {
    // TODO Organizar el login
    try {
        const {username, password} = req.body;
        //console.log("Username: " + username);
        const user = await Users.findOne({where: { username: username }});
        
        if(!user) return res.status(401).json({mesaage: "No autorizado"});

        console.log(user.authenticate(password));

        if( user.authenticate(password)) {
            const token = crearToken(user.id);
            return res.status(200).json({token})
        }

        res.status(401).json({mesaage: "No autorizado - "});
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports.register = async (req, res) => {
    try {
        const { username, password} = req.body;
        const nuevoUsuario = await Users.create({ username, password });
        
        const token = crearToken(nuevoUsuario.id);

        res.status(200).json({token});
    } catch (error) {
        res.status(500).json(error.message);   
    }
};