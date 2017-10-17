import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getCustomers } from './../../ducks/reducer.js';
import './Inbox.css'
import Nav from '../nav/Nav.js';
import Login from '../login/Login.js';



class Messageboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: null
        }

        this.deleteMessage = this.deleteMessage.bind(this);
    }

    componentDidMount() {
        !this.props.user ? (this.props.history.push('/'), alert('ACCESS DENIED, Admin access only')) : null;

        this.props.getCustomers();
    }

    deleteMessage(id) {
        this.setState({
            id
        })

        const customerId = { id: id }
        const weddingId = { customer_id: id }

        axios.delete('/api/delete/customer', customerId)
            .then(res => {
                res.data
            })

        axios.delete('/api/delete/wedding', weddingId)
            .then(res => {
                res.data
            })
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
                            <Link to='/message'><div>
                                <p>Name: {val.first_name} {val.last_name}</p>
                            </div>
                                <div>
                                    <p>Message: {val.message.length >= 50 ? val.message.substring(0, 50) + '...' : val.message.length ? val.message : 'n/a'}</p>
                                </div></Link>
                            <button onClick={() => this.deleteMessage(val.id)}>remove</button>
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