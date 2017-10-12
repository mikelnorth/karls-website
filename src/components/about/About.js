import React, { Component } from 'react';
import './About.css';
import Nav from '../nav/Nav.js'
import Login from '../login/Login.js'


export default class About extends Component {
    constructor(props){
        super(props)

    }



    render() {
        return (
            <div className='About'>
                <Nav />

                <Login />
            </div >
        )
    }
}