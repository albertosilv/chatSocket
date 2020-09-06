import React, { Component } from 'react'
import { USER_CONNECTED, USER_DISCONNECTD, LOGOUT, PRIVATE_MESSAGE } from '../event'
import io from 'socket.io-client'
import LoginForm from './LoginForm'
import ChatContainer from './chat/chatContainer'
const socketURL = "http://192.168.1.10:3231"

export default class Layout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            socket: null,
            user: null
        }
    }
    componentDidMount() {
        const socket = io(socketURL)
		this.setState({ socket })
		this.initSocket(socket)
    }
    initSocket = (socket) => {
        socket.on('connect', () => {
            console.log('Connected')
        })
    }
    
    setUser = (user) => {
        const { socket } = this.state
        socket.emit(USER_CONNECTED,user)
        this.setState({ user })
    }
    logout = () => {
        const{socket} = this.state
        socket.emit(LOGOUT)
        this.setState({user:null})
    }
    render() {
        const { title } = this.props
        const  {socket,user} = this.state
        return (
            <div className='container'>
               {!user? 
               <LoginForm socket={socket} setUser = {this.setUser}/>
               : 
               <ChatContainer socket={socket} user={user} logout={this.logout}/>}
            </div>
        )
    }
}