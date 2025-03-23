import { useEffect, useState } from 'react';
import api from '../api/api'
import { useAuth } from '../uttil/AuthContext';
import { sendMessage } from '../services/todoService';
import TransferList from '../components/TransferList';
import '../css/Home.css'

export default function Home() {
  const [data, setData] = useState([
    { id: 1, title: 'PQR', priority: 'Normal', description: 'Database migration', status: 'Pending' },
    { id: 2,title: 'PQR1', priority: 'High', description: 'Security audit', status: 'In Progress' },
    { id: 3,title: 'XYZ', priority: 'Medium', description: 'Client meeting preparation', status: 'Pending' },
    { id: 4,title: 'XYZ1', priority: 'High', description: 'Critical bug fix', status: 'In Progress' },
    { id: 5,title: 'XYZ2', priority: 'Low', description: 'Documentation update', status: 'Completed' },
    { id: 6,title: 'PQR2', priority: 'Low', description: 'Code cleanup', status: 'Completed' },
    { id: 7,title: 'ABC', priority: 'High', description: 'Task for project A', status: 'Pending' },
    { id: 8,title: 'ABC1', priority: 'Low', description: 'Minor update task', status: 'Completed' },
    { id: 9,title: 'ABC2', priority: 'Normal', description: 'General maintenance task', status: 'In Progress' },
  ]);
  const [loading, setLoading] = useState(true);

  const { token } = useAuth();


  useEffect(() => {
    sendMessage();
  }, [])

  return (
    <div>
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

