import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachmentIcon from '@mui/icons-material/Attachment';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '../../node_modules/@mui/material/index';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../uttil/AuthContext';

export default function Chat() {

    const { token, logoutToken } = useAuth();
    const [user, setUser] = useState(null);
    const [roomId, setRoomId] = useState("");
    const [messages, setMessages] = useState([
        { id: 1, content: "Hello!", sender: "me" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
        { id: 2, content: "Hi there!", sender: "other" },
    ]);

    useEffect(() => {
        const arrayToken = token.split('.');
        const tokenPayload = JSON.parse(atob(arrayToken[1]));
        if (Math.floor(new Date().getTime() / 1000) >= tokenPayload?.iat) {
            setUser(tokenPayload);
            console.log(tokenPayload);
        } else {
            logoutToken();
        };
    }, [])

    return (
        <div className='w-full h-screen flex flex-col items-center'>
            <header className='border-black w-full h-16 fixed bg-gray-400 p-4 items-center flex justify-around'>
                <div>
                    <h1>Room : <span> {roomId}</span></h1>
                </div>
                <h1 className='text-xl font-semibold'>Username : <span> {user.username}</span></h1>
                <div>
                    <button className='bg-red-500 text-white px-8 py-2 rounded-lg hover:bg-red-400'>Leave</button>
                </div>
            </header>

            <main className='border border-gray-800 w-2/3 mt-16 mb-12 h-full overflow-y-auto'>
                <div>
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} p-2 items-center`}>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full mr-2">
                                <AccountCircleIcon fontSize="large" />
                            </div>
                            <div className={`${message.sender === 'me' ? 'bg-blue-200' : 'bg-gray-200'} rounded-lg p-2`}>
                                <p>{message.content}</p>
                            </div>
                        </div>
                    ))}
                    {/* <div className='flex justify-start p-4 items-center'>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full mr-2">
                            <AccountCircleIcon fontSize="large" />
                        </div>
                        <div className='bg-gray-200 rounded-lg p-2'>
                            <p>Hello, how are you?</p>
                        </div>
                    </div>
                    <div className='flex justify-end p-4 items-center'>
                        <div className='bg-blue-200 rounded-lg p-2'>
                            <p>I'm good, thank you!</p>
                        </div>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full ml-2">
                            <AccountCircleIcon fontSize="large" />
                        </div>
                    </div> */}
                </div>
            </main>

            <footer className='fixed bottom-2 h-10 w-full'>
                <div className='w-2/3 mx-auto h-full border-gray-800 rounded border flex items-center justify-around'>
                    <input type="text" placeholder='Type your message here' className='h-full w-5/6 outline-none' />
                    <div className='flex items-center gap-1'>
                        <IconButton className='bg-red-500 rounded-lg hover:bg-red-400'><AttachmentIcon /></IconButton>
                        <IconButton><SendIcon className='text-blue-500 rounded-full mx-auto' /></IconButton>
                    </div>
                </div>
            </footer>
        </div>
    )
}
function userAuth() {
    throw new Error('Function not implemented.');
}

