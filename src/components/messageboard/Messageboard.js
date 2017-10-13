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

    componentDidMount() {
        !this.props.user ? (this.props.history.push('/'), alert('ACCESS DENIED, Admin access only')) : null;
    }



    render() {
        return (
            <div className='Messageboard'>
                <Nav />

                <div className='messages'>
                    <h1>INBOX</h1>
                    <h4>Customer Information</h4>

                </div>


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