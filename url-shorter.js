import  randomString from "randomstring";
import { v1 as uuidv1 } from "uuid";
import { GetItemCommand, PutItemCommand,} from "@aws-sdk/client-dynamodb";

export class UrlShortner {
    constructor(dbClient, urlShortLength){
        this.dbClient = dbClient;
        this.urlShortLength = urlShortLength;
    }

    renderHomePage() {
        return (req, res) => {
            res.render("index.html");
        };
    }

   async insertUrlItem(){
        return async(req, res) => {
            const shortUrl = this.generateUrlShort(this.urlShortLength);
            const shortId = uuidv1()

            const putParams = {
                TableName: "url-shorts",
                Item: {
                    short: {
                        S: req.body.url
                    },
                    url: {
                        S: shortUrl
                    },
                    id: {
                        S: shortId
                    }
                }
            };

            console.log({
                [req.body.url]: shortUrl
            });
    
            try{
                await this.dbClient.send(new PutItemCommand(putParams));
            }
            catch(err){
                throw new Error(`error putting url into db: ${err}`);
            }
            res.send(`localhost:2000/${shortUrl}`);
        };
    }

    generateUrlShort(length) {
        return randomString.generate(length);
    }

    async retrieveUrlItem(short) {
        let requestedUrlItem;
        const params = {
            TableName: "url-shorts",
            Key: {
                url: {
                    S: short
                }
            }
        };

        try{
            requestedUrlItem = this.dbClient.send(new GetItemCommand(params));
        }
        catch(err){
            throw new Error(`error getting url from db: ${err}`);
        };

        return requestedUrlItem;
    }


    async redirectToUrl() {
        return async(req, res) => {
            const short = req.params.short;
            const urlToUser = await this.retrieveUrlItem(short);
            console.log(urlToUser.TableName);
        }


        // let urlToRedirectTo = "";
        // return (req, res) => {
        //     shortenedUrls.forEach((url) => {
        //         const short = req.params.short;
        //         if (Object.values(url).includes(short)) {
        //             urlToRedirectTo =  Object.keys(url)[0];
        //         }
        //     });

        //     if(urlToRedirectTo === ""){
        //         console.log("short doesn't exist")
        //         res.send("short  't exist");
        //     }else {
        //         res.redirect(urlToRedirectTo);    
        //     }
        // }
    }
}