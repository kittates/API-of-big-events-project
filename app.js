const express = require('express')
const app = express();
const cors = require('cors');
const userRouter = require('./router/user.js');
const joi = require('joi');
const {expressjwt: expressJWT} = require('express-jwt');
const config = require('./config.js');
const userinfoRouter = require('./router/userinfo.js');
const artCateRouter = require("./router/artcate.js");
const artcleRouter = require("./router/article.js");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//优化res.send(),注册为全局中间件
app.use((req,res,next) => {
    res.cc = (err,status=1) => {
        res.send({
            status,
            message: err
        })
    }
    next();
})
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//解析JWT token
app.use(expressJWT({secret: config.secretKey,algorithms: ['HS256']}).unless({path: [/^\/api\//]}));
app.use('/api',userRouter);
app.use('/my',userinfoRouter);
app.use('/my/artcate',artCateRouter);
app.use('/my/article',artcleRouter);
//静态资源
app.use('/uploads',express.static("uploads"));
//定义全局错误中间件
app.use((err,req,res,next) => {
    if(err instanceof multer.MulterError) return res.cc(err.message);
    else if(err instanceof joi.ValidationError) {
        //若为上传cover_img时error,则
        if(req.path === "/my/article/add") {
            fs.unlink(path.join(__dirname,"/uploads",req.file.originalname),(err1) => {
                if(err1) return res.cc(err1.message);
            })
        }
        return res.cc("joiValidationError "+err.message);
    }
    //token认证失败
    if(err.name === "unauthorizedError") return res.cc("无效的token "+err.message);
    return res.cc("未知错误 "+err.message);
})

app.listen(8086,() => {
    console.log("server is listening on 8086");
})