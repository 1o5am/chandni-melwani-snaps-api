import express from "express";
import cors from "cors";
import 'dotenv/config';
import photoRoutes from "./routes/photosRoutes.js";
import tagRoutes from "./routes/tagsRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/photos", photoRoutes);
app.use("/tags", tagRoutes);
app.get("/", (req, res) => {
    res.send("API is running");
});


// app.get("/photos/:id", function (req, res) {
//     const { photoID } = req.params;
//     console.log(photoID, photos);
//     const photo = photos.find((photo) => photo.id === photoID);
//     res.json(photoID);
// });
// app.use("/photos/:id/comments", photoRoutes) 


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

// import express from "express";
// import fs from "fs";
// import cors from "cors"; // Allow cross-origin requests

// const app = express(); // Initialize Express
// const PORT = process.env.PORT || 8080;


// // Middleware
// app.use(cors());
// app.use(express.json()); // Support JSON request bodies
// // Allow fonts and other static files to be served
// app.use(express.static("public"));

// // Set Content Security Policy headers to allow fonts
// app.use((req, res, next) => {
//     res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' data:;");
//     next();
// });

// app.get("/favicon.ico", (req, res) => res.status(204));



// app.get("/", (req, res) => {
//     res.send("API is running... Use /photos, /tags, etc.");
// });


// // GET all photos

// const fileData = fs.readFileSync("./data/photos.json");
// const photos = fileData.trim() ? JSON.parse(fileData) : []; // Handle empty file case

// app.get("/photos", (req, res) => {
//     try {
//         res.json(photos);
//     } catch (error) {
//         console.error("Error reading photos.json:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// // GET a single photo by ID
// const photo = photos.find((p) => p.id === req.params.id);
// app.get("/photos/:id", (req, res) => {
//     if (!photo) {
//         return res.status(404).json({ error: "Photo not found" });
//     }
//     res.json(photo);
// });


// // GET all tags
// const tags = JSON.parse(fs.readFileSync("./data/tags.json"));
// app.get("/tags", (req, res) => {
//     res.json(tags);
// });

// const comments = JSON.parse(fs.readFileSync("./data/comments.json"));

// app.get("/photos/:id/comments", (req, res) => {
//   const photoComments = comments.filter((comment) => comment.photoId === req.params.id);

//   if (!photoComments.length) {
//     return res.status(404).json({ message: "No comments found for this photo" });
//   }

//   res.json(photoComments);
// });

// // // GET comments for a photo
// // app.get("/photos/:id/comments", (req, res) => {
// //     const comments = JSON.parse(fs.readFileSync("./data/comments.json", "utf-8"));
// //     const photoComments = comments.filter((comment) => comment.photoId === req.params.id);
// //     res.json(photoComments);
// // });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// const express = require('express');
// const cors = require('cors');
// const app = express();
// const PORT = process.env.PORT || 8080;

// const photosRoutes = require('./routes/photos');
// const tagsRoutes = require('./routes/tags');

// app.use(cors());
// app.use(express.json()); // Ensures JSON request handling

// // Register routes
// app.use('/photos', photosRoutes);
// app.use('/tags', tagsRoutes);

// app.get('/', (req, res) => {
//     res.send("API is running... Use /photos, /tags, etc.");
// });

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });