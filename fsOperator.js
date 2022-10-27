const fs = require("fs");
const path = require("path");

// fs.readFile('path','utf-8',(err,data)=>{})
console.log(path.join(__dirname, "/dataFolder/1.json"));

let a = {};

a.writeIntoJSON = function (data) {
  fs.writeFile(path.join(__dirname, "./dataFolder/1.json"), data, err => {
    if (err) return console.log(err);
    console.log("writeFile SUCCESS");
  });
};

module.exports = a;
