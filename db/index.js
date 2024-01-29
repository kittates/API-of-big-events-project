//建立MySQL连接池对象
const mysql = require('mysql');
const config = require("../config.js");

const db = mysql.createPool({
    host: '127.0.0.1',
    user: config.dbUser,
    password: config.dbPassword,
    database: 'my_db_01'
})

module.exports = db;
