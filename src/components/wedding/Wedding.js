import React, { Component } from 'react';
import './Wedding.css';
import Nav from '../nav/Nav.js'
import { getLinks, updateVideo } from './../../ducks/reducer.js';
import { connect } from 'react-redux';
import Login from '../login/Login.js'


class Wedding extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            embedded_link: '',
            category: '',
            id: null
        }

        this.updateState = this.updateState.bind(this);
        this.editSelectedVideo = this.editSelectedVideo.bind(this);

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

    componentDidMount() {
        this.props.getLinks('wedding');
    }

    render() {
        const adminView = this.props.user ? null: {
            'display': 'none'
        }

        return (
            <div className='Wedding'>
                <Nav />
                <div className='top'>


                </div>

                {this.props.video.map((val, i, arr) => {
                    return <div>
                        <iframe src={`https://player.vimeo.com/video/${val.embedded_link}?title=0&byline=0&portrait=0`} width="640" height="360" frameborder="0" webkitallowfullscreen='true' mozallowfullscreen='true' allowfullscreen='true'></iframe>
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
                <input style={adminView} type='text' value={this.state.category} onChange={(e) => {
                    this.setState({
                        category: e.target.value
                    })
                }} />

                <button style={adminView} onClick={() => this.editSelectedVideo()}>submit changes</button>

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

export default (connect(mapStatetoProps, { getLinks, updateVideo })(Wedding));