const db = require("./firebase");

const getAllAdmins = async () => {
    try {
        const datos = await db.collection('admins').get();
        return datos.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        throw { 
            status: 500, 
            message: error?.message || "Error al obtener los administradores" 
        };
    }
};

const getAdminByApiKey = async (apiKey) => {
    try {
        if (!apiKey) throw new Error("La API Key es requerida");

        const snapshot = await db.collection('admins')
            .where('api_key', '==', apiKey)
            .limit(1)
            .get();

        if (snapshot.empty) {
            return null;
        }

        
        const doc = snapshot.docs[0];
        
        return {
            id: doc.id,
            ...doc.data()
        };

    } catch (error) {
        
        throw { 
            status: error.status || 500, 
            message: error?.message || "Error al validar la API Key" 
        };
    }
};

module.exports = {
    getAllAdmins,
    getAdminByApiKey
};