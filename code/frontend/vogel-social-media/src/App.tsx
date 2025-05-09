import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const changeUserName = (event : React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  };
  const changePassword = (event : React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  };
  const changeMail = (event : React.ChangeEvent<HTMLInputElement>) => {
    setMail(event.target.value)
  }
  return (
    <div className="App">
      <div className="container">

      
      {isCreate? <h1>Create Account</h1> : <h1>Login</h1>}
      
      <label htmlFor="username"></label>
      <input id= "username" type='text' value={username} placeholder='Username' onChange={changeUserName}/>
      <br />
      <label htmlFor="password"></label>
      <input id= "password" type='password' value={password} onChange={changePassword} placeholder='Password'/>
      <br/>
      {isCreate && <>
        <label htmlFor="mail">E-Mail</label>
        <input id= "mail" type='email' value={mail} onChange={changeMail}/>
        <br />
      </>}
      <input type='button' onClick={() => setIsCreate(!isCreate)} value={isCreate? "Create" : "Login"}/>
      </div>
    </div>
  );
}

export default App;
