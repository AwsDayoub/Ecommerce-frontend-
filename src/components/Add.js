import { useState , useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Add(){

    let [formData , setFormData] = useState({namee: '',price: ''})
    let [files , setFiles] = useState(null)
   
  

    const handleInputChange = (event) => {
        const { name , value } = event.target
        setFormData({...formData, [name] : value})
    }

    const handleImageChange = (event) => {

      const file = event.target.files[0]
      const reader = new FileReader()
      reader.addEventListener("load", function() {
        console.log(reader.result)
        setFiles(reader.result)
      })
      reader.readAsDataURL(file)
      
    }


/*
const handleSubmit = (event) => {
      
  event.preventDefault()
  const { namee, price } = formData
  const formDataObj1 = new FormData()
  const formDataObj2 = new FormData()
  formDataObj1.append('namee', namee)
  formDataObj1.append('price', price)
  formDataObj2.append('image', files)

  if(files){
    axios.post('http://127.0.0.1:8000/add' , formDataObj1)
      .then(response => {
        console.log('response 1 status is ' , response.status)
        if(response.status >= 200 && response.status < 300){

          axios.put('http://127.0.0.1:8000/addimage' , formDataObj2)

            .then(response2 => {
              console.log('response 2 status is ' , response2.status)
              if(response2.status >= 200 && response2.status < 300){
                alert('Your Product has been added :)')
              }
              else{
                console.log('Form submission failed. on request 2')
              }
            })
              .catch(error2 => {
                console.log(error2)
              })
        }
        else{
          console.log('Form submission failed. on request 1')
        }
      })
        .catch(error => {
          console.log(error)
        })
  }

}
*/

function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}



const handleSubmit = (event) => {
  event.preventDefault()
  const {namee , price} = formData
  const formObj = new FormData()
  formObj.append('namee' , namee)
  formObj.append('price' , price)
  formObj.append('image' , dataURItoBlob(files))

  console.log(formObj)

  axios.post('http://127.0.0.1:8000/addproductwithimage' , formObj)
    
    .then(response => {
      if(response.status >= 200 && response.status < 300){
        alert('Your Product has been added :)')
      }
      else{
        console.log('Form submission failed.')
      }
    })

      .catch(error => {
        console.log(error)
      })
}

    const imgStyle = {
        marginBottom: '10px'
    }

    return (
        <div className="c3">
        <div id="info" className="center">
          <h1>Product</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="txt_field">
              <input type="text" name="namee" value={formData.namee} onChange={handleInputChange} required/>
              <span></span>
              <label>Name</label>
            </div>
            <div className="txt_field">
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} required/>
              <span></span>
              <label>Price</label> 
            </div>
            <div style={imgStyle}>
              <input type="file" name="image" onChange={handleImageChange}  required/>
              <span></span>
            </div>
            <input  type="submit" value="Confirm" className="ss"/>
          </form>
        </div>
      </div>
    )

}