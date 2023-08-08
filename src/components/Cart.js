import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'

export default function Cart({orderItems , setOrderItems , orderId , userInfo }){

const navigate = useNavigate()

let totalPrice = 0
orderItems.map(item => (
    !('username' in item)? totalPrice = totalPrice + item.price * item.quantity : totalPrice = totalPrice + 0
  ))




const handleAddClick = (product) => {
  setOrderItems(
    orderItems.map((item) => {
      if(item.name === product.name){
        console.log(item.quantity)
        let q = item.quantity + 1
        return ({...item , quantity: q })
      }
      else return item
    })
  )
  localStorage.setItem('orderItems', JSON.stringify(orderItems))
 }


 const handleRemoveClick = (product) => {

    if(product.quantity  === 1)   {
       setOrderItems(orderItems.filter(item => item.name !== product.name ));
    }
    else{
      setOrderItems(orderItems.map((item) => item.name === product.name?{...item,quantity: item.quantity-1}:item))
    }
    localStorage.setItem('orderItems', JSON.stringify(orderItems))
 }


useEffect(() => {
  setOrderItems([...orderItems , {username: userInfo['username']}])
} , [])
console.log(orderItems , 'orderItems after update')



 const handleBuyClick = () => {

  if(userInfo['is_authenticated'] === 1){
    
    console.log(orderItems , 'orderItems in cart.js')

  fetch('http://127.0.0.1:8000/cart' , {
    method: 'POST',
    body: JSON.stringify(orderItems),
    headers: {
      'Content-Type': 'application/json'
      }
  }).then(response => {
    if(response.ok){
      setOrderItems([])
      alert('Your Purchase Has Been Submetted!')
      console.log('purchase succeded')
      navigate('/')
    }
    else{
      console.log('purchase failed')
      }
   })
  }
  else{
    alert('Signup or Login to make your purchase')
  }
 }

 //useEffect(handleBuyClick , [orderItems])


function TableContent(){
    return (
      orderItems.map(item => (
        !('username' in item)?
        <tr>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
          <td>${item.price}</td>
          <td>${item.price * item.quantity}</td>
          <td>
            <div class="arrow">
                <img src={require('../images/arrow-up.png')} className="arrow-up" alt="" onClick={() => handleAddClick(item)} />
                <img src={require('../images/arrow-down.png')} className="arrow-down" alt="" onClick={() => handleRemoveClick(item)} />
            </div>
          </td>
        </tr> : null
      ))
    )
  }

    return (
        <>
             <table>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th></th>
                </tr>
                <TableContent />
             </table>


        <div className="c1">
        <div className="c2">
            <div className="hero"><h3>Total Price: ${totalPrice}</h3></div>
            <div className="buto"><button onClick={handleBuyClick}>Buy</button></div>
        </div>
        </div>

        </>
    )
}