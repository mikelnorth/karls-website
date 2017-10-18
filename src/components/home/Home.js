import React, { Component } from 'react';
import './Home.css';
import Nav from '../nav/Nav.js'
import { getLinks, updateVideo } from './../../ducks/reducer.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Login from '../login/Login.js'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            embedded_link: '',
            category: '',
            id: null,
            isLoggedIn: false
        }

        this.updateState = this.updateState.bind(this);
        this.editSelectedVideo = this.editSelectedVideo.bind(this);

    }

    componentDidMount() {
        this.props.getLinks('home');
    }

    editSelectedVideo() {
        this.props.updateVideo(this.state.title, this.state.embedded_link, this.state.category, this.state.id)
    }

    updateState(title, embedded_link, category, id) {
        this.setState({
            title,
            embedded_link,
            category,
            id
        })
    }

    render() {

        const adminView = this.props.user ? null: {
            'display': 'none'
        }

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
                    {this.props.video.map((val, i, arr) => {
                        return <div>
                            {/* <iframe src={`https://player.vimeo.com/video/${val.embedded_link}?title=0&byline=0&portrait=0`} width="640" height="360" frameborder="0" webkitallowfullscreen='true' mozallowfullscreen='true' allowfullscreen='true'></iframe> */}
                            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${val.embedded_link}`} frameborder="0" allowfullscreen='true'></iframe>
                            <button style={adminView} onClick={() => this.updateState(val.title, val.embedded_link, val.category, val.id)}>Edit</button>
                        </div>
                    })}

                    <input style={adminView} type='text' value={this.state.title} onChange={(e) => {
                        this.setState({
                            title: e.target.value
                        })
                    }} />
                    <input style={adminView} type='text' value={this.state.embedded_link} onChange={(e) => {
                        this.setState({
                            embedded_link: e.target.value
                        })
                    }} />
                    {/* <input style={adminView} type='text' value={this.state.category} onChange={(e) => {
                        this.setState({
                            category: e.target.value
                        })
                    }} /> */}

                    <button style={adminView} onClick={() => this.editSelectedVideo()}>submit changes</button>

                </div>
                <Login />
            </div >
        )
    }
}

function mapStatetoProps(state) {
    return {
        video: state.video,
        user: state.user
    }
}

export default withRouter(connect(mapStatetoProps, { getLinks, updateVideo })(Home));