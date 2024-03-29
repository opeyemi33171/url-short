import express from "express";
import { UrlShortner } from "./url-shorter.js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const app = express();
app.use(express.static("views"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

const dbClient = new DynamoDBClient({region: "us-east-1"});

const shortnedUrlLength = 5;
const urlShortner = new UrlShortner(dbClient, shortnedUrlLength);

app.get("/", urlShortner.renderHomePage());
app.post("/", await urlShortner.insertUrlItem());

app.get("/url", urlShortner.renderUrlPage());

app.get("/[A_Za-z0-9]*/", await urlShortner.redirectToUrl());


app.listen(2000, () => {
    console.log('Listen at port: 2000');
});


