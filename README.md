0. 바닥에서 node Js 사용하기
1. express 라이브러리 설치 및 실행
    - npm init (package.json)
    - npm install express
    - npm install -g nodemon(서버 껐다 키기 귀찮으면 설치)
     > nodemon server.js (오류나면 구글링)
    
2. 서버생성
    //server.js 파일
    const express = require('express');
    const app = express();

    app.listen(3000, ()=>{
        console.log('되나용')
    });

3. Get (res, req)
    //server.js 파일
    app.get('URL', (req, res) => {
        res.send("여기에 원하는 html")
        res.sendFile(__dirname + '/index.html') //보통 요걸로 파일 불러옴
    });

4. Post
    index 에서 form 요따구로 작성해서 날리면 서버로감 오..
    <form action="/submit" method="post">
    
    app.post('URL', (req, res) => {
        res.send('전송완료')
        console.log(req.body); 
        (아래 body-parser 해주면 form에서 날린 input 값 받아오기 가능 input에 name="title" 붙여주면 각 input값 가져올 수 있음 )
    })
    
    //근데 그냥은 못 받고 
    - npm install body-parser 받아야됨

    //server.js 
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended : true}));

5. REST API(원칙!)
    1) Uniform interface
        - 하나의 자료는 하나의 URL로
        - URL 하나를 알면 둘을 알 수 있어야함
        - 요청과 응답은 정보가 충분히 들어있어야함
    2) Client-Server 역할구분
        - 브라우저는 요청만
        - 서버는 응답만
    3) Stateless
        - 요청1과 요청2는 의존성이 없어야함
    4) Cacheable (캐싱은 브라우저가 잘해줌)
    5) Layered System
    6) Code on Demand

6. mongoDB CRUD
    //server.js
    const { MongoClient, ServerApiVersion, Db, Collection } = require('mongodb');
    const uri = "mongodb+srv://nodejs:<password>@cluster0.e9z3hma.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    client.db('db이름').collection('collection이름').insertOne(저장할object)
    client.db('db이름').collection('collection이름').find().toArray(); 
    // toArray()  docs에 왜없냐 한참 찾았네;

7. ejs 사용(nodeJs 템플릿 엔진)
    - npm i ejs
    //views/index.ejs(폴더이름 고정)
    //server.js
    app.set('view engine', 'ejs') // import해야 rendering해줌

    const getDB = await DB.collection('post').find().toArray();
    // mongodb 서버에서 get 받아온거 list.ejs 파일에 변수로 넘겨줌
    res.render('list.ejs', { getDB });

    //list.ejs
    받은 변수 <%= getDB %> 문법으로 받을수 있음 ${} 이거랑 동일
    자바스크립트 코드는 <% %> 안에서 써주면됨 {} 이거랑 유사(줄 넘어가면 줄마다 <% %> 해줘야돼서 조금 더 번거로움)