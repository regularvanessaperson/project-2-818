# Board Game Library 
### *This project needs to be re-deployed somewhere new since Heroku removed free tier*

### Introduction
My project 2 site is designed for the user to be able to search, add and delete board games to their library as well as give comments and ratings to each game.

Link to app deployed on Heroku: https://board-game-library-app-project.herokuapp.com/ 

### Technology
  - Node.js
  - Express
    - EJS
    - EJS Layouts
    - Express Passport
  - Sequelize
  - Bootstrap

## How to set up:
1. API calls require a client_id. Sign up for one at [Board Game Atlas](https://www.boardgameatlas.com/api/docs)
2. Fork & Clone 
3. Install dependencies 
```
npm i
```

4. Create a `config.json` with the following code:
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
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": { 
        "require": true,
        "rejectUnauthorized": false }
    }
  }
}
``` 

**Note:** If your database requires a username and password, you'll need to include these fields as well.

5. Create the database
```
sequelize db:create <insert db name here>
```
6. Migrate the `user` model to your database
```
sequilize db:migrate
```
7. Add a `SESSION_SECRET`, `Client_Id` and `PORT` environment variable in a `.env` file 

8. Run `nodemon` 

## Models

### user Model
Column Name | Data Type| Notes
------------ | ------------- | ------------
id| Integer| Serial Primary Key, Auto-generated
name| String| Provided by sign up
email| String| Provided by sign up
password| String| Stored as hash
createdAt| Date| Auto-generated
updatedAt| Date| Auto-generated

### game Model
Column Name | Data Type| Notes
------------ | -------------| -------------
id| Integer| Serial Primary Key, Auto-generated
name| String| Provided API when user saves to library
description| Text| Provided by API when user saves to library
picture| String| Provided by API when user saves to library
createdAt| Date| Auto-generated
updatedAt| Date| Auto-generated

### comment Model
Column Name | Data Type| Notes 
------------ | -------------| -------------
id| Integer| Serial Primary Key, Auto-generated 
content| Text| Provided by user through comment form
rating| Integer| Provided byuser through comment form
userId| Integer| FK used to associate with user model
gameId| Integer| FK used to associate with game model
createdAt| Date| Auto-generated 
updatedAt| Date| Auto-generated 

### UserGame
Column Name | Data Type| Notes  
------------ | -------------| -------------
id| Integer| Serial Primary Key, Auto-generated  
userId| Integer| FK used to associate with user model
gameId| Integer| FK used to associate with game model 
createdAt| Date| Auto-generated  
updatedAt| Date| Auto-generated  

## Routes

### Default Routes
Method | Path| Location| Purpose 
------------ | -------------| -------------| ------------
GET| / | index.js  | Home page

### Auth Routes
Method | Path| Location| Purpose 
------------ | -------------| -------------| ------------
GET| auth/signup | auth.js  | Shows signup form
POST| auth/signup | auth.js  | Adds sign up info to user model
GET| auth/login | auth.js  | Shows login form
POST| auth/login | auth.js  | Authenticates login
GET| auth/logout | auth.js  | Logs user out and redirects to home

### Games Routes
Method | Path| Location| Purpose 
------------ | -------------| -------------| ------------
GET| games/ | games.js  | Shows user home page
GET| games/games | games.js  | Shows game search results 
POST| games/library | games.js   | Adds game model and shows in library
GET| games/library | games.js   | Shows all games added associated with user in library
DELETE| games/library | games.js  | Deletes game from library and removes user and game association from models
GET| games/:idx | games.js   | Shows game info for specific game
POST| games/:idx/comments | games.js   | Creates a comment associated to user and game model
GET| games/:idx/comments/:comment/edit | games.js  | Updates comment and rating made by current user
PUT| games/:idx/comments | games.js   | Displays updated comment 
