import express from "express";
import { UrlShortner } from "./url-shorter.js";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const app = express();
app.use(express.static("views"));
app.use(express.urlencoded({extended: true}));

const dbClient = new DynamoDBClient({region: "us-east-1"});

const shortnedUrlLength = 5;
const urlShortner = new UrlShortner(dbClient, shortnedUrlLength);


app.get("/", urlShortner.renderHomePage());
app.post("/", await urlShortner.insertUrlItem());
//app.get("/:short", urlShortner.redirectToUrl());

app.listen(2000, () => {
    console.log('Listen at port: 2000');
});


