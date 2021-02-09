const express = require("express")
let router = express.Router()
const db = require("../models")
const passport = require('../config/ppConfig.js')
const axios = require('axios');
const isLoggedIn = require("../middleware/isLoggedIn");
const app = express();
var methodOverride = require('method-override');
const user = require("../models/user");

router.get('/', isLoggedIn, (req, res)=>{
          res.render("user/home")
      })


  //reads search result
router.get("/games", isLoggedIn, (req, res)=>{
    let gameName= req.query.name
    console.log("search is working")
    axios.get(`https://api.boardgameatlas.com/api/search?name=${gameName}&client_id=${process.env.Client_Id}`)
    .then((response) =>{
    res.render("user/results.ejs", {gameInfo: response.data.games})
    })
    .catch(error=>{
        console.log("search didn't work", error)
    })
})


//select a game and add it to the library
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
                console.log("a game was added to the library- association made between user and game")
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
        console.log("all games should be rendering on the library")
        res.render("user/library", {foundGames: foundGames})
        })
    }).catch(err=>{
        console.log("error rendering library", err)
    })
})

//select a game and delete it from the library
router.delete("/library", isLoggedIn, (req,res)=>{
    db.game.findOne({
        where: {
            name: req.body.name,
            description: req.body.description,
            picture: req.body.picture   
        }
    }) .then((game)=> {
        db.user.findOne({
            where:{
                name: req.body.userName
            }
        }).then((foundUser)=>{
            foundUser.removeGame(game)
            .then(removedRelation=>{
                console.log("a game was added to the library- association made between user and game")
                res.redirect("/games/library")
            }).catch(err=>{
                console.log("error rendering library", err)
            })
        })
    })
})

// Reads the game at that index and displays game info for one game
router.get("/:idx", isLoggedIn, (req,res)=>{
    let gameId = req.params.idx
    //added exact=true so only one result returns
    axios.get(`https://api.boardgameatlas.com/api/search?name=${gameId}&exact=true&client_id=${process.env.Client_Id}`)
    .then(response =>{
        db.game.findOne({
            where: {name: gameId},
            include: [db.comment, db.user]
        }).then(gameComments=>{
            let gameInfo = response.data.games
            console.log("game info works and is reading", gameInfo)
            console.log("found game:", gameComments)
            if(gameComments != null){
                gameComments.dataValues.comments.forEach(comment => {
                    let userId = comment.userId;
                    console.log("this is th userId",userId)
                    gameComments.dataValues.users.forEach(user => {
                        if(user.id === userId){
                            console.log("user.name", comment.name)
                            comment.name = user.name
                            comment.userId = user.id;
                        }
                    })
                });
                console.log("what is the comment", gameComments.dataValues.comments)
            }
            res.render("user/info", {gameInfo: gameInfo, gameComments:gameComments })
        })
    })
    .catch(err=>{
        console.log(err)
    })
})


//create a comment on the game
router.post('/:idx/comments', isLoggedIn, (req, res) => {
    let gameId = req.params.idx
    console.log("comments are on their way")
    // console.log("is this the game:",res.locals.currentGame.id)
    console.log("this is the req.params you are looking for", req.params.idx)
    console.log(req.body)
    db.comment.create({
       content: req.body.comment,
       rating: req.body.rating,
       userId: req.body.userId
    })
     .then(newComment => {
        db.game.findOne({
            where:{
                name: req.params.idx
            },
            include: [{
                model: db.user,
                attributes: ['name'],
                where: {
                    id: newComment.userId 
                }
            }]
     }).then(foundGame=>{
         foundGame.addComment(newComment)
         .then(newRelation=>{
            res.redirect(`/games/${req.params.idx}`)
         })
     .catch((error) => {
       console.log("the comment is not working:",error)
         })
    })
})
})

//edit a comment on the game
router.get('/:idx/comments/:comment/edit', isLoggedIn, (req, res) => {
    let gameId = req.params.idx
    let comment = req.params.comment
    console.log("this is the req.params you are looking for", req.params.idx)
    console.log("find the comment id", req.body.id)
    db.comment.findByPk(comment)
     .then(foundComment => {
         console.log(foundComment);
        res.render("user/edit",{foundComment:foundComment, gameId:gameId})
         })
     .catch((error) => {
       console.log("the comment update is not working:",error)
         })
    })

//put rout to add edited comment back to info page
router.put('/:idx/comments', isLoggedIn, (req, res) => {
    let gameId = req.params.idx
    let comment = req.body.commentId
    console.log("this is the req.params you are looking for", req.params.idx)
    db.comment.update({
        content: req.body.comment,
        rating: req.body.rating
    },
    {
        where:{
            id: comment
        }
    })
     .then(newComment => {
        res.redirect(`/games/${req.params.idx}`)
     })
     .catch((error) => {
       console.log("the comment update is not working:",error)
         })
    })

module.exports = router