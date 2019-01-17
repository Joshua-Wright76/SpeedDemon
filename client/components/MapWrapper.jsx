import React, { Component } from 'react';
import { MAPS_KEY } from '../environment.js';
import { Map, GoogleApiWrapper } from 'google-maps-react'; 

const mapStyles = {
    height: '800px',
    width: '800px'
}

class MapWrapper extends Component {
    constructor(props){
        super(props);
    }

    render(){ //37.692660, -122.309536
        return (
            <div>
                <Map
                    google = {this.props.google}
                    zoom={10}
                    style={mapStyles}
                    initialCenter={{
                        lat: 37.692660,
                        lng: -122.309536
                    }}
                />
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: MAPS_KEY
})(MapWrapper);