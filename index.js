import express from "express";
import {connectDatabase, createUrlShortTable} from "./models/database.js";
import  { returnHomePage, insertUrlItem, redirectToUrl }  from "./controllers/view.js"
import aws from "aws-sdk";

const app = express();

const dbClient = new aws.DynamoDB.DocumentClient();

const db = connectDatabase();
createUrlShortTable(db)

app.use(express.static("views"));
app.use(express.urlencoded({extended: true}));

app.get("/", returnHomePage());
app.post("/", insertUrlItem(dbClient));
app.get("/:short", redirectToUrl());

app.listen(2000, () => {
    console.log('Listen at port: 2000');
});


