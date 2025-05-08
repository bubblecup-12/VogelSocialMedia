import React, { use } from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [isCreate, setIsCreate] = useState<boolean>(false);

useEffect(() => {
  console.log(username);
}, [username]);


  const changeUsername = (event : React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 20) {
      alert("Username is too long");
    }
    setUsername(event.target.value);
  }
  const changePassword = (event : React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }
  const changeMail = (event : React.ChangeEvent<HTMLInputElement>) => {
    setMail(event.target.value);
  }

  return (
    <div className="App">
      {isCreate? <h1>Create Account</h1> :  <h1>Login</h1> }
      {isCreate && <>
        <label htmlFor="email">E-Mail</label>
        <input id='email' type="email" value={mail} onChange={changeMail}></input>
        <br /></>}
      <label htmlFor="username">Username</label>
      <input id='username' type="text" value={username} onChange={changeUsername}></input>
      <br />
      <label htmlFor="password">Password</label>
      <input id='password' type="password" value={password} onChange={changePassword}/>
      <br />
      <input type="button" onClick={() => setIsCreate(!isCreate)} value={isCreate? "Create" : "login"}/>
    </div>
  );
}

export default App;
