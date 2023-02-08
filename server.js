const express = require('express');
const app = express();

app.listen(3000, ()=>{
    console.log('되나용')
});

app.get('/pet', (req, res)=>{
    res.send('안녕하세용')
});