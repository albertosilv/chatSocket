import React, { Component } from 'react'
import {VERIFY_USER} from '../event'
export default class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            nickname:"",
            error:""
        }
        this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
    }

    setUser = ({user,isUser}) =>{
        if(isUser){
            this.setError("User name taken")
        }else{
            this.props.setUser(user)
        }

    }
    handleSubmit = (e)=>{
        e.preventDefault()
        const {socket} = this.props
        const {nickname} = this.state
        socket.emit(VERIFY_USER,nickname,this.setUser)

    }
    handleChange = (e)  =>{
        this.setState({nickname:e.target.value})
    }
    setError = (err) =>{
        this.setState({error:err})
    }
    render() {
        const {nickname,error} = this.state
        return (
            <div className="login">
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="nickname">
                        <h2>got a nickname?</h2>
                    </label>
                    <input
                        ref={(input) => {
                            this.textInput = input
                        }}
                        id="nickname"
                        value={nickname}
                        onChange = {this.handleChange}
                        type="text"
                        placeholder={"MyCoolUsername"}
                        >

                    </input>
                    <div className="error">
                        {error ? error : ""}
                    </div>
                </form>
            </div>
        )
    }
}