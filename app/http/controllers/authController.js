const User = require('../../models/user')
const bcrypt = require('bcrypt');
const passport = require('passport')

function authController(){
    // factory function => retrun object
    return {
        login(req,res){
            res.render('auth/login')
        },
        postLogin(req,res,next){
            // validate request 
            const {email,password} = req.body;
            if(!email || !password){
                req.flash('error','All fields are required')
                return res.redirect('/login')
            }
        passport.authenticate('local',(err,user,info)=>{
            if(err){
               req.flash('error',info.message)
               return next(err)
            }
            if(!user){
                req.flash('error',info.message)
                return res.redirect('/login')
            }
            req.logIn(user ,(err) => {
                if(err){
                    req.flash('error',info.message)
                    return next(err)
                }
                const red = (req.user.role === 'admin' ? '/admin/orders' : '/customer/orders')
                return res.redirect(red);
            })
        })(req,res,next)

        }
        ,
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

          const result = await user.save()
          if(result){
            return res.redirect('/')
          }
        },
        logout(req,res){
            req.logout(function(err) {
                if (err) { return next(err); }

                res.redirect('/login');
              });
        }
    }
}

module.exports = authController