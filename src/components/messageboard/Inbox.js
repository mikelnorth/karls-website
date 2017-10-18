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
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            contact_method: '',
            type: 'wedding',
            wedding_location: '',
            wedding_date: '',
            reception_location: '',
            reception_date: '',
            bridal_location: '',
            bridal_date: '',
            wedding_type: '',
            indoor: '',
            audio: '',
            message: ''
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

    moreInfo(id, first_name, last_name, email, phone, contact_method, wedding_location, wedding_date, reception_location,
        reception_date, bridal_location, bridal_date, wedding_type, indoor, audio, message) {
        this.setState({
            id,
            first_name,
            last_name,
            email,
            phone,
            contact_method,
            wedding_location,
            wedding_date,
            reception_location,
            reception_date,
            bridal_location,
            bridal_date,
            wedding_type,
            indoor,
            audio,
            message
        })
        console.log(this.state)
    }

    render() {
        // console.log('this should be the list of customers', this.props.customers.data)
        return (
            <div className='Messageboard'>
                <Nav />
                <h1>INBOX</h1>
                <div className='customer'>
                    <h4>Customer Information</h4>
                    {this.props.customers.data.length ? this.props.customers.data.map((val, i, arr) => {
                        return <div>
                            <div>
                                <p>Name: {val.first_name} {val.last_name}</p>
                            </div>
                            <div>
                                <p>Message: {val.message.length >= 50 ? val.message.substring(0, 50) + '...' : val.message.length ? val.message : 'n/a'}</p>
                            </div>
                            <button onClick={() => this.deleteMessage(val.id)}>remove</button>
                            <button onClick={() => this.moreInfo(val.id, val.first_name, val.last_name, val.email, val.phone,
                                val.contact_method, val.wedding_location, val.wedding_date, val.reception_location, val.reception_date,
                                val.bridal_location, val.bridal_date, val.wedding_type, val.indoor, val.audio, val.message)}>More Info</button>
                        </div>

                    }) : null}
                </div>

                <div className='information'>
                    <p>email: {this.state.email}</p>
                    <p>phone: {this.state.phone}</p>
                    <p>contact_method: {this.state.contact_method}</p>
                    <p>wedding_location: {this.state.wedding_location}</p>
                    <p>wedding_date: {this.state.wedding_date}</p>
                    <p>reception_location: {this.state.reception_location}</p>
                    <p>reception_date: {this.state.reception_date}</p>
                    <p>bridal_location: {this.state.bridal_location}</p>
                    <p>bridal_date: {this.state.bridal_date}</p>
                    <p>wedding_type: {this.state.wedding_type}</p>
                    <p>Indoor or Outdorr: {this.state.indoor}</p>
                    <p>audio: {this.state.audio}</p>
                    <p>message: {this.state.message}</p>

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