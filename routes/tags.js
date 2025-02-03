const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load photos data from JSON file
const photosFilePath = path.join(__dirname, '../data/photos.json');

const getTagsData = () => {
    const data = fs.readFileSync(photosFilePath, 'utf8');
    const photos = JSON.parse(data);

    // Extract unique tags
    const allTags = new Set();
    photos.forEach(photo => {
        if (Array.isArray(photo.tags)) {
            photo.tags.forEach(tag => allTags.add(tag));
        }
    });

    return Array.from(allTags); // Convert Set to array
};

// ✅ GET all unique tags
router.get('/', (req, res) => {
    try {
        const tags = getTagsData();
        res.json(tags);
    } catch (error) {
        console.error("Error reading tags:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;