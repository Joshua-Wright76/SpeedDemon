import React, { Component } from 'react';
import './App.css';
import MapWrapper from './components/MapWrapper.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: 'placeholder'
    }
  }

  componentDidMount(){
    fetch('http://localhost:3001/trips')
      .catch(error => {
        console.error(error)
      })
      .then(res => {
        return res.json();
      })
      .catch(error => {
        console.error(error)
      })
      .then(data => {
        console.log(JSON.stringify(data))
      })
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
