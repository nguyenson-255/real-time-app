export function sendMessage(socket) {
    socket.emit('message', '1234');
}

export function getTasks(socket, callback) {
    socket.on("tasks", (tasks) => {
        callback(tasks)
    });
}

export function addTask(socket, task) {
    socket.emit('addTask', task);
}     

export function addedTask(socket, callback) {
    socket.on('addedTask', (task) => {
        callback(task);
    });   
}

export function updateTask(socket, task) {
    socket.emit('updateTask', task);
}

export function updatedTask(socket, callback) {
    socket.on('updatedTask', (task) => {
        callback(task);
    });   
}