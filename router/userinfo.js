const express = require('express');
const userinfo_Handler = require('../router_handler/userinfo.js');
const router = express.Router();
const expressJoi = require('@escook/express-joi');
const schema = require('../schema/user.js');

router.get('/userinfo',userinfo_Handler.getUserinfo);
router.post('/userinfo',expressJoi(schema.update_userinfo_schema),userinfo_Handler.updateUserinfo);
router.post('/updatepwd',expressJoi(schema.update_password_schema),userinfo_Handler.updatePassword);
router.post('/update/avatar',expressJoi(schema.update_avatar_schema),userinfo_Handler.updateAvatar);
//别忘了：向外抛出router
module.exports = router;