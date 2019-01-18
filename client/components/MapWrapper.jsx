import React, { Component } from 'react';
import { MAPS_KEY } from '../environment.js';
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react'; 
import { randomGreyscale } from '../randomPastel.js';
import * as types from '../constants.js'

const mapStyles = {
    height: '800px',
    width: '800px'
}

class MapWrapper extends Component {
    constructor(props){
        super(props);
        console.log('props from MapWrapper: ', props)
        this.state = {
            bracketize: function(n) {
                if(n >= 60) return 60;
                else if(n >= 30) return 30;
                else return 0;
            },
            bracketColors: {
                0: "#000000",
                30: "#00FF00",
                60: "FF0000"
            },
            mode: types.DEFAULT
        }
    }

    render(){ //37.692660, -122.309536
        const markers = [];
        const polylines = [];
        if(this.props.trips[7]){
            let maxSpeed = -Infinity;
            this.props.trips.forEach(trip => {
                // let speedBracket = this.state.bracketize(trip.coords[0].speed);
                const randomColor = randomGreyscale()
                let lastSpeed = trip.coords[0].speed;
                let path = [];
                // markers.push(<Marker />)
                trip.coords.forEach(coord => {
                    if (false){ //this.state.bracketize(coord.speed) !== speedBracket Math.round(coord.speed / 2) * 2) !== lastSpeed
                        const hexChunk = Math.round((coord.speed / 45) * 16).toString(16)
                        // const color = '#' + hexChunk + hexChunk + hexChunk
                        polylines.push(<Polyline path={path}
                            
                        />)
                        this.speedBracket = this.state.bracketize(coord.speed)
                        path = [];

                    } else {
                        if(maxSpeed < coord.speed){
                            maxSpeed = coord.speed;
                            console.log(maxSpeed);
                        }
                        if(this.state.mode === types.DEFAULT){
                            path.push({lng: coord.lng, lat: coord.lat})                            
                        } else if(this.state.mode === types.LOW_RES){
                            path.push({lng: Math.round(coord.lng / 0.005) * 0.005, lat: Math.round(coord.lat / 0.005) * 0.005})
                        }
                    }
                })
                
                polylines.push(
                    <Polyline
                    path = {path}
                    strokeColor = {randomColor}
                    ></Polyline>
                )
            })

        }

        const map = (
            <div>
                <Map
                    google = {this.props.google}
                    zoom={10}
                    style={mapStyles}
                    initialCenter={{
                        lat: 37.692660,
                        lng: -122.309536
                    }}
                >
                    {polylines}

                </Map>
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