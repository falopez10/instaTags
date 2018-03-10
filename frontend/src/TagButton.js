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
			<div className="top-buffer-m float-left">
				<button className="btn btn-outline-primary" onClick={this.onClick.bind(this)}>{this.props.tagObj.tag}</button>
			</div>
		);

	}
}