import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '../../node_modules/@mui/material/index';
import { useNavigate } from '../../node_modules/react-router-dom/dist/index';
import { sendMessage } from '../services/chat.service';
import { logout } from '../slices/authSlice';
import { connectStomp, disconnectStomp, stompClient, subscribeToRoomId } from '../socket/chat.socket';
// import { useAuth } from '../uttil/AuthContext';

export default function Chat() {

    const token = useSelector((state) => state.auth.token);
    const roomInfor = useSelector((state) => state.chat.roomInfor);
    const connect = useSelector((state) => state.chat.connect);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        if (!connect) {
            disconnectStomp();
            navigate('/join');
            return;
        }

        connectStomp();

        subscribeToRoomId(roomInfor, (message) => {
            const newMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
        const arrayToken = token.split('.');
        const tokenPayload = JSON.parse(atob(arrayToken[1]));
        if (Math.floor(new Date().getTime() / 1000) >= tokenPayload?.iat) {
            setUser(tokenPayload);
            console.log(tokenPayload);
        } else {
            dispatch(logout());
            // logoutToken();
        };
    }, []);

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleSendMessage = async () => {
        if (stompClient && connect && input.trim()) {
            const message = {
                content: input,
                sender: user?.username,
                roomId: roomInfor,
            };


            sendMessage(message);
            setInput('');
        }   
    };

    return (
        <div className='w-full h-screen flex flex-col items-center'>
            <header className='border-black w-full h-16 fixed bg-gray-400 p-4 items-center flex justify-around'>
                <div>
                    <h1>Room : <span> {roomInfor}</span></h1>
                </div>
                <h1 className='text-xl font-semibold'>Username : <span> {user?.username}</span></h1>
                <div>
                    <button className='bg-red-500 text-white px-8 py-2 rounded-lg hover:bg-red-400'>Leave</button>
                </div>
            </header>

            <main className='border border-gray-800 w-2/3 mt-16 mb-12 h-full overflow-y-auto'>
                <div>
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.sender === user?.username ? 'justify-end' : 'justify-start'} p-2 items-center`}>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full mr-2">
                                <AccountCircleIcon fontSize="large" />
                            </div>
                            <div className={`${message.sender === user?.username ? 'bg-blue-200' : 'bg-gray-200'} rounded-lg p-2`}>
                                <p>{message.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className='fixed bottom-2 h-10 w-full'>
                <div className='w-2/3 mx-auto h-full border-gray-800 rounded border flex items-center justify-around'>
                    <input value={input} onChange={handleChange}type="text" placeholder='Type your message here' className='h-full w-5/6 outline-none' />
                    <div className='flex items-center gap-1'>
                        <IconButton className='bg-red-500 rounded-lg hover:bg-red-400'><AttachmentIcon /></IconButton>
                        <IconButton onClick={handleSendMessage} ><SendIcon className='text-blue-500 rounded-full mx-auto' /></IconButton>
                    </div>
                </div>
            </footer>
        </div>
    )
}

