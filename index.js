import express from "express";

let shortenedUrls = [];


const app = express();

app.get("/", (req, res) => {
    res.send("Welcome Opey!");
});

app.listen(2000, () => {
    console.log('Listen at port: 2000');
});