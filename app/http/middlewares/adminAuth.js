let i=1;
function adminAuth( req , res , next ){
    //  console.log(req.user)
    //  console.log("user see admin ",i,' times');   //Question: these are showing twice for one request 
    //  i++;
    if(req.isAuthenticated() && req.user.role === 'admin'){
        return next()
    }
    return res.redirect('/login')
}


module.exports = adminAuth;