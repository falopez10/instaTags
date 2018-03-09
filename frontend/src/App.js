import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state={
      followers:[]
    };
  }

  componentDidMount() {
    let me = this;
    fetch("api/cat")
      .then((res) => {
        return res.json();
      })
      .then((_followers) => {
        let followers = _followers;
        me.setState({followers:followers});
        // console.log("estado followers: " + me.state.followers);
      })
      .catch((err) => console.log(err) );
  }


    
  render() {
    return (
      <div className="App">

        <h1>Followers </h1>
        <div>{this.state.followers.map(
          (f) => {
            // console.log(f.followers_count);
            return (<div>{f.user.followers_count}</div>);
          })
        }</div>
        <div>Made by John with <span role="img">❤</span>️</div>
      </div>
    );
  }
}

export default App;
