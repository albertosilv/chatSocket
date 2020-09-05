const io = require('./index').io
const connectedUsers = {}
const {
    COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
    USER_CONNECTED, USER_DISCONNECTED, TYPING,
    STOP_TYPING, VERIFY_USER, LOGOUT
} = require('../event')

const { createUser, createChat, createMessage } = require('../Factories')
module.exports = function (socket) {
    console.log(socket.id)
    socket.on(VERIFY_USER, (nickname, callback) => {
        if (isUser(nickname)) {
            callback({ isUser: true, user: null })
        }
        else {
            callback({ isUser: false, user: createUser() })
        }
    })
}