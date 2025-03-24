export function sendMessage(socket) {
    socket.emit('message', '1234');
}

export function getTasks(socket, callback) {
    socket.on("tasks", (tasks) => {
        callback(tasks)
    });
}