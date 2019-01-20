import React, { Component } from 'react';
import { MAPS_KEY } from '../environment.js';
import { Map, GoogleApiWrapper, Marker, Polyline } from 'google-maps-react'; 
import { randomGreyscale, randomPastel, randomNeon } from '../randomPastel.js';
import * as types from '../constants.js'

const mapStyles = {
    height: '60%',
    width: '100%'
}

class MapWrapper extends Component {
    constructor(props){
        super(props);
        console.log('Props from mapwrapper!: ', props);
    }

    render(){ //37.692660, -122.309536
        const polylines = [];
        const markers = [];
        const points = {};
        function setPoint(points, coord, index){ //setpoint rounds off the coordinates for you to the nearest .001
            let lng = (''+coord.lng).split('.');
            lng = lng[0] + '.' + lng[1].slice(0, 3)
            let lat = (''+coord.lat).split('.');
            lat = lat[0] + '.' + lat[1].slice(0, 3)
            let rounded = lat + ':' + lng;

            if(!!points[rounded]){
                if(points[rounded] === index){
                    return false; //all good to go!
                } else {
                    return true; //somebody's been here before...
                }
            } else { //nothing is there in the records
                points[rounded] = index;
                return false; //all good to go! 
            }
        }

        let index = 0
        let select = this.props.selectTrip;
        this.props.trips.forEach(trip => {
            index++;
            // if(index !== 0) return;
            // let speedBracket = this.state.bracketize(trip.coords[0].speed);
            
            let randomColor = randomGreyscale();

            if(this.props.mode === types.BY_SPEED){
                var currentSpeed = trip.coords[0].speed;
            }
            
            function addPolyline (polylines, path, color = randomGreyscale(), weight = 5) {
                index++;
                trip.id = index;
                polylines.push(
                    <Polyline
                    path = {path}
                    strokeColor = {color}
                    strokeWeight = {weight}
                    key={index}
                    onClick = {e => select(index)}
                    >
                    </Polyline>
                )
            }

            let path = []
            let active = true;
            for(let i in trip.coords){
                let coord = trip.coords[i];
                const mode = this.props.mode;
                if(mode === types.DEFAULT){
                    path.push({lng: coord.lng, lat: coord.lat});
                } else if (mode === types.LOW_RES){
                    path.push({lng: Math.round(coord.lng / 0.005) * 0.005, lat: Math.round(coord.lat / 0.005) * 0.005})
                } else if (mode === types.SIMPLIFIED){
                    if(setPoint(points, coord, index)) {//setpoint returns true if there's a point there already
                        // console.log('collision!');
                        
                        if(active){
                            path.push({lng: coord.lng, lat: coord.lat});
                           
                            if(path.length >= 10) addPolyline(polylines, path, randomColor);
                            path = [];
                            active = false;
                        }
                        continue;
                    } else {
                        if(!active) active = true;
                        path.push({lng: coord.lng, lat: coord.lat});
                    }
                }
            }
            
            index === this.props.selectedTrip ? addPolyline(polylines, path, "#00FFFF", 10) : addPolyline(polylines, path)//avoid point lines
            
        })
        if(polylines.length){
            console.log('DONE RENDERING PATHS')
            console.log(Object.keys(points).length)
            console.log(points)
        }

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
                >
                {polylines}
                {markers}
                </Map>
            </div>
        )

        return map;
    }
}


export default GoogleApiWrapper({
    apiKey: MAPS_KEY
})(MapWrapper);