import React, { use } from 'react';
import "./Login.css";
import { useState, useEffect } from 'react';
import Header from './header';


function Login(){
    return(
        <div className='login-display'>
            <Header></Header>
            <div className="login-login">
                <div className='login-part'>
                    <div className='login-image'></div>
                </div>
                <div className='login-part' >
                    <div className='login-text'>
                        Login
                    </div>
                    <div className='login-div-input'>
                        <img className= 'login-icon' src='\assets\icons\username_orange.svg'></img>
                        <input type='text' className='login-input' placeholder='Username'></input>
                    </div>
                    
                    <div className='login-div-input'>
                        <img className= 'login-icon' src='\assets\icons\password_orange.svg'></img>
                        <input type='password' className='login-input'placeholder='Password'></input>
                    </div>
                        <input type='button' className='login-button' value='Login'></input>
                        <div className='login-signup'>Don't have an account yet? Click <a href='' className='login-link'>here</a> to sign up</div>
                </div>
            </div>
        </div>
    );
}
export default Login