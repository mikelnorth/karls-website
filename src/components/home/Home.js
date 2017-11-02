import React, { Component } from 'react';
import './Home.css';
import Nav from '../nav/Nav.js'
import { getLinks, updateVideo } from './../../ducks/reducer.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Login from '../login/Login.js';
import intro from '../../assets/intro.mp4';
import intro2 from '../../assets/intro2.webm';
import karl from '../../assets/karl.jpg';
import down from '../../assets/down.png';
import { HashLink } from 'react-router-hash-link';
import MediaQuery from 'react-responsive';




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

        // var video = document.querySelector('video');
        // enableInlineVideo(video);

        // setTimeout(function () { video.play(); }, 1000); 


        return (
            <div className='home'>
                <Nav />
                <div className='top'>
                    {/* <img className='homepic' src='http://warrenweddings.com/wp-content/uploads/2017/03/wedding-hire.jpg' /> */}
                    <MediaQuery query="(min-width: 750px)">
                        <video className='loop' autoplay='autoplay' loop='loop' muted='true' playsinline fullscreen='false' poster="http://example.com/path/poster.jpg">>
                            {<source src={intro} type="video/mp4" />}
                            {<source src={intro2} type="video/webm" />}
                            Your browser does not support the video tag.
                     </video>
                    </MediaQuery>
                    <MediaQuery query="(max-width: 750px)">
                        <div className='mobile_home'></div>
                    </MediaQuery>

                    <HashLink className='hashLink' to='/#middle'><img className='bounce' src={down} alt='#' /></HashLink>
                    <span className='welcome_span'>some things are worth remembering</span>
                    <Link className='button' to='/wedding'><span>Wedding Portfolio</span></Link>
                </div>


                <div id='middle' className='middle'>
                    <span className='middle_message'><p>KARL NORTH MEDIA</p><br />
                        Karl North Media is not just about making films, it's about being able to relive and feel every moment.
                        catching the memories that matter most and experiencing them all over again.
                        It's about feeling those butterflies when he looks at you!
                        laughing as you see cake smeared all over your face.
                        It's about remembering the good ol'days while we are still in them.
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

                    {<img className='karl' src={karl} alt='#' />}

                    <div className='about_content'>
                        <span className='about_message'>
                            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                         Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero
                          sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
                         Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed,
                         commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci,
                         sagittis tempus lacus enim ac dui
                        </span>
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