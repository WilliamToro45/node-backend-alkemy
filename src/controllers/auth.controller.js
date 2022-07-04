const jwt = require("jsonwebtoken");
const mensajesDeError = require("../lib/validarMensajesDeErrores");
const Users = require("../models/users.models");

require('dotenv').config();

// Duración del toke
const duracionToken = 365 * 24 * 60 * 60; 

// Crear token
const crearToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY_JWT, {expiresIn: duracionToken});
}

module.exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = await Users.findOne({
            where: { email: email },
            attributes: ["email", "password"],
        });
        
        if(!user) return res.status(401).json({mensaje: "No autorizado"});

        //console.log(user.authenticate(password));
        
        if( user.authenticate(password)) {
            const token = crearToken(user.id);
            return res.status(200).json({token})
        }

        res.status(401).json({message: "No autorizado."});
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports.register = async (req, res) => {
    try {
        const { email, password} = req.body;
        
        // Validar que email o password no sean null
        if(email == null || password == null) return res.status(500).json({mensaje: "No se permiten valores null."});

        // Crear nuevo usuario
        const nuevoUsuario = await Users.create({ email, password });
        
        // Crear token
        const token = crearToken(nuevoUsuario.id);
        
        // Retornar el token
        res.status(200).json({token});
        
    } catch (error) {
        //res.status(500).json({error})
        /* Retorna un arreglo con los errores, incluyendo el tipo de error,
        el valor ingresado, el nombre del campo y el mensaje de error.
        */
        res.status(500).json(mensajesDeError(error.errors));
    }
};