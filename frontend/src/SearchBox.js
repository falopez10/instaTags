import React, {Component} from "react";

export default class SearchBox extends Component{
	constructor(props){
		super(props);
	}


	onEnterQueryTag(evt){
		// console.log(evt.target.value);
		//llamar a metodo que viene en props
		setTimeout(function(){}, 1500);
		this.props.onEnterQueryTag(evt.target.value);
	}


	render(){

		return (
			<div >
				<input id="tagQueryInput" placeholder="Write your favorite tag" 
				className="border border-primary rounded"
				type="text" onInput={this.onEnterQueryTag.bind(this)}/>
			</div>
			
		);

	}
}