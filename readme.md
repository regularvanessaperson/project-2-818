
## How to set up:

1. Fork & Clone 
2. Install dependencies 
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
sequelize db:create <insert db name here>
```
5. Migrate the `user` model to your database
```
sequilize db:migrate
```
6. Add a `SESSION_SECRET` and `PORT` environment variable in a `.env` file 

7. Run `nodemon` 
