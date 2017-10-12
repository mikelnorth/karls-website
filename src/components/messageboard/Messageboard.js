import React, { Component } from 'react';
import './Messageboard.css';
import Nav from '../nav/Nav.js'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Login from '../login/Login.js'

class Messageboard extends Component {
    constructor(props) {
        super(props)

    }

    // componentDidMount(){
    //     <Route  path='/messageboard' render={() => (
    //         this.props.user ? (
    //             <Redirect to='/'/>
    //         ) :
    //         (
    //             <Redirect to='/'/>
    //         )
    //     )}/>
    // }

    // requireAuth(nextState, replace) {
    //     if (!this.props.user.loggedIn()) {
    //         replace({
    //             pathname: '/',
    //             state: { nextPathname: nextState.location.pathname }
    //         })
    //     }
    // }

    // redirect(){
    //     !this.props.user ? <Route component={Home} exact path='/':  />
    // }

    
    componentDidMount(){
        !this.props.user ? this.props.history.push('/') : null;
    }


    render() {
        console.log('history', this.props.history.push)
        return (
            <div className='Messageboard'>
                <Nav />
                <Login />
            </div >
        )
    }
}

function mapStatetoProps(state) {
    return {
        user: state.user
    }
}

export default (connect(mapStatetoProps, {})(Messageboard));