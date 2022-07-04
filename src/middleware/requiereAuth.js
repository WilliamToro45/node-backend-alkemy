const jwt = require('jsonwebtoken');
require('dotenv').config();
/**
 * Middleware para validar si un usuario tiene permisos para poder consumir la API.
 */
const requireAuth = (req, res, next) => {
    // Obtener el token
    const authorization = req.headers.authorization;

    if(authorization){ 
        const token = authorization.replace("Bearer ", "");
        // Verificar el token
        
        jwt.verify(token, process.env.SECRET_KEY_JWT, (error, decodenToken) => {
            if (error) {
                res.status(401).json({message: "Usuario no autorizado"})
            } else {
                console.log(decodenToken);
                next()
            }
        });   
    } else {
        res.status(401).json({message: "No ha ingresado un token."});
    }
}

module.exports = requireAuth;