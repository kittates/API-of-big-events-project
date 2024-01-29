const joi = require('joi');

const name = joi.string().min(1).required();
const alias = joi.string().required();
const id = joi.number().integer().min(1).required();

add_cate_schema = {
    body: {
        name,
        alias
    }
}
delete_cate_schema = {
    params: {
        id,
    }
}
update_cate_schema = {
    body : {
        id,
        name,
        alias
    }
}

module.exports = {
    add_cate_schema,
    delete_cate_schema,
    get_cate_schema: delete_cate_schema,
    update_cate_schema
}