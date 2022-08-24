import randomString from "randomstring";

let shortenedUrls = [];

export function returnHomePage() {
    return (req, res) => {
        res.render("index.html");
    };
}

export function insertUrlItem(db){
    return (req, res) => {
        const short = randomString.generate(5);
        const putParams = {
            TableName: "url-shorts",
            Item: {
                short: req.body.url,
                url: short,
                id: 3
            }
        };
        console.log({
            [req.body.url]: short
        });

       db.put(putParams, (err, data) => {
           console.log(`error: ${err}`);
       })
        res.send(`localhost:2000/${short}`);
    };
}

export function redirectToUrl() {
    let urlToRedirectTo = "";
    return (req, res) => {
        shortenedUrls.forEach((url) => {
            if (Object.values(url).includes(req.params.short)) {
                urlToRedirectTo =  Object.keys(url)[0];
            }
        });

        if(urlToRedirectTo === ""){
            console.log("short doesn't exist")
            res.send("short doesn't exist");
        }

        res.redirect(urlToRedirectTo);    
    };
}

