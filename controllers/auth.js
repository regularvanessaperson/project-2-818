const express = require("express")
let router = express.Router()
const db = require("../models")

router.get("/signup", (req,res)=>{
    res.render("auth/signup")
})

router.post("/signup", (req,res)=>{
    console.log("signup info:", req.body)
    //find if user already exists
    //if it does, throw error message
    //otherwise create a new user and store them in the db
    db.user.findOrCreate({
        where: {email: req.body.email},
        defaults: {
            name: req.body.name,
            password: req.body.password
        }
    })//create new user if email wasn't found
    .then(([createdUser, wasCreated])=>{
        if (wasCreated){
            console.log("just created teh following user:", createdUser)
        } else {
            console.log("an account already exists with that email address")
        }
            //redirect
    res.redirect("/auth/login")
    })
    .catch(error=>{
        console.log("Did not post to db! See error>>>>>")
    })
})

router.get("/login", (req,res)=>{
    res.render("auth/login")
})

router.post("/login", (req, res)=>{
    console.log("login info:", req.body)
    //redirect to home route
    res.redirect("/")
})

module.exports = router

