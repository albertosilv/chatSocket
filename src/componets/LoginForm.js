import React, { Component } from 'react'

export default class LoginForm extends Component {
    render() {
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
                        oncChange = {this.handleChange}
                        type="text"
                        placeholder={"MyCoolUsername"}
                        >

                    </input>
                </form>
            </div>
        )
    }
}