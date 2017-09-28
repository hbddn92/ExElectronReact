import React 		from 'react';
import ReactDOM 	from 'react-dom';
import Count 		from './Count';
import FileHandle 	from './FileHandle';
import Communication from './ProcessCommunication'
import Dialog 		from './Dialog'
import MenuItem 	from './MenuItem'

let fs = window.require('fs')
let filename = 'contacts'

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			value: 0,
			dataReadFile: [],
			display: {
				Counter: true,
				FileHandle: false,
				Communication: false,
				Dialog: false,
				MenuItem: false
			}
		}
		this.counter    = this.counter.bind(this)
	}

	counter() {
		var vl = this.state.value + 1;
		this.setState({value: vl})
	}

	componentDidMount() {
		let dataReadFile = loadAndDisplayContacts();
		this.setState({dataReadFile: dataReadFile})
	}

	readFile() {
		let dataReadFile = loadAndDisplayContacts();
		this.setState({dataReadFile: dataReadFile})
	}

	setDisplay(value) {
		var currentDisplay = Object.assign({}, this.state.display)

		for(var item in currentDisplay) {
			if(item == value) {
				currentDisplay[item] = true
			} else {
				currentDisplay[item] = false
			}
		}

		this.setState({display: currentDisplay})
	}

	render() {
		return (
			<div>
				<div className='control-Btn'>
					<button type="button" className="btn btn btn-primary" onClick={this.setDisplay.bind(this, 'Counter')}>Counter</button>
					<button type="button" className="btn btn-secondary" onClick={this.setDisplay.bind(this, 'FileHandle')}>FileHandle</button>
					<button type="button" className="btn btn-success" onClick={this.setDisplay.bind(this, 'Communication')}>Communication</button>
					<button type="button" className="btn btn-danger" onClick={this.setDisplay.bind(this, 'Dialog')}>Dialog</button>
					<button type="button" className="btn btn-danger" onClick={this.setDisplay.bind(this, 'MenuItem')}>MenuItem</button>
					{/*<button type="button" class="btn btn-warning">Success</button>
					<button type="button" class="btn btn-info">Danger</button>
					<button type="button" class="btn btn-light">Warning</button>
					<button type="button" class="btn btn-outline-info">Info</button>
					<button type="button" class="btn btn-outline-light">Light</button>
					<button type="button" class="btn btn-outline-dark">Dark</button>*/}
				</div>
				<Count display={this.state.display.Counter}/>
				<FileHandle display={this.state.display.FileHandle} dataReadFile={this.state.dataReadFile} readFile={this.readFile.bind(this)} />
				<Communication display={this.state.display.Communication} />
				<Dialog display={this.state.display.Dialog} />
				<MenuItem display={this.state.display.MenuItem} />
			</div>
		)
	}
}

function loadAndDisplayContacts() {  
   let dataReadFile = []

   if(fs.existsSync(filename)) {
      let data = fs.readFileSync(filename, 'utf8').split('\n')
      data.forEach((contact, index) => {
         let [ name, email ] = contact.split(',')
         let row = {name: name, email: email}
         dataReadFile.push(row)
      })
   } else {
      console.log("File Doesn\'t Exist. Creating new file.")
      fs.writeFile(filename, '', (err) => {
         if(err)
            console.log(err)
      })
   }
    return dataReadFile;
}

ReactDOM.render(<App />, document.querySelector('.root'));