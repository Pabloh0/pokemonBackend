const Pokemon = require("../database/Pokemon");

const getAllPokes = async (filterParams) => {
    try{
        const allPokemons = await Pokemon.getAllPokes(filterParams);
        return allPokemons;
    }catch (error){
        throw error;
    }
}

const getOnePoke = async (pokeId) => {
    try{
        const pokemon = await Pokemon.getOnePoke(pokeId);
        return pokemon;
    }catch (error){
        throw error;
    }
}

const getOneGen = async (numGen) => {
    try{
        const gen = await Pokemon.getOneGen(numGen);
        return gen;
    }catch (error){
        throw error;
    }
}

module.exports = {
    getAllPokes,
    getOnePoke,
    getOneGen,
};