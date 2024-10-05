const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; 
const dbName = 'Balance'; 

const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log('Conectado a la base de datos');
        const db = client.db(dbName);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

run().catch(console.error);
