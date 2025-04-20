import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Snackbar, TextField, Typography } from '../../node_modules/@mui/material/index';
import '../css/SignUp.css';
import { register } from '../services/auth.service';
// import { useAuth } from '../uttil/AuthContext';

export default function SignUp() {

  let navigate = useNavigate();
  // const { token, loginToken } = useAuth();

  const [field, setField] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // useEffect(() => {
  //   if (token) {
  //     navigate('/', { replace: true });
  //   }
  // }, [token, loginToken]);

  useEffect(() => {
    if (isSuccess) {
      navigate('/login', { replace: true });
    }
  }, [isSuccess]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setField({
      ...field,
      [name]: value
    });
  }

  const HandleSignUp = async (e) => {
    e.preventDefault();
    if (field.password !== field.passwordConfirm) {
      setOpen(true)
      setIsSuccess(false);
      setMessage('Password not matching');
      return;
    }

    const result = await register({ email: field.email, password: field.password, username: field.username });
    setOpen(true)
    setIsSuccess(result.flag);
    setMessage(result.message);
    setLoading(false);
  }

  return (
    <div>
      <form onSubmit={HandleSignUp}>
        <div className='header'>
          <Typography variant="h5" component="h5">
            User SignUp
          </Typography>
          <Link to="/login">Go to login</Link>
        </div>
        <TextField name='email' type='email' title='Email' placeholder='fill your email' onChange={handleChange} required />
        <TextField name='username' type='text' title='Username' placeholder='fill your username' onChange={handleChange} required />
        <TextField name='password' type='password' title='Password' placeholder='fill your password' onChange={handleChange} required />
        <TextField name='passwordConfirm' type='password' title='Password Confirm' placeholder='fill your password confirrm' onChange={handleChange} required />
        <Button
          size="small"
          type="submit"
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Register
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
              {message}
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

