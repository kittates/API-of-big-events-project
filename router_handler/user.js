const db = require('../db/index.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config.js')

module.exports.reguser = (req,res) => {
    //用户名和密码合法性 等级太低了
    let userinfo = req.body;
    // if(userinfo.username === '' || userinfo.password === '') return res.cc("用户名或密码不能为空");
    //用户名是否重复
    const sql1 = "select * from ev_users where username = ?";
    db.getConnection((err,connection) => {
        if(err) return res.cc("1数据库连接失败" + err.message);
        db.query(sql1,[userinfo.username],(err,results) => {
            if(err) return res.cc("1查询失败 " + err.message);
            if(results.length > 0) return res.cc("用户名已被占用!");
            //密码加密 
            userinfo.password = bcrypt.hashSync(userinfo.password,10);
            //插入新用户
            const sql2 = "insert into ev_users set ?";
            db.getConnection((err,connection1) => {
                if(err) return res.cc("2数据库连接失败" + err.message);
                db.query(sql2,{username:userinfo.username,password:userinfo.password},(err,results) => {
                    if(err) return res.cc("2查询失败 "+err.message);
                    if(results.affectedRows !== 1) return res.cc("注册用户失败");
                    res.cc("注册成功",0);
                })
                connection1.release();
            })
        })
        connection.release();
    })
}

module.exports.login = (req,res) => {
    let userinfo = req.body;
    // 根据用户名查询用户数据
    const sql = "select * from ev_users where username = ?";
    db.getConnection((err,connection) => {
        if(err) return res.cc("1数据库连接失败" + err.message);
        db.query(sql,[userinfo.username],(err,results) => {
            if(err) return res.cc("1查询失败 " + err.message);
            if(results.length !== 1) return res.cc("用户不存在，登陆失败");
            // 验证用户输入密码正确性
            let compareResult = bcrypt.compareSync(userinfo.password,results[0].password);
            if(!compareResult) return res.cc("密码错误，登陆失败");
            // 登陆时生成token
            let tokenStr = jwt.sign({...results[0],password: '',user_pic: ''},config.secretKey,{expiresIn: config.expiresIn});
            res.send({
                status: 0,
                message: '登陆成功',
                token: "Bearer "+tokenStr
            })


        })

        connection.release();
    })
}