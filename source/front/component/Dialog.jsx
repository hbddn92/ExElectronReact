import React from 'react';
let {ipcRenderer} = window.require('electron')

class Dialog extends React.Component {
	constructor() {
		super()
		this.state = {
			text : ''
		}
	}

	showDialog() {
		ipcRenderer.send('showDialog')

		ipcRenderer.on('fileData', (event, data) => {
			this.setState({ text: data})
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
				<button type="button" className="btn btn-danger" onClick={this.showDialog.bind(this)}>Show Dialog</button>
				<h4>Data from file selected</h4>
				<p>{this.state.text}</p>
			</div>
		)
	}
}

module.exports = Dialog