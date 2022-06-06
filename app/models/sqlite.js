const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const location = "./models/fm.db";

let db, dbAll, dbRun;

//init()
seedDb();

function init() {
    const dirName = require('path').dirname(location);
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName, { recursive: true });
    }
    return "database created successfully"
}

function seedDb(){
    return new Promise((acc, rej) => {
        db = new sqlite3.Database(location, err => {
            if (err) return rej(err);

            let sql = `CREATE TABLE IF NOT EXISTS income_expense (id int, type SMALLINT(1), title VARCHAR(100), description TEXT, amount double, transaction_date datetime, is_recurrent SMALLINT(1), recurrency tinyint, PRIMARY KEY(id))`;

            db.run(sql, (err, result) => {
                    if (err) return rej(err);
                    acc();
                },
            );

            sql = `CREATE TABLE IF NOT EXISTS asset_liability (id int, type SMALLINT(1), title VARCHAR(100), description TEXT, amount double, transaction_date datetime, change_rate double, change_duration int, PRIMARY KEY(id))`;

            db.run(sql, (err, result) => {
                    if (err) return rej(err);
                    acc();
                },
            );

            sql = `CREATE TABLE IF NOT EXISTS income_expense (id int, currency VARCHAR(10), name VARCHAR(100), logo VARCHAR(100), location VARCHAR(200), PRIMARY KEY(id))`;

            db.run(sql, (err, result) => {
                    if (err) return rej(err);
                    acc();
                },
            );
        });
    });
}

module.exports = {

}