// this js file serve to admin each time when any route of this website load 
const { populate } = require('../../../models/menu')
const order = require('../../../models/order')

function adminOrderController (){
    return {
        index(req,res){
              order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 }}).populate('customerId', '-password').exec((err, orders) => {
             
                if(req.xhr) {
                    // console.log(orders)
                    return res.json(orders)
                } else {
                 return res.render('admin/order')
                }
            })
        }   
    }
}

module.exports = adminOrderController