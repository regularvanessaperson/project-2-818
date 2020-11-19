require("dotenv").config()
const express = require("express")
const app = express()
const ejsLayouts = require("express-ejs-layouts")
const bcrypt = require('bcrypt');
const session = require('express-session')
const passport = require('./config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn = require("./middleware/isLoggedIn")
const db = require('./models')
const axios = require('axios');
const apiUrl = `https://api.boardgameatlas.com/api/search?order_by=popularity&ascending=false&client_id=${process.env.Client_Id}`
var methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public/'));
app.set("view engine", "ejs")
app.use(ejsLayouts)
//body parser middleware (this makes req.body work)
app.use(express.urlencoded({ extended: false })) 



//session middleware
app.use(session({
    secret: process.env.SESSIONS_SECRET,
    resave: false,
    saveUninitialized: true
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//flash middleware
app.use(flash())

//CUSTOM MIDDLEWARE
app.use((req, res, next)=>{
    //bofore every route, attach the flash messages and current user to res.locals
    // this will give us access to the values in all our ejs pages
    res.locals.alerts = req.flash()
    res.locals.currentUser = req.user
    next() //move on to the next piece of middleware
})

//use controllers
app.use("/auth", require("./controllers/auth.js"))
app.use("/games", require("./controllers/games.js"))

// home route 
app.get("/", (req,res)=>{
    res.render("home")
})
// app.get('/', (req, res)=>{
//     axios.get(apiUrl)
//       .then((apiResponse)=>{
//           const games = apiResponse.data.games
//           console.log("if this is working", games)
//           res.render("home", {games: games})
//       })
//   })
// app.get("/library", isLoggedIn, (req,res)=>{
//     res.render("user/library")
// })


app.listen (process.env.PORT || 8000, ()=>{
    console.log("you're listening to the spooky sounds of port 8K")
})