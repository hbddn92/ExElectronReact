import React from 'react';

class Count extends React.Component {
	constructor() {
		super();
		this.state = {
			value: 0,
		}
		this.counter = this.counter.bind(this)
	}

	counter() {
		var vl = this.state.value + 1;
		this.setState({value: vl})
	}

	render() {
		let style = {}
		if(this.props.display) {
			style.display = 'inherit'
		} else {
			style.display = 'none'
		}
		return (
			<div style={style} className="col-xs-offset-2 col-xs-8">
				<h3 ref={(el) => {this.text = el}} id="click-counter">{this.state.value}</h3>
				<button className="btn btn-primary" id="countbtn" onClick={this.counter}>Click here</button>
			</div>
		)
	}
}

module.exports = Count