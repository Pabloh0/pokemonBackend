const Move = require("../database/Moves"); 

const getAllMoves = async (filterParams) => {
    try {
        const allMoves = await Move.getAllMoves(filterParams);
        return allMoves;
    } catch (error) {
        throw error;
    }
}

const getOneMove = async (moveId) => {
    try {
        const move = await Move.getOneMove(moveId);
        return move;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllMoves,
    getOneMove,
};