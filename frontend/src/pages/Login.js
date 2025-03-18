import React, { useEffect, useState } from 'react';
import '../css/Login.css'
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Snackbar, TextField, Typography } from '../../node_modules/@mui/material/index';
import { login } from '../services/authService';
import { useAuth } from '../uttil/AuthContext';

export default function Login() {

  const { token, loginToken } = useAuth();

  let navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
  }, [token, loginToken]);

  const handleClose = () => {
    setOpen(false);
  };

  const HandleLogin = async () => {

    const result = await login({ email: email, password: password });
    if (result.flag === true) {

      loginToken(result.token)
      navigate('/', { replace: true });
    }
    setOpen(true)
    setIsSuccess(result.flag);
    setMessage(result.message);
    setLoading(false);
  }

  return (
    <div>
      <form action={HandleLogin}>
        <div className='header'>
        <Typography variant="h5" component="h5">
          User Login
        </Typography>
          <Link to="/signup">Go to register</Link>
        </div>
        <TextField type='email' title='Email' placeholder='fill your email' value={email} onChange={(e) => { setEmail(e.target.value) }} required />
        <TextField type='password' title='Password' placeholder='fill your password' value={password} onChange={(e) => { setPassword(e.target.value) }} required />
        <Button
          size="small"
          type="submit"
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Login
        </Button>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        {
          isSuccess ?
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: '100%' }}
            >
              Login Success !!
            </Alert> :
            <Alert
              onClose={handleClose}
              severity="error"
              variant="filled"
              sx={{ width: '100%' }}
            >
              {message}
            </Alert>
        }
      </Snackbar>
    </div>
  );
}