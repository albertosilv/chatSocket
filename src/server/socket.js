const io = require('./index.js').io
let connectedUsers = {}
const {
    COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
    USER_CONNECTED, USER_DISCONNECTED, TYPING,
    STOP_TYPING, VERIFY_USER, LOGOUT
} = require('../event')

const { createUser, createChat, createMessage } = require('../Factories')
let communityChat = createChat()

module.exports = function (socket) {
    console.log(socket.id)
    socket.on(VERIFY_USER, (nickname, callback) => {
        if (isUser(connectedUsers,nickname)) {
            callback({ isUser: true, user: null })
        }
        else {
            callback({ isUser: false, user: createUser({ name: nickname }) })
        }
    })

    socket.on(USER_CONNECTED,(user)=>{
        connectedUsers = addUser(connectedUsers,user)
        socket.user = user
        console.log(connectedUsers)
        io.emit(USER_CONNECTED, connectedUsers)
    })
    socket.on('disconnet',()=>{
        if("user" in socket){
            connectedUsers = removeUser(connectedUsers,socket.user.name)
            io.emit(USER_DISCONNECTED,connectedUsers)
            console.log(connectedUsers)
        }
    })
    socket.on(LOGOUT,()=>{
        connectedUsers =removeUser(connectedUsers,socket.user.name)
        io.emit(USER_DISCONNECTED,connectedUsers)
        console.log(connectedUsers)
    })
    socket.on(COMMUNITY_CHAT,(callback)=>{
        callback(communityChat)
    })
}
function addUser(userList,user){
    let newList = Object.assign({},userList)
    newList[user.name] = user
    return newList
}
function removeUser(userList,user){
    let newList = Object.assign({},userList)
    delete newList[user]
    return newList
}
function isUser (userList,user){
    return user in userList

}