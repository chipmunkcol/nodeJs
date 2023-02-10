const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

const { MongoClient, ServerApiVersion, Db, Collection } = require('mongodb');
const uri = "mongodb+srv://nodejs:q1w2e3r4@cluster0.e9z3hma.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
    console.log('err: ', err);
    client.close();
    
}).then(async()=>{
    console.log('hello, mongoDB!')
});



app.listen(3000, ()=>{
    console.log('listening on 3000')
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});
app.get('/write', (req, res) => {
    res.sendFile(__dirname + '/write.html')
});

app.post('/submit', async(req, res) => {
    // res.send('전송완료!');
    // console.log(req.body.todo);
    
    const postDB = await client.db('todoApp').collection('post').insertOne({todo: req.body.todo, due: req.body.due})
    console.log('몽고디비 저장완료', postDB)
});