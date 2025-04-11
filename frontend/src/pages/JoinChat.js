import React, { useEffect, useState } from 'react';
import chatIcon from '../assets/chat.png';

export default function JoinChat() {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='border w-full p-8 max-w-md rounded bg-gray-100 shadow-lg'>
          <div className='flex justify-center mb-4'> 
            <img src={chatIcon} className='w-24 h-24 mb-4' />
          </div>
          <h1 className='text-2xl font-bold text-center mb-6'>Join/Create Chat</h1>
          <div className='flex-col justify-center mb-4 items-center'>
            <label htmlFor='roomId' className='block font-medium mb-2'>Room ID:</label>
            <input id='roomId' type="text" placeholder="Enter Room Id" className='w-full border border-gray-300 px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
          </div>
          <div className='flex justify-between mb-4'>
            <button className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400'>Create Room</button>
            <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400'>Join Room</button>
          </div>
        </div>
      </div>
    );
  }