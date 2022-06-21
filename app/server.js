const express = require('express');
var path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post('/add-asset-liability',(req,res)=>{

})
app.post('/add-income-expense',(req,res)=>{

})
app.post('/settings',(req,res)=>{

})
app.post('/get-financial-statement',(req,res)=>{
    
})

app.all('/*',(req,res)=>{
    res.status(404).send({
         404: 'Not Found!'
     })
     //res.sendFile(path.join(__dirname,'static/error-page.html'))  
 })

const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`Server ${process.pid} started on port ${port}`)
});