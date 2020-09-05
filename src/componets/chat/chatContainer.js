import React, { Component } from 'react'
import SideBar from './SideBar'
import { MESSAGE_SENT, TYPING } from '../../event'

export default class ChatContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeChat: null,
            communityChat: null,
            chats: [],
        }
    }
    componentDidMount(){

    }
    resetChat(chat){
        return this.addChat(chat,true)
    }
    setActiveChat= (activeChat)=>{
        this.setState({activeChat})
    }
    sendMessage = (chatId, message)=>{
        const{socket}= this.props
        socket.emit(MESSAGE_SENT,{chatId,message})
    }
    sendTyping = (chatId, isTyping) =>{
        const{socket}= this.props
        socket.emit(TYPING,{chatId,isTyping})
    }
    render() {
        const { user, logout } = this.props
        const {chats,activeChat} = this.state
        return (
            <div className="container">
                <SideBar logout={logout} chats={chats} user={user} activeChat={activeChat} setActiveChat={this.setActiveChat} />
                <div className="chat-room-container">
                {
                    activeChat !==null?(
                        <div className="chat-room">
                            <ChatHeading name={activeChat.name}/>
                            <Messages messages={activeChat.messages} user={user} typingUsers={activeChat.typingUsers}/>
                            <MessageInput sendMessage={
										(message)=>{ 
											this.sendMessage(activeChat.id, message) 
										}
									} 
									sendTyping={
										(isTyping)=>{ 
											this.sendTyping(activeChat.id, isTyping) 
										}
									}/>
                        </div>
                    ) : <div></div>
                }
                </div>
            </div>
        )
    }
}
