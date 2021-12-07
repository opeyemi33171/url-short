import express, { urlencoded } from "express";
import randomString from "randomstring";

let shortenedUrls = [];

const app = express();

app.use(express.static("static"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index.html")
});

app.post("/", (req, res) => {
    let short = ""
    if(shortenedUrls[req.body.url] == undefined){
        short = randomString.generate(5);

        shortenedUrls.push({
            [req.body.url]: short
        });
    }
    console.log(shortenedUrls);
    res.send(`localhost:2000/${short}`);
});

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