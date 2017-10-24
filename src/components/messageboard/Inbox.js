import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getCustomers, updateCustomer } from './../../ducks/reducer.js';
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
            message: '',
            details: false
        }

        this.archive = this.archive.bind(this);
    }

    componentDidMount() {
        !this.props.user ? (this.props.history.push('/'), alert('ACCESS DENIED, Admin access only')) : null;

        this.props.getCustomers();
    }

    archive(id) {
        this.setState({
            id
        })

        console.log('state',this.state)
         this.props.updateCustomer(true, this.state.id)
         console.log('customers',this.props.customers.data)
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
            message,
            details: true
        })
        console.log(this.state)
    }

    render() {
        const details = this.state.details ? null : {
            // 'display': 'none'
        }
        
        return (
            <div className='Messageboard'>
                <Nav />
                <div className='inbox'>
                <h1>INBOX</h1>
                <div className='customers'>
                    <h4>Customer Information</h4>
                    {this.props.customers.data.length ? this.props.customers.data.map((val, i, arr) => {
                        return <div className='customer'>
                            <div>
                                <p>Name: {val.first_name} {val.last_name}</p>
                            </div>
                            <div>
                                <p>Message: {val.message.length >= 50 ? val.message.substring(0, 50) + '...' : val.message.length ? val.message : 'n/a'}</p>
                            </div>
                            <button onClick={() => this.archive(val.id)}>remove</button>
                            <button onClick={() => this.moreInfo(val.id, val.first_name, val.last_name, val.email, val.phone,
                                val.contact_method, val.wedding_location, val.wedding_date, val.reception_location, val.reception_date,
                                val.bridal_location, val.bridal_date, val.wedding_type, val.indoor, val.audio, val.message)}>More Info</button>
                        </div>

                    }) : null}
                </div>

                <div className='information' style={details}>
                    <p>Email: {this.state.email? this.state.email : 'n/a'}</p>
                    <p>Phone: {this.state.phone? this.state.phone : 'n/a'}</p>
                    <p>Prefered contact method: {this.state.contact_method ? this.state.contact_method : 'n/a'}</p>
                    <p>Wedding Location: {this.state.wedding_location ? this.state.wedding_location : 'n/a'}</p>
                    <p>Wedding Date: {this.state.wedding_date? this.state.wedding_date : 'n/a'}</p>
                    <p>Reception Location: {this.state.reception_location? this.state.reception_location : 'n/a'}</p>
                    <p>Reception Date: {this.state.reception_date? this.state.reception_date : 'n/a'}</p>
                    <p>Bridal Location: {this.state.bridal_location? this.state.bridal_location : 'n/a'}</p>
                    <p>Bridal Date: {this.state.bridal_date? this.state.bridal_date : 'n/a'}</p>
                    <p>Wedding Type: {this.state.wedding_type? this.state.wedding_type : 'n/a'}</p>
                    <p>Indoor or Outdorr: {this.state.indoor? this.state.indoor : 'n/a'}</p>
                    <p>Video Audio: {this.state.audio? this.state.audio : 'n/a'}</p>
                    <p>Message: {this.state.message? this.state.message : 'n/a'}</p>

                </div>


                    </div>
                <Login />
            </div >
        )
    }
}

function mapStatetoProps(state) {
    return {
        user: state.user,
        customers: state.customers,
        customer: state.customer
    }
}

export default (connect(mapStatetoProps, { getCustomers, updateCustomer })(Messageboard));