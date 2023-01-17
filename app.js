const express = require('express')
const app = express()
const port = process.env.PORT || 3300
const path = require('path')


app.use(express.static('public'))
// view engine setup
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')

app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/cart',(req,res)=>{
    res.render('customers/cart')
})

app.get('/login',(req,res)=>{
    res.render('auth/login')
})

app.get('/register',(req,res)=>{
    res.render('auth/register')
})

app.listen(port,() => {
    console.log(`app is listening at ${port}`)
})