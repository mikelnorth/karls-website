import React, { Component } from 'react';
import './Events.css';
import Nav from '../nav/Nav.js'


export default class Events extends Component {
    constructor(props){
        super(props)

    }



    render() {
        return (
            <div className='Events'>
                <Nav />

            </div >
        )
    }
}