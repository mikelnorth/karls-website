// import React, { Component } from 'react';
// import './Message.css';
// import Nav from '../nav/Nav.js'
// import Login from '../login/Login.js'
// import { connect } from 'react-redux';
// import { getCustomers } from './../../ducks/reducer.js';

// class Inbox extends Component {

//     componentDidMount() {
//         !this.props.user ? (this.props.history.push('/'), alert('ACCESS DENIED, Admin access only')) : null;

//         // this.props.getCustomers();
//     }

//     render() {
//         console.log(this.props.customers)
//         return (
//             <div className='Inbox'>
//                 {/* <Nav />

//                 {this.props.customers.data.length ? this.props.customers.data.map((val, i, arr) => {
//                     return <div>
//                             <p>Name: {val.first_name}</p>
//                         </div>
//                 }) : null}


//                 <Login /> */}
//             </div >
//         )
//     }
// }

// function mapStatetoProps(state) {
//     return {
//         user: state.user,
//         customers: state.customers
//     }
// }

// export default (connect(mapStatetoProps, { getCustomers })(Inbox));