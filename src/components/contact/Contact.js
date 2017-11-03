import React, { Component } from 'react';
import './Contact.css';
import Nav from '../nav/Nav.js';
import Login from '../login/Login.js';
import axios from 'axios';
import swal from 'sweetalert';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import AutoComplete from 'material-ui/AutoComplete';


export default class Contact extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            contact: '',
            type: 'Wedding',
            weddingLocation: '',
            weddingDate: '',
            receptionLocation: '',
            receptionDate: '',
            bridalLocation: '',
            bridalDate: '',
            culture: '',
            setting: '',
            audio: '',
            message: '',
            customerId: 0
        }

        this.submitCustomerInfo = this.submitCustomerInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    handleChange(prop, val) {
        // console.log(prop, val)
        if (prop === 'message' && val.length === 500) {
            swal({
                title: 'Message can only be 500 characters long',
                text: '',
                icon: "warning",
                button: "ok!",
            });
        }else if ((prop === 'firstName' || prop === 'lastName' || prop === 'email' || prop === 'phone' || prop ==='weddingLocation' || 
        prop === 'receptionLoation' || prop === 'bridalLocation') && val.length === 100) {
            swal({
                title: 'Message can only be 100 characters long',
                text: '',
                icon: "warning",
                button: "ok!",
            });
        }

        this.setState(
            {
                [prop]: val
            }
        )
    }

    selectChange = (event, index, value) => this.setState({ contact: value })

    handleWeddingDate = (event, date) => {
        this.setState({
            weddingDate: date,
        });
    };

    handleReceptionDate = (event, date) => {
        this.setState({
            receptionDate: date,
        });
    };

    handleBridalDate = (event, date) => {
        this.setState({
            bridalDate: date,
        });
    };

    handleUpdateInput = (culture) => {
        this.setState({
            culture
        });
        if (culture.length === 100) {
            swal({
                title: 'Message can only be 100 characters long',
                text: '',
                icon: "warning",
                button: "ok!",
            });
        }
    };

    submitCustomerInfo(e) {
        e.preventDefault()


        if (this.state.firstName && this.state.lastName && this.state.email) {
            if (this.state.email.includes('@')) {

                const { firstName, lastName, email, phone, contact, weddingLocation, weddingDate, receptionLocation,
                    receptionDate, bridalLocation, bridalDate,
                    culture, setting, audio, message, customerId } = this.state


                const customerData = {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone: phone,
                    contact_method: contact
                }

                const weddingData = {
                    wedding_location: weddingLocation,
                    wedding_date: weddingDate,
                    reception_location: receptionLocation,
                    reception_date: receptionDate,
                    bridal_location: bridalLocation,
                    bridal_date: bridalDate,
                    wedding_type: culture,
                    indoor: setting,
                    audio: audio,
                    message: message,
                    customer_id: customerId
                }


                axios.post('/api/customer/insert', customerData)
                    .then(res => {
                        weddingData.customer_id = res.data.id

                        axios.post('/api/wedding/insert', weddingData)
                            .then(res => {
                                swal({
                                    title: "Form Submitted",
                                    text: "Thank you for choosing Karl North Media, we will contact you.",
                                    icon: "success",
                                    button: "ok!",
                                });

                                this.setState({
                                    firstName: '',
                                    lastName: '',
                                    email: '',
                                    phone: '',
                                    contact: '',
                                    type: 'Wedding',
                                    weddingLocation: '',
                                    weddingDate: '',
                                    receptionLocation: '',
                                    receptionDate: '',
                                    bridalLocation: '',
                                    bridalDate: '',
                                    culture: '',
                                    setting: '',
                                    audio: '',
                                    message: '',
                                    customerId: 0

                                })
                            })
                    })
                    console.log(this.state)
                axios.post('/api/send_email', this.state)

            }
            else {
                swal({
                    title: "Must submit valid emal",
                    text: "example@example.com",
                    icon: "warning",
                    button: "ok!",
                });
            }
        }
        else {
            swal({
                title: "Please fill out required fields",
                text: "required fields are marked by *",
                icon: "warning",
                button: "ok!",
            });
        }
    }


    render() {
        const { firstName, lastName, email, phone, contact, weddingLocation, weddingDate, receptionLocation, receptionDate, bridalLocation, bridalDate,
            culture, message } = this.state

        const weddingTypes = ['American', 'Christian', 'Jewish', 'Indian', 'Other']
        
        return (
            <div className='Contact'>
                <MuiThemeProvider>
                    <Nav />
                    <img className='contactpic' src='http://www.simplyinspired.co.nz/extra/00--weddings054.jpg' alt='#' />

                    <div className='form'>
                        <form>
                            <div className='personal_info' autoComplete="on" >
                                <h2>Contact Form:</h2><br /><br />

                                <TextField onChange={(e) => this.handleChange('firstName', e.target.value)}
                                    maxLength='100' errorText="First name is required" floatingLabelText="First Name" name="firstname" value={firstName} /><br />

                                <TextField onChange={(e) => this.handleChange('lastName', e.target.value)}
                                    errorText="Last name is required" floatingLabelText="Last Name" name="lastname" maxLength='100' value={lastName} /><br />

                                <TextField onChange={(e) => this.handleChange('email', e.target.value)}
                                    errorText="email is required" floatingLabelText="Email" name="Email" maxLength='100' value={email} required /><br />

                                <TextField onChange={(e) => this.handleChange('phone', e.target.value)}
                                    floatingLabelText='Phone Number' type="text" name="Phone" maxLength='100' value={phone} /><br />

                                <SelectField onChange={this.selectChange} value={contact} hintText="Prefered Contact Method" >
                                    <MenuItem value={'Email'} primaryText="Email" />
                                    <MenuItem value={'Phone'} primaryText="Phone" />
                                </SelectField>
                            </div>
                            <br />

                            <div className='event_info'>
                                <h2>Event Information:</h2><br />
                                <TextField placeholder='Wedding' onChange={(e) => this.handleChange('type', e.target.value)}
                                    disabled={true} value='wedding' name='wedding' /><br /><br />

                                <div className='wedding_top'>
                                    <TextField onChange={(e) => this.handleChange('weddingLocation', e.target.value)}
                                        floatingLabelText='Wedding Location' maxLength='100' name="weddingLocation" value={weddingLocation} />

                                    <DatePicker
                                        name='weddingDate'
                                        floatingLabelText="Wedding Date"
                                        autoOk={true}
                                        value={weddingDate}
                                        onChange={this.handleWeddingDate}
                                    />
                                    {/* <input onChange={(e) => this.handleChange('weddingDate', e.target.value)}
                                        type="date" name="wedding location" value={weddingDate} /><br /> */}


                                    <TextField onChange={(e) => this.handleChange('receptionLocation', e.target.value)}
                                        floatingLabelText='Reception Location' maxLength='100' value={receptionLocation} name='receptionLocation' />

                                    <DatePicker
                                        name='receptionDate'
                                        floatingLabelText="Reception Date"
                                        autoOk={true}
                                        value={receptionDate}
                                        onChange={this.handleReceptionDate}
                                    />
                                    {/* <input onChange={(e) => this.handleChange('receptionDate', e.target.value)}
                                        type="date" name="reception location" value={receptionDate} /><br /> */}


                                    <TextField onChange={(e) => this.handleChange('bridalLocation', e.target.value)}
                                        floatingLabelText='Bridal Location' name='birdalLocation' maxLength='100' value={bridalLocation} />

                                    <DatePicker
                                        name='bridalDate'
                                        floatingLabelText="Bridal Date"
                                        autoOk={true}
                                        value={bridalDate}
                                        onChange={this.handleBridalDate}
                                    />
                                </div>
                                <AutoComplete value={culture}
                                    name='culture'
                                    floatingLabelText="Type of wedding"
                                    searchText={culture}
                                    onUpdateInput={this.handleUpdateInput}
                                    filter={AutoComplete.fuzzyFilter}
                                    dataSource={weddingTypes}
                                    maxSearchResults={5}
                                    maxLength='100'
                                /><br /><br />

                                Indoor <input onChange={(e) => this.handleChange('setting', e.target.value)}
                                    type="radio" name="indoor" value="Indoor" />
                                or Outdoor <input onChange={(e) => this.handleChange('setting', e.target.value)}
                                    type="radio" name="indoor" value="Outdoor" /><br />


                                Speech Audio
                    <input onChange={(e) => this.handleChange('audio', e.target.value)}
                                    type='radio' name='audio' value='Speech Audio' />or Strictly musical montage
                    <input onChange={(e) => this.handleChange('audio', e.target.value)}
                                    type='radio' name='audio' value='Strictly musical montage' /><br />


                                <textarea className='textarea' maxLength="500" onChange={(e) => this.handleChange('message', e.target.value)}
                                    name="message" value={message} cols='50' placeholder='additonal information...'></textarea>
                                <br />
                            </div>

                            <div className='submit' onClick={(e) => this.submitCustomerInfo(e)}>submit</div>

                        </form>
                    </div>


                    <Login />
                </MuiThemeProvider>
            </div >
        )
    }
}