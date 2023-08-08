import React  from "react";
import { Link } from "react-router-dom"
import 'font-awesome/css/font-awesome.min.css';

export default function Navbar({ total , userInfo , setUserInfo }){

    const handleLogout = (event) => {
        event.preventDefault();
        setUserInfo({'is_authenticated': 0})
        fetch('http://127.0.0.1:8000/logout', {
        method: 'POST',
        body: '',
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(response => {
            if (response.ok) {
            console.log('You Have been Logedout!');
            setUserInfo({'is_authenticated': 0})
            localStorage.setItem('info', JSON.stringify(userInfo))
            } else {
            console.error('error');
            }
        })
        .catch(error => {
            console.error('error', error);
        })
    }


    if(userInfo['is_authenticated'] === 0){
        return (
            <nav className="navbar">
                    <div className="logo">
                        <h1 className="hero-text">Ecom</h1>
                    </div>
                    <div className="links">
                        <Link to="/"><i id="home-icon" className="fa fa-home a"></i></Link>
                        <div>
                        <p className="cart-total">{total}</p>
                        <Link to="/cart"><i className="fa fa-shopping-basket a"></i></Link>
                        </div>
                        <button className="signup_button"><Link to="/register" className="a"><h3>Sign up</h3></Link></button>
                        <button className="signup_button"><Link to="/login" className="a"><h3>Login</h3></Link></button>
                    </div> 
                </nav>
        
        )
    }
    else{
        if(userInfo['username'] === 'manager'){
            return (
                <nav className="navbar">
                        <div className="logo">
                            <h1 className="hero-text">Ecom</h1>
                        </div>
                        <div className="links">
                            <Link to="/"><i id="home-icon" className="fa fa-home a"></i></Link>
                            <div>
                            <p className="cart-total">{total}</p>
                            <Link to="/cart"><i className="fa fa-shopping-basket a"></i></Link>
                            </div>
                            <Link to="/add"><i id="home-icon" className="fa fa-plus a" aria-hidden="true"></i></Link>
                            <Link to="/orders"><i id="home-icon" className="fa fa-list a" aria-hidden="true"></i></Link>
                            <button onClick={handleLogout} className="signup_button" ><h3>Logout</h3></button>
                        </div> 
                    </nav>
            
            )
        }
        else{


            return (
                <nav className="navbar">
                        <div className="logo">
                            <h1 className="hero-text">Ecom</h1>
                        </div>
                        <div className="links">
                            <Link to="/"><i id="home-icon" className="fa fa-home a"></i></Link>
                            <div>
                            <p className="cart-total">{total}</p>
                            <Link to="/cart"><i className="fa fa-shopping-basket a"></i></Link>
                            </div>
                            <button onClick={handleLogout} className="signup_button" ><h3>Logout</h3></button>
                        </div> 
                    </nav>
            
            )
        }
    }
}