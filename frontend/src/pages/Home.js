import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import FormDialog from '../components/FormDialog';
import TransferList from '../components/TransferList';
import '../css/Home.css';
import { getTasks } from '../services/todoService';
import { getSocket } from '../socket/socket';
import { useAuth } from '../uttil/AuthContext';

export default function Home() {
  const [data, setData] = useState([
    { id: 1, title: 'PQR', priority: 'Normal', description: 'Database migration', status: 'Pending' },
    { id: 2, title: 'PQR1', priority: 'High', description: 'Security audit', status: 'In Progress' },
    { id: 3, title: 'XYZ', priority: 'Medium', description: 'Client meeting preparation', status: 'Pending' },
    { id: 4, title: 'XYZ1', priority: 'High', description: 'Critical bug fix', status: 'In Progress' },
    { id: 5, title: 'XYZ2', priority: 'Low', description: 'Documentation update', status: 'Completed' },
    { id: 6, title: 'PQR2', priority: 'Low', description: 'Code cleanup', status: 'Completed' },
    { id: 7, title: 'ABC', priority: 'High', description: 'Task for project A', status: 'Pending' },
    { id: 8, title: 'ABC1', priority: 'Low', description: 'Minor update task', status: 'Completed' },
    { id: 9, title: 'ABC2', priority: 'Normal', description: 'General maintenance task', status: 'In Progress' },
  ]);
  const [loading, setLoading] = useState(true);

  const { token, loginToken } = useAuth();

  const socketRef = useRef(null); // Store socket instance

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = getSocket("todos", token);

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      };
    }
  }, [token, loginToken]);

  useEffect(() => {

    getTasks(socketRef.current, (tasks) => {
      setData(tasks);
    });
  }, [socketRef.current])

  return (
    <div className='main'>

      <div className='action'>
        <Typography variant="h5" component="div">
          Action
        </Typography>
        <FormDialog></FormDialog>
      </div>

      <TransferList todos={data}>


      </TransferList>
    </div>

    // <div>
    //   <h1>Welcome to Home Page   aaa</h1>
    //   <p>This is a React class component.</p>
    //   <p>{data}</p>
    // </div>
  );
}

