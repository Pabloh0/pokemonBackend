const pokeService = require("../services/pokeService");
const moveService = require("../services/moveService"); // Asegúrate de importar el nuevo servicio

const getAllPokes = async (req, res) => { 
    try {
         const { type, limit, order } = req.query;
        const allPokes = await pokeService.getAllPokes({type, limit, order});
        res.send({ status: "OK", data: allPokes });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getOnePoke = async (req, res) => { 
    const { params: { pokeId } } = req;
    
    try {
        const pokemon = await pokeService.getOnePoke(pokeId); 
        res.send({ status: "OK", data: pokemon });
    } catch (error) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getOneGen = async (req, res) => { 
    const { params: { numGen } } = req;

    try {
        const gen = await pokeService.getOneGen(numGen);
        res.send({ status: "OK", data: gen });
    } catch (error) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};


const getAllMoves = async (req, res) => {
    try {
        const { type, generation, limit, order } = req.query;
        
        const allMoves = await moveService.getAllMoves({ type, generation, limit, order });
        res.send({ status: "OK", data: allMoves });
    } catch (error) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getOneMove = async (req, res) => {
    const { params: { moveId } } = req;

    try {
        const move = await moveService.getOneMove(moveId);
        res.send({ status: "OK", data: move });
    } catch (error) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = {
    getAllPokes,
    getOnePoke,
    getOneGen,
    getAllMoves,
    getOneMove
};