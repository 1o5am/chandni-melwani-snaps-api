import { timeStamp } from 'console';
import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const data = fs.readFileSync("./data/photos.json", 'utf8');
const photos = JSON.parse(data);


router.get("/", (req, res) => {
    try {
        const data = fs.readFileSync("./data/photos.json", 'utf8');
        const photos = JSON.parse(data);
        console.log(photos);
        res.status(200).json(photos);
    } catch (error) {
        console.error("Error reading photos:", error);
        res.status(500).json({ error: error });
    }
});

router.get("/:id", (req, res) => {
    try {
        const data = fs.readFileSync("./data/photos.json", 'utf8');
        const photos = JSON.parse(data);

        const { id } = req.params;
        console.log(id, photos);

        const photo = photos.find((photo) => photo.id === id);
        console.log(photo);
        if (!photo) {
            return res.status(404).json({ error: "Photo not found" });
        }
        res.status(200).json(photo);
    } catch (error) {
        console.error("Error reading photos:", error);
        res.status(500).json({ error: error });
    }
})

router.get("/:id/comments", (req, res) => {
    try {
        const data = fs.readFileSync("./data/photos.json");
        const photos = JSON.parse(data);
        const photo = photos.find((comment) => comment.id === req.params.id);
        res.status(200).json(photo.comments);
    }
    catch (error) {
        console.error("Error reading comments:", error);
        res.status(500).json({ error: error});
    }
})

router.post("/:id/comments", (req, res) => {
    try {
        const data = fs.readFileSync("./data/photos.json");
        const photos = JSON.parse(data);
        console.log(req.body)
        const newComment = { 
            ...req.body,
            id: uuidv4(),
            timestamp: Date.now()
        }
        console.log(newComment)
        const { id } = req.params
        const photo = photos.find((photo) => photo.id === id);
        photo.comments.push(newComment)
        console.log(photo)
        fs.writeFileSync("./data/photos.json", JSON.stringify(photos))
        res.status(201).json(newComment);
    }
    catch(error) {
        console.error("Error adding comment:", error);
        res.status(500).json({error: error})

    } 
})

export default router;