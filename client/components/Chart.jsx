import React, { Component } from 'react';
import BarChart from 'react-bar-chart';

class Chart extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const temp = {}
        this.props.trips.forEach(trip => {
            trip.coords.forEach(coord => {
                let speed = Math.round(coord.speed / 2) * 2
                if(!!temp[speed]){
                    temp[speed]++;
                } else temp[speed] = 1;

            })
        })
        const data = []
        Object.keys(temp).forEach(speed => {
            data.push({text: ''+speed, value: temp[speed]});
        })

        return (
            <div id="chart">
                <BarChart
                margin = {{top: 20, right: 80, left: 80, bottom: 20}}
                width = {1000}
                height = {300}
                data = {data}
                />
                <p>Speeds (Mph)</p>
            </div>
        )
    }
}

export default Chart