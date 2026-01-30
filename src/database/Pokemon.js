const db = require("./firebase");


const getAllPokes = async (filterParams) => {
    try {
        const datos = await db.collection('pokemons').get();
        let pokemonsFiltrados = datos.docs.map(doc => doc.data());

        if (filterParams.type) {
            const tipo = filterParams.type.toLowerCase();
            pokemonsFiltrados = pokemonsFiltrados.filter(pokemon => 
                pokemon.types.some(t => t.toLowerCase().includes(tipo))
            );
        }

        if (filterParams.order) {
            if (filterParams.order === 'desc') {
                pokemonsFiltrados.sort((a, b) => b.id - a.id);
            } else {
                pokemonsFiltrados.sort((a, b) => a.id - b.id);
            }
        } else {
            pokemonsFiltrados.sort((a, b) => a.id - b.id);
        }

        if (filterParams.limit) {
            pokemonsFiltrados = pokemonsFiltrados.slice(0, Number(filterParams.limit));
        }

        return pokemonsFiltrados;

    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

const getOnePoke = async (pokeId) => {
    try {
        const docRef = db.collection('pokemons').doc(String(pokeId));
        const doc = await docRef.get();

        if (!doc.exists) {
            throw {
                status: 400,
                message: `No se encuentra un pokemon con la id '${pokeId}'`,
            };
        }
        return doc.data();
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

const getOneGen = async (numGen) => {
    try {
        const datos = await db.collection('pokemons')
            .where('generation', '==', Number(numGen)) 
            .get();

        const pokemons = datos.docs.map(doc => doc.data());

        if (pokemons.length === 0) {
            throw {
                status: 400,
                message: `No se encontraron pokemons de la generación ${numGen}`,
            };
        }
        return pokemons;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

module.exports = {
    getAllPokes,
    getOnePoke,
    getOneGen
};