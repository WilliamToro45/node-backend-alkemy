const express = require('express');
const app = express();

const routesPersonajes = require('./routes/personajes.routes');
const routesPeliculas = require('./routes/peliculas.routes');

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// Routers
app.use(routesPersonajes);
app.use('/movies', routesPeliculas);



module.exports = app;