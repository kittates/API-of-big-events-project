const express = require('express');
const router = express.Router();
const artcate_handler = require('../router_handler/artcate.js');
const schema = require('../schema/artcate.js');
const expressJoi = require('@escook/express-joi')

router.get('/cates',artcate_handler.getArticleCates);
router.post('/addcates',expressJoi(schema.add_cate_schema),artcate_handler.addArticleCates);
router.get('/deletecate/:id',expressJoi(schema.delete_cate_schema),artcate_handler.deleteCateById);
router.get('/cates/:id',expressJoi(schema.get_cate_schema),artcate_handler.getArticleById);
router.post('/updatecate',expressJoi(schema.update_cate_schema),artcate_handler.updateCateById);


module.exports = router;
