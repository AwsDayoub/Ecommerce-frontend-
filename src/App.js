import './App.css';
import React , { useState , useEffect} from 'react';
import Home from "./components/Home.js"
import Cart from "./components/Cart.js"
import Navbar from "./components/Navbar.js"
import Register from "./components/Register.js"
import Login from "./components/Login.js"
import Orders from "./components/Orders.js"
import Add from "./components/Add.js"
import { Route , Routes } from "react-router-dom"


function App() {
  const [orderItems , setOrderItems] = useState([])
  let [products , setProducts] = useState([])
  let [orderId , setOrderId] = useState([])
  let [userInfo , setUserInfo] = useState({})
  let [orders , setOrders] = useState([])

  const fetchProductsData = () => {
    fetch("http://127.0.0.1:8000/")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setProducts(data['data'])
        setUserInfo(data['user_info'])
      })
  }
  useEffect(() => {
    fetchProductsData()
  } , [])


  const fetchOrderIdData = () => {
    fetch("http://127.0.0.1:8000/cart")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setOrderId(data)
      })
  }


  const fetchOrders = () => {
    fetch("http://127.0.0.1:8000/orders")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setOrders(data)
      })
  }

  useEffect(() => {
    fetchOrders()
  } , [])

  useEffect(() => {
    fetchOrderIdData()
  } , [])


  let total = 0
  for(let i = 0;i < orderItems.length;i++){
    if(!('username' in orderItems[i]))total = total + orderItems[i].quantity
  }
return (
  <>
  <Navbar total={total} userInfo={userInfo} setUserInfo={setUserInfo} />
  <Routes>
      <Route exact path="/" element={<Home orderItems={orderItems} setOrderItems={setOrderItems} products={products} userInfo={userInfo} orderId={orderId} />} />
      <Route path="/cart" element={<Cart orderItems={orderItems} setOrderItems={setOrderItems} orderId={orderId} userInfo={userInfo} />} />
      <Route path="/register" element={<Register userInfo={userInfo} setUserInfo={setUserInfo} />} />
      <Route path="/login" element={<Login userInfo={userInfo} setUserInfo={setUserInfo} />} />
      <Route path="/add" element={<Add />} />
      <Route path="/orders" element={<Orders orders={orders} />} />
  </Routes>
  </>
)

}

export default App;
