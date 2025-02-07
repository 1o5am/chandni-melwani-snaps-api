import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/', (req, res) => {
    try {
        const data = fs.readFileSync("./data/tags.json");
        const tags = JSON.parse(data);
        console.log(tags);
        res.status(200).json(tags);
    } catch (error) {
        console.error("Error reading tags:", error);
        res.status(500).json({ error: error });
    }
});

export default router;
