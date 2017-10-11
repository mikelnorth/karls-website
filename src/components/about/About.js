import React, { Component } from 'react';
import './About.css';
import Nav from '../nav/Nav.js'


export default class About extends Component {
    constructor(props){
        super(props)

    }



    render() {
        return (
            <div className='About'>
                <Nav />

            </div >
        )
    }
}