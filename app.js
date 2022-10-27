const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const fsT = require("./fsOperator");
const sql = require("./connectMysql");
const router = require("./apiRouter");
const fs = require('fs')
const formidable = require("formidable");
const path = require("path");

// middleware
app.use(require("cors")());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// middleware END

// 挂载静态资源文件
app.use(express.static('public'))
// END

// middleware router
app.use("/api", router);
// middleware router END
// app.use(express.public("./public"));


app.get("/test", (req, res) => {
    res.send({
        name: "Tom", age: 18,
    });
});

app.post("/addKV", (req, res) => {
    console.log(req.body);
    let data = req.body;
    fsT.writeIntoJSON(JSON.stringify(data));
    res.send({
        name: "Tom", age: 18,
    });
});

app.post("/login", (req, res) => {
    const {username, password} = req.body;
    console.log(username, password);
    sql("select * from user where username = '" + username + "'", results => {
        if (results.length && username === results[0].username && password === results[0].password) {
            jwt.sign({username}, process.env.PRIVATE_KEY, {expiresIn: "1h"}, (err, token) => res.json({
                username,
                message: "登陆成功",
                token
            }));
            //传入键值对 私钥 配置
            console.log("登录成功");
        } else {
            res.sendStatus(401);
        }
    });
});

app.get('/', (req, res) => {
    res.send(`
    <h2>With <code>"express"</code> npm package</h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
});

app.post('/api/upload', (req, res) => {
    const form = new formidable.IncomingForm()
    form.uploadDir = path.join(__dirname, 'public')
    form.keepExtensions = true
    form.maxFileSize = 20 * 1024 * 1024
    form.parse(req, (err, fields, files) => {
        if (err) res.sendStatus(404)
        console.log(fields, 'fields---------------');
        // files.file   file是客户端自定义的name
        // fields是客户端自定义的其他数据
        let newName = path.join(__dirname, 'public', files.file.originalFilename)
        fs.rename(files.file.filepath, newName, err => {
            console.log(err)
        })
    });
    res.sendStatus(200)
});

app.get("/after-login", (req, res) => {
    const headers = req.headers;
    const token = headers["authorization"].split(" ")[1];
    console.log(token);
    jwt.verify(token, process.env.PRIVATE_KEY, (err, payload) => {
        if (err) res.sendStatus(403);
        res.json({message: "认证成功", payload});
    });
});


app.listen(7890, err => {})


