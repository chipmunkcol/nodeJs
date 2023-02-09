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
    })
    
    //근데 그냥은 못 받고 
    npm install body-parser 받아야됨

    //server.js 
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended : true}));