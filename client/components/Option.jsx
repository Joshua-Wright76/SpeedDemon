import React, { Component } from 'react';

const Option = props => {
    return (
        <div className="options">
            <button id = {props.label}>{props.label}</button>
            
        </div>
    )
}

export default Option