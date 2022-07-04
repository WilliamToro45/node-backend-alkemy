const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();

const routesPersonajes = require('./routes/personajes.routes');
const routesPeliculas = require('./routes/peliculas.routes');
const routerGeneros = require('./routes/genero.routes');
const authRoutes = require('./routes/auth.routes');

// Middleware para validar autorización.
const requiereAuth = require('./middleware/requiereAuth');

// Middleware
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(fileUpload({
    createParentPath: true,
    //limits: {
        // Limitar el tamaño máximo a 2 MB.
        //fileSize: 2 * 1024 * 1024 * 1024 
    //}
})) // Para cargar archivos.

// Routers
app.use('/characters', requiereAuth, routesPersonajes);
app.use('/movies', requiereAuth, routesPeliculas);
app.use('/genre', requiereAuth, routerGeneros);
app.use('/auth', authRoutes);


module.exports = app;