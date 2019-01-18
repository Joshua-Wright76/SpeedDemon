import React, { Component } from 'react';
import './App.css';
import MapWrapper from './components/MapWrapper.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      trips: []
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
      </div>
    );
  }
}

export default App;
