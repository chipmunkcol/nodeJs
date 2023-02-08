0. 바닥에서 node Js 사용하기
1. express 라이브러리 설치 및 실행
    - npm init (package.json)
    - npm install express
    
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
    });