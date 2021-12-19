import randomString from "randomstring";

function returnHomePage() {
    return (req, res) => {
        res.render("index.html");
    };
}

function insertUrlItem(db){
    const insertUrl = `INSERT INTO shorts(url, short) VALUES(?,?)`;
    return (req, res) => {

        //TODO remove code below and add db insert sql query code above.
        let short = "";
        if (shortenedUrls[req.body.url] == undefined) {
            short = randomString.generate(5);
            
            db.run(insertUrl, )

            shortenedUrls.push({
                [req.body.url]: short
            });
        }
        console.log(shortenedUrls);
        res.send(`localhost:2000/${short}`);
    };
}

export default {returnHomePage, insertURLItem: insertUrlItem};
