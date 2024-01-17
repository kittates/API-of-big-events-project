//建立MySQL连接池对象
const mysql = require('mysql');

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'wangzhe2412',
    database: 'my_db_01'
})

module.exports = db;