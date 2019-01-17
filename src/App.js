import React, { Component } from 'react';
import './App.css';
import MapWrapper from './components/MapWrapper.jsx';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  render() {
    return (
      <div className="App">
        <MapWrapper/>
      </div>
    );
  }
}

export default App;
