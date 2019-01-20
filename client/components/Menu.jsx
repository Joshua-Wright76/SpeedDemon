import React, { Component } from 'react';
import Option from './Option.jsx';
import * as types from '../constants.js'

class Menu extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div id="menu">
                <Option label="Default" handleClick = {this.props.setMode} val = {types.DEFAULT}/>
                <Option label="Lo-Res" handleClick = {this.props.setMode} val = {types.LOW_RES}/>
                <Option label="Simplified" handleClick = {this.props.setMode} val = {types.SIMPLIFIED}/>

                {/* <Option label="Dark Mode" handleClick = {this.props.setTheme} val = {types.DARK_MODE}/> */}
                {/* <Option label="Greyscale" handleClick = {this.props.setTheme} val = {types.GREYSCALE}/> */}
                <Option label="By Speed" handleClick = {this.props.setMode} val = {types.BY_SPEED}/>
            </div>
        )
    }

}

export default Menu;