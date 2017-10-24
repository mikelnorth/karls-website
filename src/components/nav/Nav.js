import React, { Component } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link'

class Nav extends Component {
    render() {
        const adminView = this.props.user ? null : {
            'display': 'none'
        }

        return (
            <div className='nav'>
                <Link className='link' to='/'><p>Home</p></Link>
                <Link className='link' to='/wedding'><p>Portfolio</p></Link>
                <Link className='link' to='/contact'><p>Contact</p></Link>
                <HashLink className='link' to='/#About'><p>About</p></HashLink>
                <Link className='link' style={adminView} to='/inbox'><p>Messages</p></Link>

                <div class="dropdown">
                    <div class="dropbtn">&#9776;</div>
                    <div class="dropdown-content">
                    <Link className='drop_link' to='/'><p>Home</p></Link>
                    <Link className='drop_link' to='/wedding'><p>Portfolio</p></Link>
                    <Link className='drop_link' to='/contact'><p>Contact</p></Link>
                    <HashLink className='drop_link' to='/#About'><p>About</p></HashLink>
                    <Link className='drop_link' style={adminView} to='/inbox'><p>Messages</p></Link>
                    </div>
                </div>

            </div >
        )
    }
}

function mapStatetoProps(state) {
    return {
        user: state.user
    }
}

export default (connect(mapStatetoProps, {})(Nav));