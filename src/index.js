const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser")
const v1PokeRouter = require("./v1/routes/pokeRoutes")





const app = express();
app.use(cors())
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/v1/pokedex", v1PokeRouter)


app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});





