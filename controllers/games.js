const express = require("express")
let router = express.Router()
const db = require("../models")
const passport = require('../config/ppConfig.js')
const axios = require('axios');
const app = express();


router.get('/', (req, res)=>{
          res.render("user/home")
      })


  //reads search result
router.get("/games", (req, res)=>{
    let gameName= req.query.name
    console.log("game searched", gameName)
    axios.get(`https://api.boardgameatlas.com/api/search?name=${gameName}&client_id=${process.env.Client_Id}`)
    .then((response) =>{
    res.render("user/results.ejs", {gameInfo: response.data.games})
    })
    .catch(error=>{
        console.log("didn't work", error)
    })
})

//Reads the game at that index
// app.get("/games/:idx", (req,res)=>{
//     let gameId = req.params.idx
//     axios.get(`https://api.boardgameatlas.com/api/search?name=${gameId}&client_id=${process.env.Client_Id}`)
//     .then(response =>{
//         let gameInfo = response.data.games
//         console.log("game info works and is reading at index", gameInfo)
//         res.render("shows.ejs", {imdbId: movieId, movie_info: movieInfo})
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })
module.exports = router