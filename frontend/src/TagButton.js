import React, {Component} from "react";

export default class TagButton extends Component{
	constructor(props){
		super(props);
	}

	onClick(){
		this.props.onClick(this.props.tagObj.tag);
	}

	render(){
		return (
			<button onClick={this.onClick.bind(this)}>{this.props.tagObj.tag}</button>
				
		);

	}
}