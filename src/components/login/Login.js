import React, { Component } from 'react';
import './Login.css';
import Nav from '../nav/Nav.js'


export default class Login extends Component {
    constructor(props) {
        super(props)

    }



    render() {
        return (
            <div className='Login'>
                <a href={process.env.REACT_APP_LOGIN}><button className="button">Login</button></a>
                <a href='http://localhost:3005/auth/logout'><button>Log out</button></a>
            </div >
        )
    }
}