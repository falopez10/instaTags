import React, { Component } from 'react';
import './App.css';
import SearchBox from "./SearchBox.js";
import TagButton from "./TagButton.js";

class App extends Component {

  constructor(props) {
    super(props);

    this.state={
      top10tags:[],
      searchedTags:[],
      queryTag:""
    };
  }

  componentDidMount() {
    //Solo se ejecuta al principio
    this.pedirSearchedTags();
  }

  pedirSearchedTags(){
    let me = this;
    fetch("api/searchedTags")
    .then((res) => {
      return res.json();
    })
    .then((_searchedTags) => {
      //como actualizo state, se renderiza
      me.setState({searchedTags:_searchedTags});
    })
    .catch((err) => console.log("no se pudo traer información: " + err) );
  }

  pedirTop10deQueryTag(_queryTag){
    let me = this;
    fetch("api/tag/"+_queryTag)
    .then((res) => {
      return res.json();
    })
    .then((_top10tags) => {
      let top10tags = _top10tags;
      //como actualizo state, se renderiza
      me.setState({top10tags:top10tags, queryTag:_queryTag});
      //actualizar histórico de consultas desde base de datos
      this.pedirSearchedTags();
        // console.log("estado top10tags: " + me.state.top10tags);
      })
    .catch((err) => console.log("no se pudo traer información: " + err) );
  }

  render() {
    return (
      <div className="App">
      <h1>Search by tag!</h1>
      <h3>Write a tag, and get the 10 most common associated tags!</h3>
      <div> <SearchBox onEnterQueryTag={this.pedirTop10deQueryTag.bind(this)}/>
      </div>
      <h3>Last tags searched: </h3>
      <div>{this.state.searchedTags.map((t)=>{
        return (<TagButton onClick={this.pedirTop10deQueryTag.bind(this)} tagObj={t}></TagButton>); })
      }
      </div>
      <h2>{"top 10 tags related to #"+this.state.queryTag}</h2>
      <div>{this.state.top10tags.map(
        (f) => {
            // console.log(f.top10tags_count);
            // return (<div>{"Tag: "+f.tag+" is used "+f.count+" times."}</div>);
            return (
              <div>
                {"Tag: "}
                <TagButton onClick={this.pedirTop10deQueryTag.bind(this)} tagObj={f}></TagButton>
                {" is used "+f.count+" times."}
              </div>
              );
          })
    }</div>
    <div><i>Made (with love) by Fabio López. Web-Dev Uniandes.</i></div>
    </div>
    );
  }
}

export default App;
