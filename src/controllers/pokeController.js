const pokeService = require("../services/pokeService");
const moveService = require("../services/moveService");
const adminService = require("../services/adminService");


const getAllPokes = async (req, res) => { 
    try {
        const { type, limit, order } = req.query;
        const allPokes = await pokeService.getAllPokes({type, limit, order});
        res.send({ status: "OK", data: allPokes });
    } catch (error) {
        res.status(error?.status || 500)
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

const createPoke = async (req, res) => {
    const { body } = req;
    const apiKey = req.headers['api-key'];

    try {
        const isAdmin = await adminService.validateApiKey(apiKey);
        if (!isAdmin) {
            return res.status(401).send({ status: "FAILED", data: { error: "No autorizado" } });
        }

        // 2. Creamos el pokemon
        const newPoke = await pokeService.createNewPoke(body);
        res.status(201).send({ status: "OK", data: newPoke });

    } catch (error) {
        res.status(error?.status || 500)
           .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updatePoke = async (req, res) => {
    const { params: { pokeId }, body } = req;
    const apiKey = req.headers['api-key'];

    try {
        const isAdmin = await adminService.validateApiKey(apiKey);
        if (!isAdmin) {
            return res.status(401).send({ status: "FAILED", data: { error: "No autorizado." } });
        }

        const updatedPoke = await pokeService.updateOnePoke(pokeId, body);
        res.send({ status: "OK", data: updatedPoke });

    } catch (error) {
        res.status(error?.status || 500)
           .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const deletePoke = async (req, res) => {
    const { params: { pokeId } } = req;
    const apiKey = req.headers['api-key'];

    try {
        const isAdmin = await adminService.validateApiKey(apiKey);
        if (!isAdmin) {
            return res.status(401).send({ status: "FAILED", data: { error: "No autorizado." } });
        }

        await pokeService.deleteOnePoke(pokeId);
        res.status(204).send({ status: "OK" });

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

const createMove = async (req, res) => {
    const { body } = req;
    const apiKey = req.headers['api-key'];

    try {
        const isAdmin = await adminService.validateApiKey(apiKey);
        if (!isAdmin) {
            return res.status(401).send({ status: "FAILED", data: { error: "No autorizado." } });
        }

        const newMove = await moveService.createNewMove(body);
        res.status(201).send({ status: "OK", data: newMove });
    } catch (error) {
        res.status(error?.status || 500)
           .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updateMove = async (req, res) => {
    const { params: { moveId }, body } = req;
    const apiKey = req.headers['api-key'];

    try {
        const isAdmin = await adminService.validateApiKey(apiKey);
        if (!isAdmin) {
            return res.status(401).send({ status: "FAILED", data: { error: "No autorizado." } });
        }

        const updatedMove = await moveService.updateOneMove(moveId, body);
        res.send({ status: "OK", data: updatedMove });
    } catch (error) {
        res.status(error?.status || 500)
           .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const deleteMove = async (req, res) => {
    const { params: { moveId } } = req;
    const apiKey = req.headers['api-key'];
    


    try {
        const isAdmin = await adminService.validateApiKey(apiKey);
        if (!isAdmin) {
            return res.status(401).send({ status: "FAILED", data: { error: "No autorizado." } });
        }

        await moveService.deleteOneMove(moveId);
        res.status(204).send({ status: "OK" });
    } catch (error) {
        res.status(error?.status || 500)
           .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};
 

const getAllAdmins = async (req, res) => {
    const apiKey = req.headers['api-key'];
    console.log(req.headers);
    try {
        
        const isAdmin = await adminService.validateApiKey(apiKey);
        if (!isAdmin) {
            return res.status(401).send({ status: "FAILED", data: { error: "No autorizado." } });
        }

        const allAdmins = await adminService.getAllAdmins();
        res.send({ status: "OK", data: allAdmins });
    } catch (error) {
        res.status(error?.status || 500)
           .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = {
    getAllPokes,
    getOnePoke,
    createPoke,
    updatePoke,
    deletePoke,
    getOneGen,
    getAllMoves,
    getOneMove,
    createMove,
    updateMove,
    deleteMove,
    getAllAdmins
};