const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs')

const { MongoClient, ServerApiVersion, Db, Collection } = require('mongodb');
const uri = "mongodb+srv://nodejs:q1w2e3r4@cluster0.e9z3hma.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const DB = client.db('todoApp')

client.connect(err => {
    console.log('err: ', err);
    client.close();
    
}).then(()=>{
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

app.get('/list', async(req, res) => {

    const getDB = await DB.collection('post').find().toArray();
    console.log(getDB)

    res.render('list.ejs', { getDB });
});

app.post('/submit', async(req, res) => {
    // console.log(req.body.todo);
    
    const postDB = await DB.collection('post').insertOne({todo: req.body.todo, due: req.body.due})
    console.log('몽고디비 저장완료', postDB)
});