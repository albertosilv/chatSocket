const io = require('./index.js').io
let connectedUsers = {}
const {
    COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
    USER_CONNECTED, USER_DISCONNECTED, TYPING,
    STOP_TYPING, VERIFY_USER, LOGOUT,PRIVATE_MESSAGE
} = require('../event')

const { createUser, createChat, createMessage } = require('../Factories')
let communityChat = createChat()

module.exports = function (socket) {
    let sendMessageToChatFromUser
    console.log(socket.id)
    socket.on(VERIFY_USER, (nickname, callback) => {
        if (isUser(connectedUsers,nickname)) {
            callback({ isUser: true, user: null })
        }
        else {
            callback({ isUser: false, user: createUser({ name: nickname ,socketId:socket.id}) })
        }
    })

    socket.on(USER_CONNECTED,(user)=>{
        user.socket=socket.id
        connectedUsers = addUser(connectedUsers,user)
        socket.user = user
        sendMessageToChatFromUser = sendMessageToChat(user.name)
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
    socket.on(MESSAGE_SENT, ({chatId, message})=>{
		sendMessageToChatFromUser(chatId, message)
    })
    socket.on(PRIVATE_MESSAGE,({reciever,sender})=>{
       if(reciever in connectedUsers){
           const newChat = createChat({name:`${reciever}&${sender}`,users:[reciever,sender]})
           const recieverSocket = connectedUsers[reciever].socket
           socket.to(recieverSocket).emit(PRIVATE_MESSAGE,newChat)
           socket.emit(PRIVATE_MESSAGE,newChat)
       }
    })
}

function sendMessageToChat(sender){
	return (chatId, message)=>{
		io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({message, sender}))
	}
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