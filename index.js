require("dotenv").config()
const express = require("express")
const app = express()
const ejsLayouts = require("express-ejs-layouts")
const bcrypt = require('bcrypt');
const session = require('express-session')
const passport = require('./config/ppConfig.js')
const flash = require('connect-flash')
const isLoggedIn = require("./middleware/isLoggedIn")


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

//home route 
app.get("/", (req,res)=>{
    res.render("home")
})

app.get("/profile", isLoggedIn, (req,res)=>{
    res.render("profile")
})


app.listen (process.env.PORT, ()=>{
    console.log("you're listening to the spooky sounds of port 8K")
})