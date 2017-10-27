import React, { Component } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link'

class Nav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            slideNav: false
        }

        this.toggleNav = this.toggleNav.bind(this)
    }

    toggleNav(){
        this.setState({
            slideNav: !this.state.slideNav
          })
    }

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

                <div className="slide" onClick={ this.toggleNav }>
                    {this.state.slideNav ? null : <div className="slidebtn" onClick={ this.toggleNav }>&#9776;</div>}
                    <div className={this.state.slideNav ? 'slide_content' : 'slide_content close'}>
                    <Link className='slide_link' to='/'><p>Home</p></Link>
                    <Link className='slide_link' to='/wedding'><p>Portfolio</p></Link>
                    <Link className='slide_link' to='/contact'><p>Contact</p></Link>
                    <HashLink className='slide_link' to='/#About'><p>About</p></HashLink>
                    <Link className='slide_link' style={adminView} to='/inbox'><p>Messages</p></Link>
                    <div className='closebtn'>x</div>
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