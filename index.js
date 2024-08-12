import express from "express";
import cors from "cors";
import Route from './routes/route.js';

const app = express();
const PORT = 5000; // Anda dapat mengganti port sesuai kebutuhan

app.use(cors());
app.use(express.json());
app.use(Route);

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}...`);
    console.log(`Accessible routes:`);
    console.log(`- POST http://localhost:${PORT}/create-book (Create a book)`);
});
