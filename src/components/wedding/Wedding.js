import React, { Component } from 'react';
import './Wedding.css';
import Nav from '../nav/Nav.js'
import { getLinks } from './../../ducks/reducer.js';
import { connect } from 'react-redux';

class Wedding extends Component {
    constructor(props) {
        super(props)

        this.state= {
            title: '',
            embedded_link: '',
            category: ''
        }

        this.updateState = this.updateState.bind(this);

    }

    updateState(title, embedded_link, category){
        this.setState({
            title,
            embedded_link,
            category
        })
    }

    componentDidMount() {
        this.props.getLinks('wedding');
    }

    render() {
        console.log('this.props', this.state)
        return (
            <div className='Wedding'>
                <Nav />
                <div className='top'>


                </div>

                {this.props.video.map((val, i, arr) => {
                    return <div>
                        <iframe src={`https://player.vimeo.com/video/${val.embedded_link}?title=0&byline=0&portrait=0`} width="640" height="360" frameborder="0" webkitallowfullscreen='true' mozallowfullscreen='true' allowfullscreen='true'></iframe>
                        <button onClick={() => this.updateState(val.title,val.embedded_link,val.category) }>yup</button>
                    </div>
                })}
                <input></input>
            </div >
        )
    }
}

function mapStatetoProps(state) {
    return {
        video: state.video
    }
}

export default (connect(mapStatetoProps, { getLinks })(Wedding));