import React, { Component } from 'react';
import './Messageboard.css';
import Nav from '../nav/Nav.js'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Login from '../login/Login.js'
import { getCustomers } from './../../ducks/reducer.js';

class Messageboard extends Component {
    constructor(props) {
        super(props)



    }

    componentDidMount() {
        !this.props.user ? (this.props.history.push('/'), alert('ACCESS DENIED, Admin access only')) : null;


        
        this.props.getCustomers();
        
       
    }




    render() {
        console.log('this should be the list of customers', this.props.customers.data)
        return (
            <div className='Messageboard'>
                <Nav />
                <h1>INBOX</h1>
                <div className='names'>
                    <h4>Customer Information</h4>
                    {this.props.customers.data.length ? this.props.customers.data.map((val, i, arr) => {
                        return <div>
                            <p>Name:{val.first_name}</p>
                        </div>
                    }) : null}
                </div>


                <Login />
            </div >
        )
    }
}

function mapStatetoProps(state) {
    return {
        user: state.user,
        customers: state.customers
    }
}

export default (connect(mapStatetoProps, { getCustomers })(Messageboard));