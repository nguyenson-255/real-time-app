import todoApi from '../api/todo-api'

export async function login({ email, password }) {

    return await todoApi.post('/api/users/login', {
        email: email,
        password: password
    }).then(function (response) {
        return {
            flag: true,
            message: '',
            token: response.data.accessToken
        };
    }).catch(function (e) {
        return {
            flag: false,
            message: e.response?.data?.message || "Login Failed!"
        };
    });
}


export async function register({ email, password, username }) {
    return await todoApi.post('/api/users/', {
        email: email,
        password: password,
        username: username
    }).then(function (response) {
        return {
            flag: true,
            message: `User ${response.data.username} is created`
        };
    }).catch(function (e) {
        return {
            flag: false,
            message: e.response?.data?.message || "Register Failed!"
        };
    });
}
