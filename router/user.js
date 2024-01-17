const express = require('express');
const router = express.Router();
const userHandler = require('../router_handler/user.js');
const expressJoi = require('@escook/express-joi');
const schema = require('../schema/user.js');

//注册 验证表单数据
router.post('/reguser',expressJoi(schema.reg_login_schema),userHandler.reguser);
//登陆 验证表单数据
router.post('/login',expressJoi(schema.reg_login_schema),userHandler.login);

module.exports = router;
