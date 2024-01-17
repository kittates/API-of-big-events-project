const db = require('../db/index.js')
const bcrypt = require('bcryptjs');

//获取用户信息，login后token在调用expressJWT后自动挂在到req.auth上
getUserinfo = (req,res) => {
    const sql = "select id,username,nickname,email,user_pic from ev_users where id = ?";
    db.getConnection((err,connection) => {
        if(err) return res.cc('1数据库连接失败 '+err.message);
        db.query(sql,[req.auth.id],(err,results) => {
            if(err) return res.cc('1查询失败 '+err.message);
            if(results.length !==1 ) return res.cc("获取用户信息失败");            
            res.send({
                status: 0,
                message: "获取用户信息成功",
                data: results[0]//密码剔除了
            })
        })
        connection.release();
    })
}
//更新用户信息
updateUserinfo = (req,res) => {
    const sql2 = "update ev_user set ? where id = ";
    db.getConnection((err,connection) => {
        if(err) return res.cc("2数据库连接失败 "+err.message);
        db.query(sql2,[req.auth,req.auth.id],(err,results) => {
            if(err) return res.cc("2查询失败 "+err.message);
            if(results.affectedRows !== 1) return res.cc("用户不存在");
            res.send("修改成功",0);
        })
        connection.release();
    }) 

}
//更新密码
updatePassword = (req,res) => {
    //查询MySQL中的旧密码是否与输入的密码一致
    const sql2 = "select * from ev_users where id = ?";
    db.getConnection((err,connection) => {
        if(err) return res.cc(err);
        db.query(sql,[req.auth.id],(err,results) => {
            if(err) return res.cc("查询失败");
            let compareResult = bcrypt.compareSync(req.body.oldPwd,results[0].password);
            if(!compareResult) return res.cc("原密码输入错误");
            //将新密码存入到mysql中
            let newPwd = bcrypt.hashSync(req.body.newPwd,10);
            const sql3 = "update ev_users set password = ? where id = ?";
            db.getConnection((err,connection) => {
                if(err) return res.cc(err);
                db.query(sql3,[newPwd,req.auth.id],(err,results) => {
                    if(err) return res.cc(err);
                    if(results.affectedRows !==1) return res.cc("更新失败");
                    res.cc("更新成功",0);
                })
                connection.release();
            })
            connection.release();
        })
    })


}
//更新头像
updateAvatar = (req,res) => {
    const sql = "update ev_users set user_pic = ? where id = ?";
    db.getConnection((err,connection) => {
        if(err) return res.cc("连接失败");
        db.query(sql,[req.body.avatar,req.auth.id],(err,results) => {
            if(err) return res.cc(err);
            //更新成功后affectedRows为1
            if(results.affectedRows !==1) return res.cc("头像更新失败");
            res.cc("头像更新成功",0);
        })
        connection.release();
    })
}

module.exports = {
    getUserinfo,
    updateUserinfo,
    updatePassword,
    updateAvatar,
}
