import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from '../../node_modules/@mui/material/index';
import '../css/Login.css';
import { login } from '../services/authService';
import { useAuth } from '../uttil/AuthContext';

export default function Login() {

  const { token, loginToken } = useAuth();

  let navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
  }, [token, loginToken]);


  const HandleLogin = async () => {

    const result = await login({ email: email, password: password });
    if (result.flag === true) {

      toast.success(result.message)
      loginToken(result.token)
    } else {
      toast.error(result.message)
    }
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
    </div>
  );
}