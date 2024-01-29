## 大事件项目的后端接口

1. 安装包:

    ```shell
    npm i
    ```

2. 导入sql：

    ```shell
    create database my_db_01
    use my_db_01
    source ev_users.sql
    source ev_article_cate.sql
    source ev_articles.sql
    ```
    

3. /test/index.html:

    此文件主要用于测试上传cover_img功能，file表单的name需要设置为**cover_img**。单独使用此文件测试时，需要将app.js中解析JWT token的中间件注释掉，否则会出现**No authorization token was found**的错误。



前端部分开发中......
