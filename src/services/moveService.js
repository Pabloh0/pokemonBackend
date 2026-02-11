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

const createNewMove = async (newMove) => {
    try {
        const createdMove = await Move.createNewMove(newMove);
        return createdMove;
    } catch (error) {
        throw error;
    }
};

const updateOneMove = async (moveId, changes) => {
    try {
        const updatedMove = await Move.updateOneMove(moveId, changes);
        return updatedMove;
    } catch (error) {
        throw error;
    }
};

const deleteOneMove = async (moveId) => {
    try {
        await Move.deleteOneMove(moveId);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllMoves,
    getOneMove,
    createNewMove,
    updateOneMove,
    deleteOneMove
};