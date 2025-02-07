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

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

