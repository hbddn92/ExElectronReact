import React from 'react'
const {remote} = window.require('electron')
const {Menu, MenuItem} = remote

class MenuItems extends React.Component {
	constructor() {
		super()
	}

	componentDidMount() {
		const menu = new Menu()
		menu.append(new MenuItem ({
			label: 'MenuItem1',
			click() { 
				console.log('item 1 clicked')
			}
		}))

		menu.append(new MenuItem({type: 'separator'}))
		menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}))
		menu.append(new MenuItem ({
			label: 'MenuItem3',
			click() {
				console.log('item 3 clicked')
			}
		}))

		window.addEventListener('contextmenu', (e) => {
			e.preventDefault()
			menu.popup(remote.getCurrentWindow())
		}, false)
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
				<h2>Click right mouse to show MenuItem</h2>
			</div>
		)
	}
}

module.exports = MenuItems