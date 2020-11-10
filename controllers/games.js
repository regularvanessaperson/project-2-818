const express = require("express")
let router = express.Router()
const db = require("../models")
const passport = require('../config/ppConfig.js')
const axios = require('axios');
const app = express();
const apiUrl = `https://api.boardgameatlas.com/api/search?order_by=popularity&ascending=false&client_id=${process.env.Client_Id}`


// router.get('/', (req, res)=>{
//     console.log("home route for axios is working" ,apiUrl)
//     axios.get(apiUrl)
//       .then((apiResponse)=>{
//           const games = apiResponse.data.games
//           console.log("if this is working", games)
//           res.render("home", {games: games})
//       })
//   })

module.exports = router