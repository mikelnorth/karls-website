import React, { Component } from 'react';
import './App.css';
import router from './router.js';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { isAdmin } from './ducks/reducer.js';

class App extends Component {

  componentDidMount(){
    this.props.isAdmin()
  }

  render() {
    console.log('IS ADMIN',this.props.user)
    return (
      <div className="App">
        {router}
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
      user: state.user
  }
}

export default withRouter(connect(mapStatetoProps, {isAdmin})(App));
