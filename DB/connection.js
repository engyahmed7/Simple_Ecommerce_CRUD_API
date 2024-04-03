
exports.createConnection=()=>{

    const colors = require('colors');
    const mongoose = require('mongoose')
    mongoose.connect(process.env.URI)
    .then(()=>console.log('Database Connected'.bgCyan))
    .catch(err=>console.log(`Error while connecting to mongoDB : ${err.message}`.underline.red ))
}