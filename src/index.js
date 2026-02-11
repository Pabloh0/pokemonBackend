const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser")
const v1PokeRouter = require("./v1/routes/pokeRoutes")
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');


const app = express();
app.use(cors())
const PORT = process.env.PORT || 3000;


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Pokedex API',
            version: '1.0.0',
            description: 'Una API para gestionar información de Pokémon',
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api/v1`,
                description: 'Servidor local v1'
            },
        ],
    },
    apis: [path.join(__dirname, "./v1/routes/*.js")]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);


app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use("/api/v1/pokedex", v1PokeRouter)


app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
    console.log(`Docs available at http://localhost:${PORT}/api-docs`);
});





