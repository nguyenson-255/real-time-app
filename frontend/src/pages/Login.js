import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from '../../node_modules/@mui/material/index';
import '../css/Login.css';
import { login } from '../services/auth.service';
import { login as setToken } from '../slices/authSlice';


export default function Login() {

  // const { token, loginToken } = useAuth();

  const token = useSelector((state) => state.auth.token); // Lấy token từ Redux store
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
  }, [token, setToken]);


  const HandleLogin = async () => {

    const result = await login({ email: email, password: password });
    if (result.flag === true) {

      toast.success(result.message)
      dispatch(setToken(result.token));
      // loginToken(result.token)
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