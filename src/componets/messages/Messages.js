import React, { Component } from 'react';

export default class Messages extends Component {
	constructor(props) {
	  super(props);
	  this.scrollDowm = this.scrollDowm.bind(this)
		
	}
	scrollDowm(){
		const {container} =  this.refs
		container.scrollTop = container.scrollHeight
	}
	componentDidMount (){
		this.scrollDowm()
	}
	componentDidUpdate(prevProps,prevState){
		this.scrollDowm()
	}
	render() {
		const { messages, user, typingUsers } = this.props
		return (
			<div ref='container'
				className="thread-container">
				<div className="thread">
					{
						messages.map((mes)=>{
							return (
								<div
									key={mes.id}
									className={`message-container ${mes.sender === user.name && 'right'}`}
								>
									<div className="time">{mes.time}</div>
									<div className="data">
										<div className="message">{mes.message}</div>
										<div className="name">{mes.sender}</div>
									</div>
								</div>

								)
						})
					}
				</div>


			</div>
		);
	}
}