const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

function init(passport){
     passport.use(new LocalStrategy({usernameField:'email'}, async( email , password , done ) =>{

        const user = await User.findOne({email})
        if(!user){
            return done(null , false, {message:'No user with this email'} )
        }

        bcrypt.compare(password,user.password).then(match => {
            if(match){
                return done(null,user,{message:'Logged in successfully'})
            }
            return done(null,false,{message:'Wrong Email or password '})
        }).catch(err => {
            return done(null ,false , {message:err})
        })

     }))

    //  passport.serializeUser((user,done) => {  // by this be can store user id in session 
    //     done(null, user._id)
    //  })
     passport.serializeUser(function(user, done) {
        process.nextTick(function() {
          return done(null, {
            _id: user._id
          });
        });
      })

     passport.deserializeUser((id,done)=>{
        User.findById(id,(err,user) => {
            done(err, user)
        })
     })  // it provide us do req.user 

}

module.exports = init;