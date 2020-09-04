import React, { Component } from 'react'
import { USER_CONNECTED, USER_DISCONNECTD, LOGOUT } from '../event'
import io from 'socket.io-client'
import LoginForm from './LoginForm'
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
        this.initSocket()
    }
    initSocket = () => {
        const socket = io(socketURL)
        socket.on('connect', () => {
            console.log('Connected')
        })
        this.setState(socket)
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

        return (
            <div className='container'>
                <LoginForm socket={this.state.socket} setUser = {this.setUser}/>
            </div>
        )
    }
}