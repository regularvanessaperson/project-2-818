var db = require('./models')

db.game.destroy({
    where: {name: "Pandemic"}
})
.then(numRowsDeleted =>{
    console.log(numRowsDeleted)
})