const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cardController = require('../app/http/controllers/customers/cardController')
const orderController = require('../app/http/controllers/customers/orderController')
const adminOrderController = require('../app/http/controllers/admin/adminOrderController')
const statusController = require('../app/http/controllers/admin/statusController.js')
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const adminAuth = require('../app/http/middlewares/adminAuth')

function initRoutes(app){
    app.get('/',homeController().index)
    app.get('/login',guest, authController().login)
    app.post('/login',authController().postLogin)
    app.get('/register',guest ,authController().register)
    app.post('/register',authController().postRegister)
    app.post('/logout',authController().logout)

    app.get('/cart',cardController().index)
    app.post('/update-cart',cardController().update )
    
    //customer route
    app.post('/orders', auth , orderController().store)
    app.get('/customer/orders', auth , orderController().index) 
    app.get('/customer/orders/:id',auth,orderController().show)

    //admin route
    app.get('/admin/orders', adminAuth , adminOrderController().index) 
    app.post('/admin/order/status', adminAuth , statusController().update) 
  
}

module.exports = initRoutes