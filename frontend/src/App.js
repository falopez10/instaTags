import React, { Component } from 'react';
import './App.css';
import SearchBox from "./SearchBox.js";
import TagButton from "./TagButton.js";
  //----------------------------------------------------------------
  //en DevMode, "localhost:3001/". De resto, poner en "" 
  //----------------------------------------------------------------
const serverDir = "";


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
    let headers = new Headers({
  "Content-Type": "text/plain",
  "Access-Control-Allow-Origin":"*"
});
    fetch(serverDir+"api/searchedTags", { method: 'GET', headers: headers})
    .then((res) => {
      let json = res.json();
      return json;
    })
    .then((_searchedTags) => {
      //como actualizo state, se renderiza
      me.setState({searchedTags:_searchedTags});
    })
    .catch((err) => console.log(err) );
  }

  pedirTop10deQueryTag(_queryTag){
    let me = this;
    fetch(serverDir+"api/tag/"+_queryTag)
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
      <div className="App container">
        <div className="row justify-content-center "><center><h1><b>InstaTags</b><br/>Search ocurrences by #tag!</h1></center></div>
        <div className="row top-buffer-g">
          <div className="col col-centered alert alert-success">
            <h2>Write a tag, and get the 10 most common associated tags</h2>
            <SearchBox  onEnterQueryTag={this.pedirTop10deQueryTag.bind(this)}/>
          </div>
        </div>
        <br/>
        <div><h3><i>...Or simply click one tag and we'll do the typing for you!</i></h3><br/></div>
        <div className="alert alert-secondary">
          <h3>Last tags searched: </h3>
          <div className="row ">{this.state.searchedTags.map((t)=>{
            return (<TagButton onClick={this.pedirTop10deQueryTag.bind(this)} tagObj={t}/>); })
          }
          </div>
        </div>
        <br/>
        <br/>
        <h2><b>{"Top 10 tags related to #"+this.state.queryTag}</b></h2>
        <div className="row">{this.state.top10tags.map(
          (f) => {
              // console.log(f.top10tags_count);
              // return (<div>{"Tag: "+f.tag+" is used "+f.count+" times."}</div>);
              return (
                  <span className="top-buffer-m"><TagButton onClick={this.pedirTop10deQueryTag.bind(this)} tagObj={f}/>
                                    <h6>{f.count+" ocurrences"}</h6></span>
                );
            })
      }</div>
      <div>
        <h3>
          {/*https://www.google.com/search?tbm=isch&q=findSomeImage*/}
        </h3>
      </div>
      <div className="top-buffer-g">
      <i>Made (with love) by <a href="https://falopez10.github.io/">Fabio López </a>.
      <br/>Web-Dev Uniandes 2018.</i></div>
    </div>
    );
  }
}

export default App;
