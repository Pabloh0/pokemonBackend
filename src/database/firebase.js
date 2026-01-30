const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

let serviceAccount;

if (process.env.FIREBASE_PRIVATE_KEY) {
    serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };
} else {
    serviceAccount = require('../../config/backendpokemon-firebase-adminsdk-fbsvc-6f68f9824b.json');
}

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = db;