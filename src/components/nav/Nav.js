import React, { Component } from 'react';
import './Nav.css';
import image from './../../assets/light.jpg'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    render() {
        return (
            <div className='nav'>
                <Link to='/'><p>Home</p></Link>
                <Link to='/wedding'><p>Portfolio</p></Link>
                <Link to='/events'><p>Events</p></Link>
                <Link to='/contact'><p>Contact</p></Link>
                <Link to='/about'><p>About</p></Link>
            </div >
        )
    }
}