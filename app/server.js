const express = require('express');
//const datetime = require('node-datetime');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());

//app.use(bodyParser.json());

app.use(express.json());
app.use(express.static(__dirname));

const {updateSettings, addAssetLiability, addIncomeExpense, getFinancialStatement, seedDb} = require('./models/sqlite')

seedDb();

app.post('/add-asset-liability',(req,res)=>{
    //const dt = datetime.create();
    //req.body.transaction_date = dt.format('Y-m-d H:M:S');
    addAssetLiability(req.body)
    .then(result=>res.send(result));
})
app.post('/add-income-expense',(req,res)=>{
    addIncomeExpense(req.body)
    .then(result=>res.send(result));
})
app.post('/change-settings',(req,res)=>{
    updateSettings(req.body)
    .then(result=>res.send(result));
})
app.post('/get-financial-statement',(req,res)=>{
    getFinancialStatement(req.body)
    .then(result=>res.send(result));
})
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'))
})

app.all('/*',(req,res)=>{
     res.sendFile(path.join(__dirname,'index.html'))
 })

const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`Server ${process.pid} started on port ${port}`)
});