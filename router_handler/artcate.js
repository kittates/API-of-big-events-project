const db = require('../db/index.js');

//获取文章
getArticleCates = (req,res) => {
    const sql1 = "select * from ev_article_cate where is_delete = 0 order by id asc";
    db.query(sql1,(err,results) => {
        if(err) return res.cc(err.message);
        if(results.length <1) return res.cc("没有文章");
        res.send({
            status: 0,
            message: "获取文章成功",
            data: results
        })
    })
}
//添加文章
addArticleCates = (req,res) => {
    const sql2 = "select * from ev_article_cate where name = ? or alias = ?";
    let name = req.body.name;
    let alias = req.body.alias;
    db.query(sql2,[name,alias],(err,results) => {
        if(err) return res.cc(err.message);
        if(results.length == 2) return res.cc("分类名和别名均被占用");
        if(results.length == 1) {
            if(name === results[0].name) return res.cc("分类名被占用");
            else if(alias === results[0].alias) return res.cc("别名被占用");
            else return res.cc("未知错误");
        }
        else {
            const sql3 = "insert into ev_article_cate set ?";
            db.query(sql3,req.body,(err,results) => {
                if(err) return res.cc(err.message);
                if(results.affectedRows !==1) return res.cc("插入失败");
                res.cc("插入成功",0);
            })
        }
    });
    
}
//删除文章,逻辑删除
deleteCateById = (req,res) => {
    const sql4 = "select * from ev_article_cate where id = ?";
    db.query(sql4,[req.params.id],(err,results) => {
        if(err) return res.cc(err.message);
        if(results.length !==1) return res.cc("待删除文章不存在");
        const sql5 = "update ev_article_cate set is_delete = 1 where id = ?";
        db.query(sql5,req.params.id,(err,results) => {
            if(err) return res.cc(err.message);
            if(results.affectedRows !==1) return res.cc("删除失败");
            res.cc("删除成功",0);
        })  
    })
}
//根据id获取文章
getArticleById = (req,res) => {
    //将已经逻辑删除的文章过滤掉=> is_delete=0
    const sql6 = "select * from ev_article_cate where id = ? and is_delete = 0";
    db.query(sql6,req.params.id,(err,results) => {
        if(err) return res.cc(err.message);
        if(results.length !== 1) return res.cc("没有对应该id文章");
        res.send({
            status: 0,
            message: "获取成功",
            data: results[0]
        })
    })
}
//根据id更新文章
updateCateById = (req,res) => {
    //对于已经逻辑删除的文章，允许重名
    const sql7 = "select * from ev_article_cate where id != ? and (name =? or alias =?) and is_delete = 0";
    db.query(sql7,[req.body.id,req.body.name,req.body.alias],(err,results) => {
        if(err) return res.cc(err.message);
        if(results.length ==2) return res.cc("分类名和别名均冲突");
        else if(results.length ==1) {
            if(results[0].name == req.body.name) return res.cc("分类名冲突");
            else if(results[0].alias == req.body.alias) return res.cc("别名冲突")
        }
        const sql8 = "update ev_article_cate set ? where id = ?";
        db.query(sql8,[req.body,req.body.id],(err,results) => {
            if(err) return res.cc(err.message);
            if(results.affectedRows !==1) return res.cc("更新失败");
            res.cc("更新成功",0);
        })
    })
}

module.exports = {
    getArticleCates,
    addArticleCates,
    deleteCateById,
    getArticleById,
    updateCateById
}