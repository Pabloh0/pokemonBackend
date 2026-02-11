const Pokemon = require("../database/Pokemon");

const getAllPokes = async (filterParams) => {
    try {
        const allPokemons = await Pokemon.getAllPokes(filterParams);
        return allPokemons;
    } catch (error) {
        throw error;
    }
}

const getOnePoke = async (pokeId) => {
    try {
        const pokemon = await Pokemon.getOnePoke(pokeId);
        return pokemon;
    } catch (error) {
        throw error;
    }
}

const getOneGen = async (numGen) => {
    try {
        const gen = await Pokemon.getOneGen(numGen);
        return gen;
    } catch (error) {
        throw error;
    }
}



const createNewPoke = async (newPoke) => {
    try {
        const createdPoke = await Pokemon.createNewPoke(newPoke);
        return createdPoke;
    } catch (error) {
        throw error;
    }
};

const updateOnePoke = async (pokeId, changes) => {
    try {
        const updatedPoke = await Pokemon.updateOnePoke(pokeId, changes);
        return updatedPoke;
    } catch (error) {
        throw error;
    }
};

const deleteOnePoke = async (pokeId) => {
    try {
        await Pokemon.deleteOnePoke(pokeId);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllPokes,
    getOnePoke,
    getOneGen,
    createNewPoke,
    updateOnePoke,
    deleteOnePoke
};