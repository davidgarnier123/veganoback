require('dotenv').config();

const { MongoClient } = require('mongodb');

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/?retryWrites=true&w=majority&appName=Sudaudit`;

const client = new MongoClient(url);

async function connectToDB() {
    try {
        await client.connect();
        console.log('Connecté à la base de données MongoDB');
        return client;
    } catch (err) {
        console.error('Erreur de connexion à la base de données MongoDB', err);
    }
}

async function getDBClient() {
    try {
        if (!client || client === null) {
            client = new MongoClient(url);
            await client.connect();
            console.log('Connecté à la base de données MongoDB');
        }
        return client;
    } catch (err) {
        console.error('Erreur lors de la connexion à la base de données MongoDB', err);
        throw err;
    }
}

module.exports = { connectToDB, getDBClient };