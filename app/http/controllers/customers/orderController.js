const Order = require('../../../models/order')
const moment = require('moment')

function orderController(){
    return{
       async store(req,res){
         const {phone,address} = req.body;
         if(!phone || !address){
            req.flash('error',"All fields are required")
            return res.redirect('/cart')
         }
         const order = new Order({
            customerId :req.user._id,
            items:req.session.cart.items,
            phone,
            address
         })
         const result = await order.save()
         if(result){
            req.flash('success','Order successfully Placed')
            delete req.session.cart;
            return res.redirect('/customer/orders')
         }
         req.flash('error','Something went wrong')
         return res.redirect('/cart')
        },
       async index(req,res){
            const orders = await Order.find({customerId : req.user._id},null , {sort :{'createdAt':-1} })
            res.header('Cache-Control','no-cache private ,no-store, must-revalidate,max-stale=0,post-check=0,pre-check=0')
            res.render('customers/orders',{ orders: orders, moment:moment})  
        },
       async show(req,res){
          const order =await Order.findOne({_id:req.params.id})
          // Authorize user
          if(req.user._id.toString() === order.customerId.toString() ){
           return res.render('customers/singleOrder',{ order  })
          }
         return res.redirect('/')
        }
    }
}

module.exports = orderController