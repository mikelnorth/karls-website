import React, { Component } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

class Nav extends Component {
    render() {
        const adminView = this.props.user ? null: {
            'display': 'none'
        }

        return (
            <div className='nav'>
                <Link to='/'><p>Home</p></Link>

                <div className='dropdown'>
                    <Link to='/events'><p>Events</p></Link>
                    <div className='dropdown-content'>
                        <Link to='/wedding'><p>Wedding Portfolio</p></Link>
                        <Link to='/comercial'><p>comercial Portfolio</p></Link>
                    </div>
                </div>

                <Link to='/contact'><p>Contact</p></Link>
                <Link to='/about'><p>About</p></Link>
                <Link style={adminView} to='/messageboard'><p>Messages</p></Link>
            </div >
        )
    }
}

function mapStatetoProps(state) {
    return {
        user: state.user
    }
}

export default (connect(mapStatetoProps, {  })(Nav));