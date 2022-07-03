const app = require("./app");
const sequelize = require("./db.connection");
require('dotenv').config();

const PORT = process.env.PORT || 5000;
//require('./models/personajes.models');
//require('./models/genero.models');

const main = async () => {
    try {
        require('./models/pelicula-serie.models')
        await sequelize.authenticate();
        await sequelize.sync({force: false}); // Para sincronizar los datos con base de datos
        console.log("Success connection")
        app.listen(PORT, () => console.log("App running on port " + PORT));
    } catch (error) {
        console.error(error)
    }
}

main();