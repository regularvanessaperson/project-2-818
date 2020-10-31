# Express Auth Boilerplate

* create a node app (npm init -y)
* .gitignore
* install and set up express (npm i express)
* create index.js entry file
* stubbed out GET auth/login, GET auth/signup, POST auth/login, POST auth/signup
* require express at the top of the index.js
    - const express = require("express")
    - const app = express()
* set up controllers
    - first file added is auth.js and require express 
        - top of pg: const express = require("express")
                    let router = express.Router()
        - bottom of pg: module.exports = router
* install express and ejs layouts (npm i ejs express-ejs-layouts)
    - set up views folder with auth folder containing login.ejs and signup.ejs
    - set up views/layout.ejs and add boilerplate with <%-body%> in the body
* set up the signup and login forms, tested post routes
* npm i sequelize pg to instal sequelize and postgres
* sequelize init
* updated config.json 
* sequelize db:create express_auth_dev
* sequelize model:create --name user --attributes name:string,email:string,password:string
* sequelize db:migrate