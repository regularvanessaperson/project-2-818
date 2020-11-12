const express = require("express")
let router = express.Router()
const db = require("../models")
const passport = require('../config/ppConfig.js')
const axios = require('axios');
const isLoggedIn = require("../middleware/isLoggedIn");
const app = express();


router.get('/', (req, res)=>{
          res.render("user/home")
      })


  //reads search result
router.get("/games", isLoggedIn, (req, res)=>{
    let gameName= req.query.name
    console.log("game searched", gameName)
    axios.get(`https://api.boardgameatlas.com/api/search?name=${gameName}&client_id=${process.env.Client_Id}`)
    .then((response) =>{
    res.render("user/results.ejs", {gameInfo: response.data.games})
    })
    .catch(error=>{
        console.log("search didn't work", error)
    })
})


//select a game and create it in the library
router.post("/library", isLoggedIn, (req,res)=>{
    db.game.findOrCreate({
        where: {
            name: req.body.name,
            description: req.body.description,
            picture: req.body.picture   
        }
    }) .then(([game ,createdGame])=> {
        db.user.findOne({
            where:{
                name: req.body.userName
            }
        }).then((foundUser)=>{
            foundUser.addGame(game)
            .then(createdRelation=>{
                console.log("created relation worked", createdRelation)
                res.redirect("/games/library")
            })
        })
    })
})

//render all games associated with user that is logged in on the library page
router.get("/library", isLoggedIn, (req,res)=>{
    // console.log(res.locals.currentUser, {include: [db.games]})
    console.log("i am in library trying to get the id")
    db.user.findByPk(res.locals.currentUser.id, {include: [db.game]})
    .then(foundUser=>{
    foundUser.getGames()
        .then(foundGames=>{
        console.log("foundGames", foundGames)
        res.render("user/library", {foundGames: foundGames})
        })
    }).catch(err=>{
        console.log("error rendering library", err)
    })
})

// Reads the game at that index
router.get("/:idx", isLoggedIn, (req,res)=>{
    let gameId = req.params.idx
    axios.get(`https://api.boardgameatlas.com/api/search?name=${gameId}&client_id=${process.env.Client_Id}`)
    .then(response =>{
        let gameInfo = response.data.games
        console.log("game info works and is reading")
        res.render("user/info", {gameInfo: gameInfo})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router