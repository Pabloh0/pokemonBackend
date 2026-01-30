const db = require("./firebase");

const getAllMoves = async (filterParams) => {
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

module.exports = {
    getAllMoves,
    getOneMove
};