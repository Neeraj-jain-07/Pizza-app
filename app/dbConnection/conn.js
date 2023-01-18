const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const url = "mongodb+srv://NeerajJain:neeraj123@pizzaapp.xfwfdhk.mongodb.net/PizzaApp?retryWrites=true&w=majority"
const connectDB = () => {
   return  mongoose.connect(url)
    .then(()=> console.log("data base connected .."))
}

module.exports = connectDB;