const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const url = process.env.MONGO_URl;
const connectDB = () => {
   return  mongoose.connect(url)
    .then(()=> console.log("data base connected .."))
}

module.exports = connectDB;