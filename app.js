const express = require('express')
const app = express()
const port = process.env.PORT || 3300
const path = require('path')

// view engine setup
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')

// app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('home')
})

app.listen(port,() => {
    console.log(`app is listening at ${port}`)
})