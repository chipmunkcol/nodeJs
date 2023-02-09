const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

app.listen(3000, ()=>{
    console.log('listening on http://localhost:3000')
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});
app.get('/write', (req, res) => {
    res.sendFile(__dirname + '/write.html')
});

app.post('/submit', (req, res) => {
    res.send('전송완료!')
});