import randomString from "randomstring";

let shortenedUrls = [];

export function returnHomePage() {
    return (req, res) => {
        res.render("index.html");
    };
}

export function insertUrlItem(db){
    const insertUrl = `INSERT INTO shorts(url, short) VALUES(?,?)`;
    return (req, res) => {

        //TODO remove code below and add db insert sql query code above.
        let short = "";
        if (shortenedUrls[req.body.url] == undefined) {
            short = randomString.generate(5);
            
            db.run(insertUrl,[req.body.url], short)

            shortenedUrls.push({
                [req.body.url]: short
            });
        }
        console.log(shortenedUrls);
        res.send(`localhost:2000/${short}`);
    };
}

export function redirectToUrl() {
    return (req, res) => {
        shortenedUrls.forEach((url) => {
            if (Object.values(url).includes(req.params.short)) {
                res.redirect(Object.keys(url)[0]);
            }
        });

        console.log("short doesn't exist")
        res.send("short doesn't exist");
    };
}

