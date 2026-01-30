const express = require("express");
const router = express.Router();
const pokeController = require("../../controllers/pokeController");
const apiache = require("apicache")
const cache = apiache.middleware

router.get("/pokemons/moves", cache("1 minutes"), pokeController.getAllMoves);
router.get("/pokemons/moves/:moveId", cache("1 minutes"), pokeController.getOneMove);
router.get("/pokemons/gen/:numGen", cache("1 minutes"), pokeController.getOneGen);
router.get("/pokemons/:pokeId", cache("1 minutes"), pokeController.getOnePoke);
router.get("/", cache("1 minutes"), pokeController.getAllPokes);

module.exports = router;