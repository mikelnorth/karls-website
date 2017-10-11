import React, { Component } from 'react';
import './Contact.css';
import Nav from '../nav/Nav.js'


export default class Contact extends Component {
    constructor(props){
        super(props)

    }



    render() {
        return (
            <div className='Contact'>
                <Nav />

            </div >
        )
    }
}