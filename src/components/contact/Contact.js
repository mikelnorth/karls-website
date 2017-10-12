import React, { Component } from 'react';
import './Contact.css';
import Nav from '../nav/Nav.js'
import Login from '../login/Login.js'

export default class Contact extends Component {
    constructor(props) {
        super(props)

    }



    render() {
        return (
            <div className='Contact'>
                <Nav />

                <form>
                    <fieldset className='customer_info' autocomplete="on" >
                        <legend>Personal information:</legend>
                        First name:<br />
                        <input type="text" name="firstname" required /><br />
                        Last name:<br />
                        <input type="text" name="lastname" required /><br />
                        Email:<br />
                        <input type="text" name="Email" required /><br />
                        Phone:<br />
                        <input type="text" name="Phone" /><br />
                        Prefered contact method:<br />
                        <input type="radio" name="contact method" value="email" checked /> Phone
                        <input type="radio" name="contact method" value="email" /> Email<br />
                        Event Type:
                        <select name="cars">
                            <option value="wedding">wedding</option>
                            <option value="travel">Travel</option>
                            <option value="comercial">Comercial</option>
                            <option value="sports">Sports</option>
                        </select><br/>
                        Aditonal information:<br />
                        <textarea name="message" rows="10" cols="30">Additional Info</textarea>
                        <br />

                    </fieldset>
                    <input type="submit" value="Submit" />
                </form>


                <Login />
            </div >
        )
    }
}