const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Load photos and comments data
const photosFilePath = path.join(__dirname, '../data/photos.json');
const commentsFilePath = path.join(__dirname, '../data/comments.json');

const getPhotosData = () => {
    const data = fs.readFileSync(photosFilePath, 'utf8');
    return JSON.parse(data);
};

const getCommentsData = () => {
    const data = fs.readFileSync(commentsFilePath, 'utf8');
    return JSON.parse(data);
};

// ✅ GET all photos
router.get('/', (req, res) => {
    try {
        const photos = getPhotosData();
        res.json(photos);
    } catch (error) {
        console.error("Error reading photos:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ✅ GET a single photo by ID (WITHOUT COMMENTS)
router.get('/:id', (req, res) => {
    try {
        const photos = getPhotosData();
        const photo = photos.find(photo => photo.id === req.params.id);

        if (!photo) {
            return res.status(404).json({ error: 'Photo not found' });
        }

        // Remove comments before sending the response
        const { comments, ...photoWithoutComments } = photo;
        res.json(photoWithoutComments);
    } catch (error) {
        console.error("Error fetching photo:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ✅ GET all comments for a specific photo
router.get('/:id/comments', (req, res) => {
    try {
        const commentsData = getCommentsData();
        const photoComments = commentsData.find(entry => entry.photoId === req.params.id);

        if (!photoComments) {
            return res.status(404).json({ error: 'Comments not found for this photo' });
        }

        res.json(photoComments.comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ✅ POST a new comment to a specific photo
router.post('/:id/comments', (req, res) => {
    try {
        const { name, comment } = req.body;
        const commentsData = getCommentsData();
        const photoComments = commentsData.find(entry => entry.photoId === req.params.id);

        if (!photoComments) {
            return res.status(404).json({ error: 'Photo not found for commenting' });
        }

        const newComment = {
            id: require('crypto').randomBytes(8).toString('hex'),
            name,
            comment,
            timestamp: Date.now()
        };

        photoComments.comments.push(newComment);

        // Save the updated comments.json file
        fs.writeFileSync(commentsFilePath, JSON.stringify(commentsData, null, 2));

        res.status(201).json(newComment);
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;