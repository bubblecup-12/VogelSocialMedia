import "./loginAndSignUpPage.css";
import { useState } from 'react';
import Header from './header';


function LoginAndSignUpPage(){
    const toggleLogin=(event:React.MouseEvent<HTMLElement>)=>{event.preventDefault(); setSignup(!signup)};
    const [signup, setSignup]= useState(false);
    return(
        <div className='login-display'>
            <Header/>
            <div className="login-login">
                <div className='login-part'>
                    <div className={signup? 'signup-image': 'login-image'}></div>
                </div>
                <div className='login-part' >
                    <div className='login-text'>
                        {signup? "Sign Up": "Login"}
                    </div>
                    <div className='login-div-input'>
                        <img className= 'login-icon' src='/assets/icons/email_orange.svg' alt="icon username"></img>
                        <input type='text' className='login-input' placeholder='Username'></input>
                    </div>
                    {signup? <div className='login-div-input'>
                        <img className= 'login-icon' src='\assets\icons\username_orange.svg' alt="icon email"></img>
                        <input type='email' className='login-input' placeholder='Email'></input>
                    </div> : ""}
                    
                    <div className='login-div-input'>
                        <img className= 'login-icon' src='\assets\icons\password_orange.svg' alt="icon password"></img>
                        <input type='password' className='login-input'placeholder='Password'></input>
                    </div>
                        <input type='button' className='login-button' value={signup? "Sign up": "Login"}></input>
                        <div className='login-signup' onClick={toggleLogin}>{signup? "Already have an account?": "Don't have an account yet?"} Click <span className='login-here'>here</span> {signup? "login": "to sign up"}</div>
                </div>
            </div>
        </div>
    );
}
export default LoginAndSignUpPage