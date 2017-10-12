import React, { Component } from 'react';
import './Events.css';
import Nav from '../nav/Nav.js'
import Login from '../login/Login.js'


export default class Events extends Component {
    constructor(props){
        super(props)

    }



    render() {
        return (
            <div className='Events'>
                <Nav />
                <img className='eventspic' src='https://media1.s-nbcnews.com/i/newscms/2017_19/1213207/everest-wedding-today-170509-tease_1b1cf6e45c3be37559d89ee1ff58a13d.jpg'/>
                <div></div>
                <div></div>
                <div></div>
          

                <Login />
            </div >
        )
    }
}