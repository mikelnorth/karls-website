import React, { Component } from 'react';
import './Login.css';
import Nav from '../nav/Nav.js'
import instagram from '../../assets/instagram.svg';
import youtube from '../../assets/youtube.svg';
import facebook from '../../assets/facebook.svg';


export default class Login extends Component {
    constructor(props) {
        super(props)

    }



    render() {
        return (
            <div className='footer'>
                <h3>follow us on social media</h3>
                <div className='follow'>
                    <a href='https://www.instagram.com/mr.karlnorth/?hl=en' target="_blank"><img src={instagram} height='60px' /></a>
                    <a href='https://www.youtube.com/channel/UCV5SeFnY-ZG3lZg78mIsNFA' target="_blank"><img src={youtube} height='60px' /></a>
                    <a href='https://www.facebook.com/karl.north' target="_blank"><img src={facebook} height='60px' /></a>
                </div>

                <span className='finePrint'>All video and picture media is copyright and owned by Karl North Media,<br />
                    Website developed and designed by Mikel North.<br />
                    icons are not owned by Karl North Media and have been provided by  Freepik from www.flaticon.com
                 </span>
                <div className='login'>
                    <a href={process.env.REACT_APP_LOGIN}><span className="login_button">Login</span></a>
                    <a href='http://localhost:3005/auth/logout'><span className="login_button">Log out</span></a>
                </div>
            </div >
        )
    }
}