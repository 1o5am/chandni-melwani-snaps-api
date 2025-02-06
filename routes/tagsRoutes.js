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

// const getTagsData = () => {
//     const data = fs.readFileSync(photosFilePath, 'utf8');
//     const photos = JSON.parse(data);

//     // Extract unique tags
//     const allTags = new Set();
//     photos.forEach(photo => {
//         if (Array.isArray(photo.tags)) {
//             photo.tags.forEach(tag => allTags.add(tag));
//         }
//     });

//     return Array.from(allTags); // Convert Set to array
// };

// // ✅ GET all unique tags
// router.get('/', (req, res) => {
//     try {
//         const tags = getTagsData();
//         res.json(tags);
//     } catch (error) {
//         console.error("Error reading tags:", error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// module.exports = router;