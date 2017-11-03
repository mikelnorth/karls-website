import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCustomers, updateCustomer } from './../../ducks/reducer.js';
import './Inbox.css'
import Nav from '../nav/Nav.js';
import Login from '../login/Login.js';
import swal from 'sweetalert';



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
        window.scrollTo(0, 0);
        

        !this.props.user ? (this.props.history.push('/'), swal({
            title: "ACCESS DENIED",
            text: "this page is for admin access only",
            icon: "error",
          })) : null;

        this.props.getCustomers();
    }

    archive(id) {
        this.setState({
            id
        })
        this.props.updateCustomer(true, this.state.id)
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
        // console.log(this.state)
    }

    render() {
        const details = this.state.details ? null : {
            'display': 'none'
        }

        // console.log('cust id', this.props.customers.data)

        return (
            <div className='messageboard'>
                <Nav />
                <div className='header'>
                    <h1>INBOX</h1>
                    <div className='inbox'>
                        <div className='customers'>
                            <h4>Customer</h4>
                            {this.props.customers.data.length ? this.props.customers.data.map((val, i, arr) => {
                                return <div className='customer'>
                                    <div>
                                        <p>Name: <span>{val.first_name} {val.last_name}</span></p>
                                    </div>
                                    <div>
                                        <p>Message: <span>{val.message.length >= 50 ? val.message.substring(0, 50) + '...' : val.message.length ? val.message : 'n/a'}</span></p>
                                    </div>
                                    <button onClick={() => this.archive(val.customer_id)}>Remove</button>
                                    <button onClick={() => this.moreInfo(val.id, val.first_name, val.last_name, val.email, val.phone,
                                        val.contact_method, val.wedding_location, val.wedding_date, val.reception_location, val.reception_date,
                                        val.bridal_location, val.bridal_date, val.wedding_type, val.indoor, val.audio, val.message)}>More Info</button>
                                </div>

                            }) : null}
                        </div>

                        <div className='information' style={details}>
                            <h4>Information</h4>
                            <p>Name: <span>{this.state.first_name} {this.state.last_name}</span></p>
                            <p>Email: <span>{this.state.email ? this.state.email : 'n/a'}</span></p>
                            <p>Phone: <span>{this.state.phone ? this.state.phone : 'n/a'}</span></p>
                            <p>Prefered contact method: <span>{this.state.contact_method ? this.state.contact_method : 'n/a'}</span></p>
                            {this.state.wedding_date ? <p>Wedding Location: <span>{this.state.wedding_location}</span></p> : null}
                            {this.state.wedding_date ? <p>Wedding Date: <span>{this.state.wedding_date}</span></p> : null}
                            {this.state.reception_location ? <p>Reception Location: <span>{this.state.reception_location}</span></p> : null}
                            {this.state.reception_date ? <p>Reception Date: <span>{this.state.reception_date}</span></p> : null}
                            {this.state.bridal_location ? <p>Bridal Location: <span>{this.state.bridal_location}</span></p> : null}
                            {this.state.bridal_date ? <p>Bridal Date: <span>{this.state.bridal_date}</span></p> : null}
                            {this.state.wedding_type ? <p>Wedding Type: <span>{this.state.wedding_type}</span></p> : null}
                            {this.state.indoor ? <p>Indoor or Outdorr: <span>{this.state.indoor}</span></p> : null}
                            {this.state.audio ? <p>Video Audio: <span>{this.state.audio}</span></p> : null}
                            {this.state.message ? <p>Message: <span>{this.state.message}</span></p> : null}
                        </div>
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