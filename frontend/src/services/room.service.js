import chatApi from '../api/chat-api';

export async function createRoomApi({ roomId }) {
    return await chatApi.post('/api/v1/rooms', {
        roomId: roomId
    }).then(function (response) {
        console.log(response.data.roomId);
        return {
            flag: true,
            message: `Room ${response.data.roomId} created successfully`
        };
    }).catch(function (e) {
        console.log(e);
        
        return {
            flag: false,
            message: e.status === 400 ? `Room ${roomId} already exists` : 'Create Room Failed!'
        };
    });

}

export async function joinRoomApi({ roomId }) {
    return await chatApi.get(`/api/v1/rooms/${roomId}`, {
    }).then(function (response) {
        return response.data;
    }).catch(function (e) {
        console.log(e);
        return {
            flag: false,
            message: e.status === 404 ? `Room ${roomId} not Found` : 'Join Room Failed!'
        };
    });
}