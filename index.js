import express from "express";
import database from "./database/database.js";
import  views from "./views/view.js"

let shortenedUrls = [];

const app = express();

const db = database.connectDatabase();

database.createUrlShortTable(db)

app.use(express.static("static"));
app.use(express.urlencoded({extended: true}));

app.get("/", views.returnHomePage());

app.post("/", views.insertURLItem(db));

app.get("/:short", (req, res) => {
    shortenedUrls.forEach((url) => {
        if(Object.values(url).includes(req.params.short)){
            res.redirect(Object.keys(url)[0]);
        }
    });

    res.send("short doesn't exist");
});

app.listen(2000, () => {
    console.log('Listen at port: 2000');
});
