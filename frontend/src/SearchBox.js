import React, {Component} from "react";

export default class SearchBox extends Component{
	constructor(props){
		super(props);
	}

	onEnterQueryTag(evt){
		// console.log(evt.target.value);
		//llamar a metodo que viene en props
		this.props.onEnterQueryTag(evt.target.value);
	}

	render(){
		return (
			<div>
				<input type="text" onInput={this.onEnterQueryTag.bind(this)}/>
			</div>
		);

	}
}