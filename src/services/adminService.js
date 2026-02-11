const Admin = require("../database/Admin"); 


const getAllAdmins = async () => {
    try {
        const allAdmins = await Admin.getAllAdmins();
        return allAdmins;
    } catch (error) {
        throw error;
    }
}

const validateApiKey = async (apiKey) => {
    try {
        if (!apiKey) return false;
        
        const admin = await Admin.getAdminByApiKey(apiKey);
        
        return !!admin; 
    } catch (error) {
        return false;
    }
}

module.exports = {
    getAllAdmins,
    validateApiKey,
};