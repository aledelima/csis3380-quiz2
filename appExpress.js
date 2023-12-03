const express = require('express');
const MongoClient = require('mongodb');

const app = express();
const port = 3000;

const mongoURI = 'mongodb://localhost:27017/Exams23001';

app.get('/', async (req, res) => {
    try {
        const client = new MongoClient(mongoURI, { useNewUrlParser: true});
        await client.connect();

        const db = client.db('Exams23001');
        const collection = db.collection('quizexamrecords');

        const data = {
            name: 'Alessandro Santos de Lima',
            sid: '300340437'
        };

        const result = await collection.insertOne(data);

        await client.close();

        res.status(200).json({ message: 'Document created', documentId: result.insertedId })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http:localhost:${port}`);
})