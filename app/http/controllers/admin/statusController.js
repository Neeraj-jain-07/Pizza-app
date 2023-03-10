const Order = require('../../../models/order')

function statusController(){
    return{
        update(req,res){
            // we are receiving order._id and order.status
            Order.updateOne({_id:req.body.orderId},{ status : req.body.status},(err,data)=>{
                if(err){
                    console.log(err)
                    return res.redirect('/admin/orders')
                }
                // emit event
                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('orderUpdated',{id:req.body.orderId,status:req.body.status})
                return res.redirect('/admin/orders')
            })
        }
    }
}

module.exports = statusController;