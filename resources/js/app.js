import axios from "axios";
import Noty from "noty";
import { initAdmin } from './admin/admin'


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

initAdmin() 