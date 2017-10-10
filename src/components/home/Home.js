import React, { Component } from 'react';
import './Home.css';
import img from './../../assets/light.jpg'

const urlFromDB = 'https://www.youtube.com/embed/teLhLLlhfzc?showinfo=0'
export default class Home extends Component {
    render() {
        return (
            <div className='App'>  
                <iframe width="560" height="315" src={urlFromDB} frameborder="0" allowfullscreen='true' ></iframe>
                <a href={ process.env.REACT_APP_LOGIN }><button className="button">Login</button></a>
            </div> 
        )
    }
}