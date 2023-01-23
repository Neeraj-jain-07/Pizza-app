import axios from "axios";
import Noty from "noty";
import moment from 'moment';
import { initAdmin } from './admin/admin';


let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza) {
  axios.post('/update-cart', pizza).then(res => {
    console.log(res);
    cartCounter.innerText = res.data.TotalQty
    new Noty({
      type:'success',
      timeout:1000,
      text: "Item added in cart"
    }).show();
  }
  )
}

  addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let pizza = JSON.parse(btn.dataset.pizza)
      updateCart(pizza)
    })
  }) 


const alertMsg = document.querySelector('#success-alert')
if(alertMsg){
  setTimeout(()=>{
     alertMsg.remove()
  },4000)
}

 

// // show status of order
let statuses = document.querySelectorAll('.status-line')
let hiddenInput = document.querySelector('#hiddenText');
let order = hiddenInput ? hiddenInput.value : null;
order=JSON.parse(order)
let time = document.createElement("small")

function updataStatus(order){
     statuses.forEach((status)=>{
      status.classList.remove('step-completed')
      status.classList.remove('current')
     })
     let stepComplete= true;
     statuses.forEach((status)=>{
       let dataProp = status.dataset.status
       if(stepComplete){
        status.classList.add('step-completed')
       }
       if(dataProp === order.status){
        stepComplete = false;
        time.innerHTML = moment(order.updatedAt).format('hh:mm A , Do MMMM')
        status.appendChild(time)
        if(status.nextElementSibling){
          status.nextElementSibling.classList.add('current')
        }
       }
     })
}

updataStatus(order);


// socket
let socket = io()
initAdmin(socket)
let adminAreaPath = window.location.pathname;
console.log(adminAreaPath)
if(adminAreaPath.includes('admin')){
  socket.emit('join','adminRoom')
}

if(order){
      socket.emit('join',`order_${order._id}`)
}

socket.on('orderUpdated',(data)=>{
  const updateOrder = {...order}
  updateOrder.updatedAt = moment().format()
  updateOrder.status = data.status
  updataStatus(updateOrder)
  // console.log(data)
})


// for add socket in add new order
