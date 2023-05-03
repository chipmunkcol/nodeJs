0. 백엔드를 배워보자😎
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
    - npm install body-parser 받아야됨 (제발 잊지말자.. 🥲)

    //server.js 
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended : true}));

    => 🙌Express는 json(); urlencoded({ extended: false }); 메서드 사용
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
9. Express + PostgreSQL 연동하기 (매우 중요!!)
    
```
(1) pg(postgre) 라이브러리 설치 후 Client 메서드 사용
```

```
    const { Client } = require('pg');

    const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    });

```

```
(2) connect 메서드로 연결
```

```
    client.connect(err => {
        if (err) {
            console.log('Failed to connect db ' + err);
        } else {
            console.log('Connect to db done!')
        }
    });
```

```
(3) client.query 메서드로 연결된 DB와 통신
```

```
    app.get('/getDB', async(req, res) => {
        try {
            const query = `
            SELECT * FROM todolist 
            ORDER BY created`;
            const dbData = (await client.query(query)).rows;
            res.send({ dbData });
        } catch (err) {
            console.log(err);
        }
    });

    app.post('/postDB', async(req, res) => {
        const result = {};
        console.log(req.body);

        try {
            const query = `
            INSERT 
                INTO todolist 
                (todo, due, created)
                VALUES 
                ('${req.body.todo}', '${req.body.due}', CURRENT_TIMESTAMP)`;
            await client.query(query);
            result.result = true;
        } catch (err) {
            result.result = false;
        }
        res.send(result);
    });

    app.delete('/deleteDB', async(req, res) => {
        console.log(req.body);
        const result = {};
        try {
            const query = `
            DELETE FROM todolist 
            WHERE id = ${req.body.id}`;
            await client.query(query);
            result.result = true;
        } catch (err) {
            result.result= false;
        }

    res.send(result);
    })
```

10. 바닐라 js (react만 해서 몰랐는데 나 자바스크립트 개못함)

```
(1) 각종 메서드
```

```
    const class = document.querySelector('.class') // className='class' 값 가져오기
    const id = document.querySelector('#id') // id='id' 값 가져오기

    // html값 js로 만들어서 붙이기
    const divContainer = document.querySelector('#container')
    const divElement = document.createElement('div');
    divElement.textContent = '야호';

    const btnElement = document.createElement('button');
    btnElement.textContent = '버튼!';

    divElement.appendChild(btnElement);
    divContainer.appendChild(divElement);
```

```
(2) fetch로 통신 할 때 get은 body값 안쓰니까 괜찮은데 post 같은거는 설정을 해줘야 넘어감. (Be 에서도 body-parser 같은거 설정해줘야 받음)
```

```
    fetch('/postDB', {
        method: 'post',
        body: JSON.stringify({ todo, due }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    // formData는 headers 값 설정 안해줘도 자동으로 
    'Content-Type': 'multipart/form-data' 타입으로 설정됨.

    const formData = new FormData();
    formData.append('key', 'value');

    fetch('url', {
        method: 'post',
        body: formData
    })

```

```
(3) <script src='./main.js'></script> 자바스크립트 위치에 따라 불러오는 순서가 다름(중요)! 
html요소를 가져오는 코드가 있는데 html 보다 상단에서 호출되는 경우 오류가 뜸.
```

```
    상단에서 호출했던 코드를 body 제일 아래로 옮겨줌.
    그냥 호출했던 fetch() 함수를 window.onload 시에 호출되도록 함.

    <script>
    window.onload = () => {
        getDataBase();
    }
    </script>

```

```
(4) 리팩토링
``` 

```
    <form id="todoForm"></form>
    const form = document.querySelector('#todoForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        fetch('/postDB', {
            method: 'POST',
            body: formData
        })
        .then(async(res) => {
            const result = await res.json();

            if (result.result)
            window.location.href = "/";
        })
        .catch( err => console.log(err) )
    })
            
    위에 fetch 함수로 호출했던 거 아래 form태그로 한줄로 호출함..
    e.prevenDefault(); 랑 url 바뀌는 문제 때문에 fetch 썼는데
    BE 단에서 res.redirect('/'); 로 해결했음!

    => <form method="post" action="/postDB">
```

5. REST API(원칙!)
    (1) Uniform interface
        - 하나의 자료는 하나의 URL로
        - URL 하나를 알면 둘을 알 수 있어야함
        - 요청과 응답은 정보가 충분히 들어있어야함
    (2) Client-Server 역할구분
        - 브라우저는 요청만
        - 서버는 응답만
    (3) Stateless
        - 요청1과 요청2는 의존성이 없어야함
    (4) Cacheable (캐싱은 브라우저가 잘해줌)
    (5) Layered System
    (6) Code on Demand

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

8. nodeJs+Express 서버와 React 연동하기!
    - react는 기본적으로 build해서 html파일이 하나여서
    app.use(express.static(path.join(__dirname, 'react-project/build')));

    app.get('/', (res, req) => {
        req.sendFile(path.join(__dirname, 'react-project/build/index.html'));
    });

    react는 react-router 사용하니까 밑에 코드 추가해줘야 router가 정상 작동함!
    app.get('*', (res, req) => {
        req.sendFile(path.join(__dirname, 'react-project/build/index.html'));
    });

    api호출은 밑에 코드처럼! (하던대로 프론트에서 api콜하면 DB에 있는자료 json형태로 쏴줌)
    app.get('api/url', async(res, req) => {
        const DB_data = await client.db.collection.find().toArray(); (mongoDB)
        req.json(DB_data)
    });
