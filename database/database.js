import sqlite from "sqlite3";

export function connectDatabase() {
    return new sqlite.Database("./url-shorts.db", (err) => {
        if (err) {
            console.log(`error creating databbase connection: ${err.message}`);
            throw new Error(`error creating databbase connection: ${err.message}`);
        }
        console.info('connected to database');
    });
}
export function createUrlShortTable (db) {
    const createTableQuery = `CREATE TABLE shorts (id INT AUTO_INCREMENT,
        url VARCHAR(255), short VARCHAR(255), PRIMARY KEY(id));
      )`

    db.run(createTableQuery, (err) => {
        if(err){
            throw new Error(`error creating shorts table: ${err.message}`);ßs
        }

        console.log("created url shorts table");
    });
}