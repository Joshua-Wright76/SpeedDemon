import React, { Component } from 'react';
import MapWrapper from './components/MapWrapper';
import Menu from './components/Menu';
import Chart from './components/Chart';
import * as types from './constants'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      trips: [],
      mode: types.DEFAULT,
      setMode: newMode => this.setState({mode: newMode}),
      setTheme: newTheme => this.setState({theme: newTheme}),
      theme: types.GREYSCALE,
      selectedTrip: 7,
      selectTrip: key => {
        console.log(this);
        this.setState({slectedTrip: key})
      }
    }
    this.state.selectTrip.bind(this);
    this.state.setMode.bind(this);
    this.state.setTheme.bind(this);
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
        // console.log(data);
        this.setState({trips: data});
      })

  }

  render() {
    let loading;
    let info;
    const loadingIconSrc = "https://static.thenounproject.com/png/1016735-200.png"
    if(!this.state.trips.length){
      const logoStyle = {
        height: '50px',
        width: '50px'
      }
      loading = (
        <div id="loading">
          <img src = {loadingIconSrc} className="App-logo" style={logoStyle}></img>
          <p>Loading from Database... Just a second!</p>
        </div>
      )
    }
    console.log(!!this.state.trips.length);
    if(this.state.selectedTrip){
      console.log('Selected Trip info up on the page! I hope.')
      let selected;
      //find the selected trip and put it in the 'selected' variable.
      this.state.trips.forEach(trip => { if(trip.id === this.state.selectedTrip) selected = trip; })

      info = (
        <div id="info">
          <p>{selected.start_time}</p>
          <p>{selected.end_time}</p>
        </div>
      )
    }
    return (
      <div className="App">
        <MapWrapper 
          trips = {this.state.trips}
          mode={this.state.mode}
          theme = {this.state.theme}
          selectTrip = {this.state.selectTrip}
          selectedTrip = {this.state.selectedTrip}
          />
        {loading}
        {info}
        <Menu setMode = {this.state.setMode} setTheme = {this.state.setTheme}/>
        <Chart trips = {this.state.trips}/>
      </div>
    );
  }
}

export default App;
