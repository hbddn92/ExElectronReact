import React from 'react';
let fs = window.require('fs')

let data = []

class FileHandle extends React.Component {
	constructor() {
		super();
		this.addToList = this.addToList.bind(this)
	}

	addToList() {
		let name = this.name.value
		let email = this.email.value
		let self = this;
		if(name && email) {
			var p = new Promise(function(resolve, reject) {
				fs.appendFile('contacts', name + ',' + email + '\n', function(err){
					if(err) throw err;
					resolve();
				});
			})
			p.then(function() {
				self.props.readFile()
			})
		}
	}

	render() {
		let style = {}
		if(this.props.display) {
			style.display = 'inherit'
		} else {
			style.display = 'none'
		}
		var rowList = this.props.dataReadFile.map(function(item, index) {
			return <tr key={index}>
						<td className = "col-xs-2">{index}</td>
						<td className = "col-xs-4">{item.name}</td>
						<td className = "col-xs-6">{item.email}</td>
					</tr>
		})

		return(
			<div className = "container" style={style}>
				<h2>Enter Names and Email addresses of your contacts</h2>
				<div className = "form-group">
					<label for = "Name">Name</label>
					<input type="text" name="Name" id="Name" placeholder="Name" className = "form-control" ref={(input) => {this.name = input}}/>
				</div>

				<div className = "form-group">
					<label for = "Email">Email</label>
					<input type="email" name="Email" placeholder="Email" className="form-control"  ref={(input) => {this.email = input}}/>
				</div>

				<div className = "form-group">
					<button className = "btn btn-secondary" id="add-to-list" onClick={this.addToList}>Add to list!</button>
				</div>


				<h2>Read from file "contacts"</h2>
				<div id = "contact-list">
					<table className = "table-striped" id = "contact-table">
						<tr>
							<th className = "col-xs-2">S. No.</th>
							<th className = "col-xs-4">Name</th>
							<th className = "col-xs-6">Email</th>
						</tr>
						{rowList}
					</table>
				</div>
			</div>
			)
	}
}



module.exports = FileHandle