function guest(req,res,next){
    if(!req.isAuthenticated()){
       return next() 
    }
      // can send message "You are already login in " bu trash 
      return res.redirect('/')
} 

module.exports = guest;