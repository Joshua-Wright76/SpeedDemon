import React, { Component } from 'react';
import Option from './Option.jsx';

class Menu extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div id="menu">
                <Option label="Default"></Option>
                <Option label="Lo-Res"></Option>
                <Option label="By Speed"></Option>
            </div>
        )
    }

}

export default Menu;