const db = require("./firebase");

const getAllMoves = async (filterParams = {}) => {
    try {
        const datos = await db.collection('moves').get();
        let movesFiltrados = datos.docs.map(doc => doc.data());

        if (filterParams.type) {
            movesFiltrados = movesFiltrados.filter(move => 
                move.type.toLowerCase().includes(filterParams.type.toLowerCase())
            );
        }

        if (filterParams.generation) {
            movesFiltrados = movesFiltrados.filter(move => 
                move.introduced_in_gen === Number(filterParams.generation)
            );
        }

        if (filterParams.order) {
            if (filterParams.order === 'desc') {
                movesFiltrados.sort((a, b) => b.id - a.id);
            } else if (filterParams.order === 'asc') {
                movesFiltrados.sort((a, b) => a.id - b.id);
            }
        }

        if (filterParams.limit) {
            movesFiltrados = movesFiltrados.slice(0, Number(filterParams.limit));
        }

        return movesFiltrados;

    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

const getOneMove = async (moveId) => {
    try {
        const docRef = db.collection('moves').doc(String(moveId));
        const doc = await docRef.get();

        if (!doc.exists) {
            throw {
                status: 400,
                message: `No se encuentra un movimiento con la id '${moveId}'`,
            };
        }
        return doc.data();
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};


const createNewMove = async (newMove) => {
    try {
        if (!newMove.id) {
            throw { status: 400, message: "El movimiento debe tener un campo 'id'" };
        }
        await db.collection('moves').doc(String(newMove.id)).set(newMove);
        return newMove;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

const updateOneMove = async (moveId, changes) => {
    try {
        const docRef = db.collection('moves').doc(String(moveId));
        const doc = await docRef.get();

        if (!doc.exists) {
            throw { status: 404, message: `Movimiento ${moveId} no encontrado` };
        }

        await docRef.update(changes);
        return { id: moveId, ...changes };
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const deleteOneMove = async (moveId) => {
    try {
        await db.collection('moves').doc(String(moveId)).delete();
        return;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

module.exports = {
    getAllMoves,
    getOneMove,
    createNewMove,
    updateOneMove,
    deleteOneMove
};