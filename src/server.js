import express from 'express';
import dotenv from 'dotenv';
import { getFakeDataFromDB } from './fakeDb.js';
import { getOrSetCache } from './cache.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/data', async (req, res) => {
    try {
        const data = await getOrSetCache('data', getFakeDataFromDB, 10);
        res.json({ source: 'response', data });
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
