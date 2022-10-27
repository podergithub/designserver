require("dotenv").config();
const mysql = require("mysql");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

function executeQuery(sql, cb) {
  pool.query(sql, (error, results, fields) => {
    if (error) console.log(error);
    cb(results);
  });
}

module.exports = executeQuery;
