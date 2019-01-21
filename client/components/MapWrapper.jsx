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
            lng = lng[0] + '.' + lng[1].slice(0, 4)
            let lat = (''+coord.lat).split('.');
            lat = lat[0] + '.' + lat[1].slice(0, 4)
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
        let select = index => this.props.selectTrip(index);
        this.props.trips.forEach(trip => {
            let avgSpeed = 0;
            
            // if(index !== 0) return;
            // let speedBracket = this.state.bracketize(trip.coords[0].speed);
            
            let randomColor = randomGreyscale();

            
            
            function addPolyline (polylines, path, color = randomGreyscale(), weight = 4) {
                trip.id = index;
                index++;
                // console.log(index);
                polylines.push(
                    <Polyline
                    path = {path}
                    strokeColor = {color}
                    strokeWeight = {weight}
                    key={index}
                    onClick = {e => select(trip.id)}
                    >
                    </Polyline>
                )
            }

            let path = []
            let active = true;
            for(let i in trip.coords){
                let coord = trip.coords[i];
                avgSpeed += coord.speed;
                const mode = this.props.mode;
                if(mode === types.DEFAULT || mode === types.BY_SPEED){
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
            trip.avgSpeed = avgSpeed / trip.coords.length;

            console.log(index, this.props.selectedTrip)
            if(index === this.props.selectedTrip){
                console.log('rendering selected trip')
                const start = trip.coords[0];
                const end = trip.coords[trip.coords.length - 1];
                markers.push(<Marker position = {{lng: start.lng, lat: start.lat}}/>)
                markers.push(<Marker position = {{lng: end.lng, lat: end.lat}}/>)
                addPolyline(polylines, path, "#FF3333", 10) 
            } else {
                addPolyline(polylines, path, randomGreyscale(), (trip.avgSpeed / 40) * 5 + 2)
            }
            
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