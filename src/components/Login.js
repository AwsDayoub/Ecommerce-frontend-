import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
export default function Login({ userInfo , setUserInfo }){

    const [formData, setFormData] = useState({ username: '', password: ''})
    const navigate = useNavigate()

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };



    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        
        fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(response => {
            if (response.ok) {
            console.log('Form submitted successfully!' , formData['username']);
            if(formData['username'] === 'manager'){
              setUserInfo({'is_authenticated': 1, 'status': 'manager', 'username': formData['username']})
              
            }
            else{
              setUserInfo({'is_authenticated': 1, 'status': 'customer', 'username': formData['username']})
              
            }
            
            navigate('/')
            } else {
            console.error('Form submission failed.');
            }
        })
        .catch(error => {
            console.error('Form submission failed:', error);
        })
    }


    return (
        <div className="c3">
        <div id="info" className="center">
          <h1>Info</h1>
          <form onSubmit={handleSubmit}>
            <div className="txt_field">
              <input type="text" name="username" value={formData.username} onChange={handleInputChange} required/>
              <span></span>
              <label>Username</label>
            </div>
            <div className="txt_field">
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} required/>
              <span></span>
              <label>Password</label> 
            </div>
            <input type="submit" value="Confirm" className="ss"/>
          </form>
        </div>
      </div>
    )
}