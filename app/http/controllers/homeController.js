const Menu = require('../../models/menu')
function homeController(){
    // factory function => retrun object
    return {
        async index(req,res){
           const pizzas = await Menu.find()
           return res.render('home',{pizzas})
        }
    }
}

module.exports = homeController