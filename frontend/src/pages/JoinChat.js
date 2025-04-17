import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import chatIcon from '../assets/chat.png';
import { createRoomApi, joinRoomApi } from '../services/room.service';
import { setConnect, setRoomInfor } from '../slices/chatSlice';

export default function JoinChat() {
  const [roomId, setRoomId] = useState('');
  const connect = useSelector((state) => state.chat.connect);
  const roomInfor = useSelector((state) => state.chat.roomInfor);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  // useEffect(() => {
  //   console.log("Connect: ", connect);
    
  //   if (connect) {
  //     navigate(`/chat`);
  //   }
  // } ,[connect]);

  const handleRoomIdChange = (e) => {
    setRoomId(e.target.value);
  }

  const validateRoomId = (id) => {
    if (roomId.trim() === '') {
      toast.error('Please enter a valid room ID');
      return false;
    }

    return true;
  }

  const joinChat = async () => {
    if (validateRoomId(roomId)) {
        const response = await joinRoomApi({ roomId });
        if (response.flag === false) {
          toast.error(response.message);
          return;
        }
        toast.success("Join Room Successfully");
        dispatch(setRoomInfor(response.roomId));
        dispatch(setConnect(true));

        navigate(`/chat`);
    }

  }

  const createRoom = async () => {

    if (validateRoomId(roomId)) {

      const result = await createRoomApi({ roomId });
      if (result.flag === true) {

        // toast.success(result.message);

        // dispatch(setRoomInfor(result.roomId));
        // dispatch(setConnect(true));
        // navigate(`/chat`);

        joinChat();
      } else {
        toast.error(result.message)
      }
    }




  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='border w-full p-8 max-w-md rounded bg-gray-100 shadow-lg'>
        <div className='flex justify-center mb-4'>
          <img src={chatIcon} className='w-24 h-24 mb-4' />
        </div>
        <h1 className='text-2xl font-bold text-center mb-6'>Join/Create Chat</h1>
        <div className='flex-col justify-center mb-4 items-center'>
          <label htmlFor='roomId' className='block font-medium mb-2'>Room ID:</label>
          <input id='roomId' type="text" value={roomId} placeholder="Enter Room Id" onChange={handleRoomIdChange} className='w-full border border-gray-300 px-4 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </div>
        <div className='flex justify-between mb-4'>
          <button className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400' onClick={createRoom}>Create Room</button>
          <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400' onClick={joinChat}>Join Room</button>
        </div>
      </div>
    </div>
  );
}