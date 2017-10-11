import React, { Component } from 'react';
import './Home.css';
import Nav from '../nav/Nav.js'
import { getLinks } from './../../ducks/reducer.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';


class Home extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this.props.getLinks('home');
    }

    render() {
        console.log('state', this.props.video[0].embedded_link)
        return (
            <div className='home'>
                <Nav />
                <div className='top'>
                    <img className='homepic' src='http://warrenweddings.com/wp-content/uploads/2017/03/wedding-hire.jpg' />
                    <span className='welcome_span'>this is a fantastic welcome statement</span>
                    <Link className='wedding' to='/wedding'><button>Wedding Portfolio</button></Link>
                </div>
                <div className='middle'>
                    <span className='bait'>Bait em, hook em, make em wanna come back for more</span>
                    <iframe src={`https://player.vimeo.com/video/${this.props.video[0].embedded_link}?title=0&byline=0&portrait=0`} width="640" height="360" frameborder="0" webkitallowfullscreen='true' mozallowfullscreen='true' allowfullscreen='true'></iframe>
                </div>
                <a href={process.env.REACT_APP_LOGIN}><button className="button">Login</button></a>
            </div >
        )
    }
}

function mapStatetoProps(state) {
    return {
        video: state.video
    }
}

export default withRouter(connect(mapStatetoProps, { getLinks })(Home));