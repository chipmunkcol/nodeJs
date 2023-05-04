import express from 'express';
const app = express();
const port = 3000;

// 밑에 미들웨어 써야지 api 통신됨! 주의하자
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, ()=>{console.log(`listening on port ${port}`)});


import router from './src/app/config/router.config.js';
router.route(app);









































// const bodyParser = require('body-parser');

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
