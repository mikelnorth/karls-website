import React, { Component } from 'react';
import './Inbox.css';
import Nav from '../nav/Nav.js'
import Login from '../login/Login.js'


export default class Inbox extends Component {
    constructor(props){
        super(props)

    }



    render() {
        return (
            <div className='Inbox'>
                <Nav />
                <Login />
            </div >
        )
    }
}