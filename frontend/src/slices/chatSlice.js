import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    roomInfor: '',
    connect: false,
  },
  reducers: {
    setRoomInfor: (state, action) => {
      state.roomInfor = action.payload;
    },
    setConnect: (state, action) => {
      
      state.connect = action.payload;
    }
  }
});

export const { setRoomInfor, setConnect } = chatSlice.actions;
export default chatSlice.reducer;
