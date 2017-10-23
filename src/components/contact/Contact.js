import React, { Component } from 'react';
import './Contact.css';
import Nav from '../nav/Nav.js';
import Login from '../login/Login.js';
import axios from 'axios';
import down from '../../assets/down.png';
import { HashLink } from 'react-router-hash-link';



export default class Contact extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            contact: '',
            type: 'wedding',
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

    }

    handleChange(prop, val) {
        this.setState(
            {
                [prop]: val
            }
        )
    }

    submitCustomerInfo(e) {
        e.preventDefault()
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
                    alert('form submitted')

                    this.setState({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        contact: '',
                        type: 'wedding',
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


    }

    render() {

        const { firstName, lastName, email, phone, contact, type, weddingLocation, weddingDate, receptionLocation, receptionDate, bridalLocation, bridalDate,
            culture, setting, audio, message, customerId } = this.state

        return (
            <div id='contact' className='Contact'>
                <Nav />

                <div className='contact_top'>
                <img className='contactpic' src='http://www.simplyinspired.co.nz/extra/00--weddings054.jpg' />
                {/* <img className='bounce_contact' src={down}/> */}
                </div>

                <div className='form'>
                    <form>
                        <fieldset className='customer_info' autocomplete="on" >
                            <span>Personal information REQUIRED:</span><br/><br/>
                            First name:<br />
                            <input onChange={(e) => this.handleChange('firstName', e.target.value)}
                                type="text" name="firstname" value={firstName} required /><br />

                            Last name:<br />
                            <input onChange={(e) => this.handleChange('lastName', e.target.value)}
                                type="text" name="lastname" value={lastName} required /><br />

                            Email:<br />
                            <input onChange={(e) => this.handleChange('email', e.target.value)}
                                type="text" name="Email" value={email} required /><br />

                            Phone:<br />
                            <input onChange={(e) => this.handleChange('phone', e.target.value)}
                                type="text" name="Phone" value={phone} /><br />

                            Prefered contact method:<br />
                            Phone<input onChange={(e) => this.handleChange('contact', e.target.value)}
                                type="radio" name="contact method" value="Phone" value={contact} />
                            or Email<input onChange={(e) => this.handleChange('contact', e.target.value)}
                                type="radio" name="contact method" value={contact} /> <br />

                            {/* <select name="cars">
                            <option value="wedding">wedding</option>
                            <option value="travel">Travel</option>
                            <option value="comercial">Comercial</option>
                            <option value="sports">Sports</option>
                        </select><br/> */}


                        </fieldset>
                        <br/>

                        <fieldset className='wedding_info'>
                            <span>Event Information:</span><br/>
                            <input onChange={(e) => this.handleChange('type', e.target.value)}
                                type="text" name="wedding" value='wedding' required /><br /><br/>

                            Wedding Location:
                    <input onChange={(e) => this.handleChange('weddingLocation', e.target.value)}
                                type="text" name="wedding location" value={weddingLocation} required />

                            Wedding date:
                    <input onChange={(e) => this.handleChange('weddingDate', e.target.value)}
                                type="date" name="wedding location" value={weddingDate} required /><br />

                            Reception Location:
                    <input onChange={(e) => this.handleChange('receptionLocation', e.target.value)}
                                type="text" name="reception location" value={receptionLocation} />

                            Reception date:
                    <input onChange={(e) => this.handleChange('receptionDate', e.target.value)}
                                type="date" name="reception location" value={receptionDate} /><br />

                            Bridal Location:
                    <input onChange={(e) => this.handleChange('bridalLocation', e.target.value)}
                                type="text" name="bridal location" value={bridalLocation} /><br/>

                            Bridal date:
                    <input onChange={(e) => this.handleChange('bridalDate', e.target.value)}
                                type="date" name="bridal location" value={bridalDate} /><br />

                            Type of Wedding:<br/>
                    <input onChange={(e) => this.handleChange('culture', e.target.value)}
                                list="wedding type" name="culture" value={culture} />
                            <datalist id="wedding type">
                                <option value="American" />
                                <option value="Indian" />
                                <option value="Jewish" />
                                <option value="Christian" />
                                <option value="Other" />
                            </datalist><br />

                            Indoor <input onChange={(e) => this.handleChange('setting', e.target.value)}
                                type="radio" name="indoor" value="Indoor" />
                            or Outdoor <input onChange={(e) => this.handleChange('setting', e.target.value)}
                                type="radio" name="indoor" value="Outdoor" /><br />

                            Speech Audio
                    <input onChange={(e) => this.handleChange('audio', e.target.value)}
                                type='radio' name='audio' value='Speech Audio' />or Strictly musical montage
                    <input onChange={(e) => this.handleChange('audio', e.target.value)}
                                type='radio' name='audio' value='Strictly musical montage' /><br />


                            Aditonal information:<br />
                            <textarea onChange={(e) => this.handleChange('message', e.target.value)}
                                name="message" rows="10" cols="40" value={message} placeholder='additonal information...'></textarea>
                            <br />
                        </fieldset>

                        <button onClick={(e) => this.submitCustomerInfo(e)}> submit</button>
                        <input type='reset' value='reset' />
                    </form>
                </div>


                <Login />
            </div >
        )
    }
}