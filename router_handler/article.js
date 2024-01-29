const db = require('../db/index.js');
const path = require('path');
const fs = require('fs');


addArticle = (req,res) => {
    if(!req.file || req.file.fieldname !== "cover_img") return res.cc("文章封面是必选参数");
    let articleInfo = {
        ...req.body,
        cover_img: path.join("/uploads",req.file.originalname),
        pub_date: new Date(),
        author_id: 1 //req.auth.id
    }
    const sql = "insert into ev_articles set ?";
    db.query(sql,articleInfo,(err,results) => {
        if(err) return res.cc(err.message);
        if(results.affectedRows !==1) return res.cc("发布文章失败");
        res.cc("发布文章成功",0);
    })
}

module.exports = {
    addArticle,
}