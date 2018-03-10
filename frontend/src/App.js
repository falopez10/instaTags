import React, { Component } from 'react';
import './App.css';
import SearchBox from "./SearchBox.js";

class App extends Component {

  constructor(props) {
    super(props);

    this.state={
      top10tags:[]
    };
  }

  componentDidMount() {
    //Solo se ejecuta al principio
    
  }


  pedirTop10deQueryTag(_queryTag){
    let me = this;
    fetch("api/"+_queryTag)
    .then((res) => {
      console.log("componentDidMount")
      return res.json();
    })
    .then((_top10tags) => {
      let top10tags = _top10tags;
      //como actualizo state, se renderiza
      me.setState({top10tags:top10tags});
        // console.log("estado top10tags: " + me.state.top10tags);
      })
    .catch((err) => console.log(err) );
  }

  render() {
    return (
      <div className="App">
      <h1>Search by tag!</h1>
      <h3>Write a tag, and get the 10 most common associated tags!</h3>
      <div> <SearchBox onEnterQueryTag={this.pedirTop10deQueryTag.bind(this)}/></div>
      <h2>top 10 tags </h2>
      <div>{this.state.top10tags.map(
        (f) => {
            // console.log(f.top10tags_count);
            return (<div>{"Tag: "+f.tag+" is used "+f.count+" times."}</div>);
          })
    }</div>
    <div>Fabio López. Web-Dev Uniandes.</div>
    </div>
    );
  }
}

export default App;
