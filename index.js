import express from "express";
import { database} from "./database/database.js";
import  { views }  from "./views/view.js"

const app = express();

const db = database.connectDatabase();

database.createUrlShortTable(db)

app.use(express.static("static"));
app.use(express.urlencoded({extended: true}));

app.get("/", views.returnHomePage());
app.post("/", views.insertURLItem(db));
app.get("/:short", views.redirectToUrl());

app.listen(2000, () => {
    console.log('Listen at port: 2000');
});


