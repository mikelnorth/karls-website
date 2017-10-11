import React, { Component } from 'react';
import './Messageboard.css';
import Nav from '../nav/Nav.js'


export default class Messageboard extends Component {
    constructor(props){
        super(props)

    }



    render() {
        return (
            <div className='Messageboard'>
                <Nav />

            </div >
        )
    }
}