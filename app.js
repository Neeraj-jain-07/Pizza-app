require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3300
const path = require('path')
const connectDB = require('./app/dbConnection/conn')
const session = require('express-session')
const flash = require('express-flash')
const MongodbStore = require('connect-mongo')
const start = async() => {
   await connectDB()
}
start()
app.use(express.static('public'))
// view engine setup
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const { urlencoded } = require('express')

// session store 
// new MongodbStore({
//     mongooseConnection:connectDB(),
//     collection:'sessions'
// })
app.use(flash())
app.use(express.json())




app.use(express.urlencoded({extended:false}));


//session config 
app.use(session({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:false,
    cookie:{ maxAge : 1000 * 60 * 60 * 24 } , // 24 hours,
    store:MongodbStore.create({
        mongoUrl: 'mongodb+srv://NeerajJain:neeraj123@pizzaapp.xfwfdhk.mongodb.net/PizzaApp?retryWrites=true&w=majority'
        // collectionName:'raj'  => can give name from  here 
    } 
    )
}))

app.use((req,res,next)=> {
    res.locals.session = req.session  // this module is not working 
    console.log(req.session.cart) 
    next()
})

app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

require('./routes/web')(app)



app.listen(port,() => {
   
    console.log(`app is listening at ${port}`)
})