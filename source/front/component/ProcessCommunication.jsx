import React from 'react'
// import {ipcRenderer} from 'electron'
let {ipcRenderer} = window.require('electron')

class Communication extends React.Component {
	constructor() {
		super()
		this.state = {
			value: 'Message from main'
		}
	}

	sendMessage() {
		let value = this.input.value;

		if(value) {
			ipcRenderer.send('asynchronous-message', value)
		}

		ipcRenderer.on('asynchronous-reply', (event, arg) => {
			console.log(arg)
            this.setState({value: arg})
         })
	}

	render() {
		let style = {}
		if(this.props.display) {
			style.display = 'inherit'
		} else {
			style.display = 'none'
		}

		return(
			<div style={style} className="col-xs-offset-2 col-xs-8">
				<h2>Use ipcRenderer and ipcMain</h2>
				<input className = "form-control" type='text' ref={(input) => this.input = input} placeholder='input text to send' />
				<button type="button" className="btn btn-success" onClick={this.sendMessage.bind(this)}>Counter</button>
				<h3>{this.state.value}</h3>
			</div>
		)
	}
}

module.exports = Communication