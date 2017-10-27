import React, { Component } from 'react';
import './Home.css';
import Nav from '../nav/Nav.js'
import { getLinks, updateVideo } from './../../ducks/reducer.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Login from '../login/Login.js';
import intro from '../../assets/intro.mp4';
import karl from '../../assets/karl.jpg';
import down from '../../assets/down.png';
import { HashLink } from 'react-router-hash-link';



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

        const adminView = this.props.user ? null : {
            'display': 'none'
        }

        return (
            <div className='home'>
                <Nav />
                <div className='top'>
                    {/* <img className='homepic' src='http://warrenweddings.com/wp-content/uploads/2017/03/wedding-hire.jpg' /> */}
                    <video className='loop' autoplay='autoplay' loop='loop' muted='true' controls='false' webkit-playsinline fullscreen='false'>
                        <source src={intro} type="video/mp4" />
                        <source src="movie.ogg" type="video/ogg" />
                        Your browser does not support the video tag.
                    </video>
                    <HashLink className='hashLink' to='/#middle'><img className='bounce' src={down} alt='#'/></HashLink>
                    <span className='welcome_span'>some things are worth remembering</span>
                    <Link className='button' to='/wedding'><span>Wedding Portfolio</span></Link>
                </div>


                <div id='middle' className='middle'>
                    <span className='middle_message'><p>KARL NORTH MEDIA</p><br/>
                        Karl North Media is not about making a film, it's about reliving and feeling every moment.
                        catching the memories that matter most and seeing them play back to you.
                        It's about feeling those butterflies all over again as begin a new journey.
                        It's about trying to remember the good ol'days while we are still in them.
                    </span>
                    {this.props.video.map((val, i, arr) => {
                        return <div className='home_vid'>
                            <iframe title={val.id} src={`https://www.youtube.com/embed/${val.embedded_link}?color=white&showinfo=0`} frameborder="0" allowfullscreen='true'></iframe>
                            <button style={adminView} onClick={() => this.updateState(val.title, val.embedded_link, val.category, val.id)}>Edit</button>
                        </div>
                    })}
                </div>


                <div className='admin'>
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

                <div className='dance'></div>


                <div id='About' className='About'>
                    <div className='why_us'><span className='why'>WHY</span> <span className='us'>US?</span></div>
                    
                    {<img className='karl' src={karl} alt='#'/>}

                    <div className='about_content'>
                        <span className='about_message'>this is information about karl north and his awesome videos. this is going to make you want
                        to choose him for all of your fun events that you would like to remember. blah blah blah some more awesome stuff
                        about this rad dude!!!</span>
                        <Link to='/contact' className='contact_btn'><span>Contact</span></Link>
                    </div>
                    
                </div>
                <div>
                    {/* <img className='karl_night' src={karl_night} /> */}
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