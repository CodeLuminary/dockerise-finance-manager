const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const { resolve } = require('path');
const location = "./models/fm.db";

let db = new sqlite3.Database(location);let dbAll, dbRun;

//init()
//seedDb();

function init() {
    const dirName = require('path').dirname(location);
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName, { recursive: true });
    }
    return "database created successfully"
}

async function seedDb(){
    //db = new sqlite3.Database(location);

    let sql = `CREATE TABLE IF NOT EXISTS income_expense (id INTEGER PRIMARY KEY AUTOINCREMENT, type SMALLINT(1), title VARCHAR(100), description TEXT, amount double, transaction_date int, is_recurrent SMALLINT(1), recurrency tinyint)`;

    await db.run(sql);

    sql = `CREATE TABLE IF NOT EXISTS asset_liability (id INTEGER PRIMARY KEY AUTOINCREMENT, type SMALLINT(1), title VARCHAR(100), description TEXT, amount double, transaction_date int, change_rate double, change_duration int)`;

    await db.run(sql);

    sql = `CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, currency VARCHAR(10), name VARCHAR(100), logo VARCHAR(100), location VARCHAR(200))`;
    await db.run(sql);

    //sql = `CREATE TABLE IF NOT EXISTS `
    await db.run(`INSERT INTO settings (currency, location) VALUES ('USD', 'United State of America')`)
        
}

async function teardown() {
    return new Promise((acc, rej) => {
        db.close(err => {
            if (err) rej(err);
            else acc();
        });
    });
}

async function getItems(table) {
    return new Promise((acc, rej) => {
        db.all(`SELECT * FROM ${table}`, (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map(item =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                ),
            );
        });
    });
}

async function getItem(table,id) {
    return new Promise((acc, rej) => {
        db.all(`SELECT * FROM ${table} WHERE id=?`, [id], (err, rows) => {
            if (err) return rej(err);
            acc(
                rows.map(item =>
                    Object.assign({}, item, {
                        completed: item.completed === 1,
                    }),
                )[0],
            );
        });
    });
}

async function addIncomeExpense(item) {
    console.log(Date.parse(item.transaction_date), 'number value');
    console.log(item.transaction_date, 'main date')
    item.transaction_date = Date.parse(item.transaction_date);
    console.log(Number(item.transaction_date), "trans date");
    return new Promise((acc, rej) => {
        item.transaction_date = new Date()
        db.run(
            `INSERT INTO income_expense (type, title, description, amount, is_recurrent, recurrency, transaction_date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [item.type, item.title, item.description, item.amount, item.is_recurrent, item.recurrency, item.transaction_date ],
            (err, data) => {
                if (err) return rej(err);
                acc({
                    isSuccessful: true,
                    data
                });
            },
        );
    });
}

async function addAssetLiability(item) {
    return new Promise((acc, rej) => {
        item.transaction_date = new Date()
        db.run(
            `INSERT INTO asset_liability (type, title, description, amount, change_rate, change_duration) VALUES (?, ?, ?, ?, ?, ?)`,
            [item.type, item.title, item.description],
            (err, data) => {
                if (err) return rej(err);
                acc({
                    isSuccessful: true,
                    data
                });
            },
        );
    });
}

async function updateSettings(items) {
    return new Promise((acc, rej) => {
        let query = `UPDATE settings SET `;
        let values = [];
        for(let key in items){
            query += `${key}=?, `;
            values.push(items[key])
        }
        query = query.slice(0,-2);
        query += ` WHERE id=1`;
        db.run(
            query,
            values,
            err => {
                if (err) return rej(err);
                acc({
                    isSuccessful: true
                });
            },
        );
    });
} 

async function removeItem(id) {
    return new Promise((acc, rej) => {
        db.run('DELETE FROM todo_items WHERE id = ?', [id], err => {
            if (err) return rej(err);
            acc({
                isSuccessful: true
            });
        });
    });
}

async function getFinancialStatement(dataObject){
    console.log(dataObject, "obj")
    const from = Date.parse(dataObject.from); console.log(from, 'from');
    const to = Date.parse(dataObject.to);
    return new Promise((acc,rej)=>{
        const income_expenses = new Promise((resolve,reject)=>{
            db.all(`SELECT * FROM income_expense WHERE transaction_date > ${from}`, (err, data)=>{
                if(err) reject(err)
                else {console.log(JSON.stringify(data), 'data1');resolve(data)}
            })
        })

        const asset_liabilities = new Promise((resolve,reject)=>{
            db.all(`SELECT * FROM asset_liability WHERE transaction_date BETWEEN '${dataObject.from}' AND '${dataObject.to}'`, (err, data)=>{
                if(err) reject(err)
                else {console.log(data, 'data2');resolve(data)}
            })
        })
        
        Promise.allSettled([income_expenses, asset_liabilities])
        .then(results=>console.log(results[1].value,'after'))
        .catch(error=>console.log(error, 'error'))
    })
}

module.exports = {
    init,
    seedDb,
    getItems,
    getItem,
    addIncomeExpense,
    addAssetLiability,
    updateSettings,
    removeItem,
    getFinancialStatement
}