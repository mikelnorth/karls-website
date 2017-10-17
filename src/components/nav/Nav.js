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
                <Link className='link' to='/'><p>Home</p></Link>

                <div className='dropdown'>
                    <Link className='link' to='/wedding'><p>Portfolio</p></Link>
                    {/* <div className='dropdown-content'>
                        <Link className='link' to='/wedding'><p>Wedding Portfolio</p></Link>
                        <Link className='link' to='/comercial'><p>comercial Portfolio</p></Link>
                    </div> */}
                </div>

                <Link className='link' to='/contact'><p>Contact</p></Link>
                <Link className='link' to='/about'><p>About</p></Link>
                <Link className='link' style={adminView} to='/inbox'><p>Messages</p></Link>
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