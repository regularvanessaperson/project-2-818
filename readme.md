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


---
## How to set up:

1. Fork & Clone 
2. Instal dependencies 
```
npm i
```

3. Create a `config.json` with the following code:
```
{
  "development": {
    "database": "<insert db name here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "database": "<insert db name here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "database": "<insert db name here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
``` 

**Note:** If your database requires a username and password, you'll need to include these fields as well.

4. Create the database
```
sequelize db: create <insert db name here>
```
5. Migrate the `user` model to your database
```
sequilize db:migrate
```
6. Add a `SESSION_SECRET` and `PORT` environment variable in a `.env` file 

7. Run `nodemon` 
