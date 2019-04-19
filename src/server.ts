import express from "express";
import { hello } from "./hello-world";

const app = express();

app.get("/", (req, res) => {
    res.send(hello());
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
     console.log(`Server is running in http://localhost:${PORT}`)
});