const express = require("express")
const app = express()
const ejsLayouts = require("express-ejs-layouts")
const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const myPlaintextPassword = 'potato3975';
// const someOtherPlaintextPassword = 'not_bacon';
// const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

app.set("view engine", "ejs")
app.use(ejsLayouts)
//body parser middleware (this makes req.body work)
app.use(express.urlencoded({ extended: false }))
//use controllers
app.use("/auth", require("./controllers/auth.js"))


app.get("/", (req,res)=>{
    res.send("EXPRESS AUTH HOME ROUTE")
})

// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//     // result == true
//     console.log("password secured")
// });

app.listen (8000, ()=>{
    console.log("you're listening to the spooky sounds of port 8K")
})