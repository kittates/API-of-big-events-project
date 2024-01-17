const express = require('express')
const app = express();
const cors = require('cors');
const userRouter = require('./router/user.js');
const joi = require('joi');
const {expressjwt: expressJWT} = require('express-jwt');
const config = require('./config.js');
const userinfoRouter = require('./router/userinfo.js');
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

//定义全局错误中间件
app.use((err,req,res,next) => {
    //joi验证失败
    if(err instanceof joi.ValidationError) return res.cc("joiValidationError "+err.message);
    //token认证失败
    if(err.name === "unauthorizedError") return res.cc("无效的token "+err.message);

    return res.cc("未知错误 "+err.message);
})


app.listen(8086,() => {
    console.log("server listening on 8086");
})