import React, { useState }  from 'react';
import '../css/SignUp.css'
import {Link} from "react-router-dom";
import { Input } from '../../node_modules/@mui/material/index';
import api from '../api/api'

export default function SignUp() {

  const [field,setField] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });


  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setField({
      ...field,
      [name] : value
    });
  }

  const HandleSignUp = () => {

    console.log(field.email, field.username);
    
    api.post('/api/users/', {
      email: field.email,
      password: field.password,
      username: field.username
    })
    .then(function (response) {
      alert('Register Success');
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
      
      alert(error);
    });
  }

  return (
    <div>
      <form action={HandleSignUp}>
        <div className='header'>
          <h5>Register</h5>
          <Link to="/login">Go to login</Link>          
        </div>
        <label htmlFor='email'>Email: </label>
        <Input id='email' name='email' type='email' title='Email' placeholder='fill your email' onChange={handleChange} required></Input>
        <label htmlFor='email'>Username: </label>
        <Input id='username' name='username' type='text' title='Email' placeholder='fill your username' onChange={handleChange} required></Input>
        <label htmlFor='email'>Password: </label>
        <Input id='password' name='password' type='password' title='Password' placeholder='fill your password' onChange={handleChange} required></Input>
        <label htmlFor='email'>Password Confirm: </label>
        <Input id='passwordConfirm' name='passwordConfirm' type='password' title='PasswordConfirm' placeholder='fill your password confirm' onChange={handleChange} required></Input>
        <input type="submit" value="Sign Up"/>
      </form>
    </div>
  )
}

