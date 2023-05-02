const express = require('express');
const app = express();
require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

client.connect(err => {
    if (err) {
        console.log('Failed to connect db ' + err);
    } else {
        console.log('Connect to db done!')
    }
});

const port = 3000;
app.listen(port, ()=>{console.log(`listening on port ${port}`)});


// page router
app.get('/', (req, res) => { 
    res.sendFile(__dirname + '/index.html');
});

app.get('/write', (req, res) => {
  res.sendFile(__dirname + '/write.html')
});


// api router
app.get('/getDB', async(req, res) => {

  try {
    const query = "SELECT * FROM todolist ORDER BY created";
    const dbData = (await client.query(query)).rows;
    res.send({ dbData });
  } catch (err) {
    console.log(err);
  }
});

app.post('/submit', async(req, res) => {
    const result = {};
    console.log(req.body);
    try {
      const query = `
      INSERT 
        INTO todolist 
          (todo, due, created)
        VALUES 
          (${req.body.todo}, ${req.body.due}, CURRENT_TIMESTAMP)`;
      const postDB = await client.query(query);
      result.result = true;
      result.data = postDB;
    } catch (err) {
      result.result = false;
    }
    
    res.send(result);
});

app.post('/delete', async(req, res) => {
  const result = {};
  try {
    const query = `DELETE FROM todolist WHERE id = ${req.body.id}`;
    const deleteDB = await client.query(query);
    result.result = true;
    result.data = deleteDB;
  } catch (err) {
    result.result= false;
  }
})


app.use((req, res) => {
  res.status(404).send('없는 주소입니다아아!!')
})



// const bodyParser = require('body-parser');
// require('dotenv').config()

// app.use(bodyParser.urlencoded({extended : true}));
// app.set('view engine', 'ejs')

// const { MongoClient, ServerApiVersion, Db, Collection } = require('mongodb');
// const uri = process.env.DB_API;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// const DB = client.db('todoApp')

// client.connect(err => {
//     console.log('err: ', err);
//     client.close();
    
// }).then(()=>{console.log('hello, mongoDB!')});

// app.post('/submit', async(req, res) => {
//     // console.log(req.body.todo);
//     const postDB = await DB.collection('post').insertOne({todo: req.body.todo, due: req.body.due})
//     console.log('몽고디비 저장완료', postDB)
// });

// app.get('/list', async(req, res) => {

//     const getDB = await DB.collection('post').find().toArray();
//     console.log(getDB)

//     res.render('list.ejs', { getDB });
// });
