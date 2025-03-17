import React, { useState }  from 'react';
import '../css/Login.css'
import {Link} from "react-router-dom";
import api from '../api/api'
import { Button, IconButton, Input, Snackbar } from '../../node_modules/@mui/material/index';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
      </IconButton>
    </React.Fragment>
  );

  const HandleLogin = () => {
    api.post('/api/users/login', {
      email: email,
      password: password
    })
    .then(function (response) {
      console.log(response);
      
      setOpen(true);
      setMessage("Login Success!!");
      localStorage.setItem("token",  response.data.accessToken);
    })
    // .catch(function (e) {
    //   setOpen(true);      
    //   setMessage(e[0]);
    // });
  }

  return (
    <div>
      <form action={HandleLogin}>
        <div className='header'>
          <h5>User Login</h5>
          <Link to="/signup">Go to register</Link>
        </div>
        <Input type='text' title='Email' placeholder='fill your email' value={email} onChange={(e) => {setEmail(e.target.value)}} required></Input>
        <Input type='password' title='Password' placeholder='fill your password' value={password} onChange={(e) => {setPassword(e.target.value)}} required />
        <input type="submit" value="Login"/>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
}

