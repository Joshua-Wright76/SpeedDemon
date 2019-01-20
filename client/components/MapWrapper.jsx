import React, { Component } from 'react';
import { MAPS_KEY } from '../environment.js';
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react'; 
import { randomGreyscale } from '../randomPastel.js';
import * as types from '../constants.js'

const mapStyles = {
    height: '60%',
    width: '100%'
}

class MapWrapper extends Component {
    constructor(props){
        super(props);
    }

    render(){ //37.692660, -122.309536
        const polylines = [];
        
        this.props.trips.forEach(trip => {
            // let speedBracket = this.state.bracketize(trip.coords[0].speed);
            const randomColor = randomGreyscale()
            // markers.push(<Marker />)
            trip.coords.forEach(coord => {
                if(maxSpeed < coord.speed){
                    maxSpeed = coord.speed;
                    console.log(maxSpeed);
                }
                if(this.state.mode === types.DEFAULT){
                    path.push({lng: coord.lng, lat: coord.lat})                            
                } else if(this.state.mode === types.LOW_RES){
                    path.push({lng: Math.round(coord.lng / 0.005) * 0.005, lat: Math.round(coord.lat / 0.005) * 0.005})
                }
            
                polylines.push(
                    <Polyline
                    path = {path}
                    strokeColor = {randomColor}
                    ></Polyline>
                )
            })
        })

        const map = (
            <div id="MapWrapper">
                <Map
                    google = {this.props.google}
                    zoom={10}
                    style={mapStyles}
                    initialCenter={{
                        lat: 37.692660,
                        lng: -122.309536
                    }}
                >{polylines}</Map>
            </div>
        )
        if(this.props.trips[1]){
            console.log(this.props.trips)
            console.log(polylines);
            return map;
        } else return <div></div>
    }
}


export default GoogleApiWrapper({
    apiKey: MAPS_KEY
})(MapWrapper);