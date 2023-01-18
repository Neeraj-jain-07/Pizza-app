const User = require('../../models/user')
const bcrypt = require('bcrypt');

function authController(){
    // factory function => retrun object
    return {
        login(req,res){
            res.render('auth/login')
        },
        register(req,res){
            res.render('auth/register')
        },
      async postRegister(req,res){
            const {name , email, password} = req.body;
            console.log(req.body)
            if(!name || !email || !password){
                req.flash("error","All fields are required")
                req.flash('name',name)
                req.flash('email',email)
                return  res.redirect('/register')
            }

            User.exists({email:email},(err,result) => {
                if(result){
                req.flash("error","Email already taken")
                req.flash('name',name)
                req.flash('email',email)
                return  res.redirect('/register') 
                }
            })

          const  hashPassword = await bcrypt.hash(password,10)
           console.log(hashPassword)
            const user = new User({
                name,
                email,
                password:hashPassword
            })
            console.log(user)

            user.save().then((user)=> {
                // login
                console.log('f1')
                console.log(user)
                console.log(f2)
                return res.redirect('/')
            }).catch(err => {
                
                req.flash("error",err)
                return res.redirect('/register')
            })
        }
       
    }
}

module.exports = authController