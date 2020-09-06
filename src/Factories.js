const { v4: uuidv4 } = require('uuid');

const createUser = ({name = " ",socketId = null})=>(
    {
       id: uuidv4(),
	   name,
	   socketId
   }
)
const createChat = ({messages = [], name="Community", users=[]} = {})=>(
	{
		id: uuidv4(),
		name,
		messages,
		users,
		typingUsers: [],
		
	})
const createMessage = ({message, sender})=>{
	return {
		id: uuidv4(),
		time: getTime(new Date(Date.now())),
		message: message|| " ",
		sender: sender|| " "
	}
}

const getTime = (date) =>{
    return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`
}

module.exports = {
	createChat,
	createMessage,
	createUser
}