import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import TransferList from '../components/TransferList';
import '../css/Home.css';
import { addedTask, getTasks, updatedTask } from '../services/todo.service';
import { connectSocket, disconnectSocket } from '../socket/todo.socket';
// import { useAuth } from '../uttil/AuthContext';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import FormDialog from '../components/FormDialog';
import { logout } from '../slices/authSlice';

export default function Home() {
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.auth.token); // Lấy token từ Redux store
  const dispatch = useDispatch();
  
  // const { token, logoutToken } = useAuth();
  const [socket, setSocket] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const socketInstance = connectSocket("todos", token, 3001);
    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        disconnectSocket();
      }
    };
  }, [token]);

  useEffect(() => {
    if (!socket) return;
    getTasks(socket, (tasks) => {
      setData(tasks);
    });

    addedTask(socket, (task) => {
      setData((prevData) => [...prevData, task]);
    });

    updatedTask(socket, (task) => {
      setData((prevData) => prevData.map(t => t.id === task.id ? task : t));
    });

  }, [socket]);

  const handleJoinChat = () => {
    // Logic to join chat
    navigate('/join');
  }

  return (
    <div className='main'>

      <div className='action'>
        <Typography variant="h5" component="div">
          Action111
        </Typography>
        <FormDialog socket={socket} />

        <Button onClick={handleJoinChat}>Join Chat</Button>
        <Button onClick={() => {
          navigate('/chat');
        }}>Chat</Button>

        <Button onClick={() => {
          dispatch(logout())
          navigate('/login');
        }}>Logout</Button>

      </div>

      {socket ? <TransferList todos={data} socket={socket} /> : <p>Loading socket...</p>}
      
    </div>
  );
}
