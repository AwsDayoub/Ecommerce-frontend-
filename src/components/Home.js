
export default function Home({ products , orderItems , setOrderItems , userInfo , orderId }){

  console.log('xxxxxxxx' , orderId)

   const handleAddClick =(product)=> {
    let flag = 0
    for(let i = 0; i < orderItems.length;i++){
      if(orderItems[i]['name'] === product.namee){
        flag = 1
      }
    }
    if(flag === 1){
      setOrderItems(
        orderItems.map((item) => {
          if(item.name === product.namee){
            console.log(item.quantity)
            let q = item.quantity + 1
            return ({...item , quantity: q })
          }
          else return item
        })
      )
     
    }
    else{
      product && setOrderItems([...orderItems , {name: product.namee, product: product.id, order: orderId[0]['new_id'], price: product.price, quantity: 1}])
    
    }
    
   }
    return (
        <>
            <div className="main">
            {products.map( product => (
                <div className="box">
                <figure>
                    <img src={product.image} alt="" />
                    <figcaption className="caption"><span>{product.namee}</span></figcaption>
                    <div className="card">
                        <div className="price"> ${product.price}</div>
                        <button className="btn" onClick={() =>handleAddClick(product)}>Add to cart</button>
                        <div>
                        </div>
                    </div>
                </figure>
            </div>
            ))}
            </div>
        </>
    )
}