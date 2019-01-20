import React, { Component } from 'react';
import './App.css';
import MapWrapper from './components/MapWrapper.jsx';
import Menu from './components/Menu.jsx';
import * as types from './constants.js'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      trips: [],
      mode: types.DEFAULT,
      setMode: newMode => this.setState({mode: newMode})
    }
  }

  componentDidMount(){
    console.log('fetching data!')
    fetch('http://localhost:3000/trips')
      .catch(error => {
        console.error(error)
      })
      .then(res => {
        console.log('Got a result back! Just formatting it now.')
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState({trips: data});
      })

  }

  render() {
    return (
      <div className="App">
        <MapWrapper trips = {this.state.trips}/>
        <Menu></Menu>
      </div>
    );
  }
}

export default App;
