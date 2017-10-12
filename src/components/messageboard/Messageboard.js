import React, { Component } from 'react';
import './Messageboard.css';
import Nav from '../nav/Nav.js'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Login from '../login/Login.js'

class Messageboard extends Component {
    constructor(props) {
        super(props)

    }
    
    componentDidMount(){
        !this.props.user ? (this.props.history.push('/'),alert('ACCESS DENIED, Admin access only')) : null;
    }


    render() {
        console.log('history', this.props.history.push)
        return (
            <div className='Messageboard'>
                <Nav />
                <Login />
            </div >
        )
    }
}

function mapStatetoProps(state) {
    return {
        user: state.user
    }
}

export default (connect(mapStatetoProps, {})(Messageboard));