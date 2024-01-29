const express = require('express');
const router_handler = require("../router_handler/article.js");
const router = express.Router();
const multer =require('multer');
const path = require('path');   
const {add_article_schema} = require('../schema/article.js');
const expressJoi = require('@escook/express-joi');

const storage = multer.diskStorage({
    filename: (req,file,cb) => {
        const uniqueSuffix = Date.now()+'-'+Math.round(Math.random()*1E9);
        file.originalname = uniqueSuffix+'-'+file.originalname;
        cb(null,file.originalname);
    },
    destination: path.join(__dirname,"../uploads")
})
const upload = multer({
    storage,
});


router.post("/add",upload.single("cover_img"),expressJoi(add_article_schema),router_handler.addArticle);

module.exports = router;