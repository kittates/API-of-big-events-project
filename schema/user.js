const joi = require('joi');

//定义验证规则,处理表单数据
const username = joi
                .string()
                // .alphanum()
                .min(1)
                .max(10)
                .required()
const password = joi
                .string()
                .pattern(/^[\S]{6,12}$/)
                .required()
const id = joi
          .number()
          .integer()
          .min(1)
          .required()
const nickname = joi
                .string()
                .required()
const email = joi
            .string()
            .email()
            .required()
const avatar = joi
            .string()
            .dataUri()
            .required()

reg_login_schema = {
    body: {
        username,
        password
    }
}
update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}
update_password_schema = {
    body: {
        oldPwd: password,//这个password是上面所定义的规则
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}
update_avatar_schema = {
    body: {
        avatar,
    }
}

module.exports = {
    reg_login_schema,
    update_userinfo_schema,
    update_password_schema,
    update_avatar_schema
}