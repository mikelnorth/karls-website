import React, { Component } from 'react';
import './Wedding.css';
import Nav from '../nav/Nav.js'
import { getLinks, updateVideo } from './../../ducks/reducer.js';
import { connect } from 'react-redux';
import Login from '../login/Login.js'
import ReactModal from 'react-modal';


class Wedding extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            embedded_link: '',
            category: '',
            id: null,
            showModal: false,
            hideModal: false,
            link: 'B5i-5kr68iw'
        }

        this.updateState = this.updateState.bind(this);
        this.editSelectedVideo = this.editSelectedVideo.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

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

    handleOpenModal(link) {
        this.setState({ 
            showModal: true, 
            hideModal: !this.state.hideModal,
            link
        });
    }

    handleCloseModal() {
        this.setState({ 
            showModal: false,
            hideModal: !this.state.hideModal
        });
    }

    render() {
        const adminView = this.props.user ? null : {
            'display': 'none'
        }

        const hideModal = this.state.hideModal ? {'display': 'none'} : null

        return (
            <div className='Wedding'>
                <Nav />
                <div className='top_wedding'>


                </div>
                <div className='videos'>
                    {this.props.video.map((val, i, arr) => {
                        return <div className='videos_content'>
                            <div className='title'>{val.title}</div>
                            <div className='modal_btn'>
                                <div className='catch' style={hideModal} onClick={() => this.handleOpenModal(val.embedded_link)} ></div>
                                <iframe title={val.id} src={`https://www.youtube.com/embed/${val.embedded_link}?color=white&showinfo=0&rel=0`} frameborder="0" allowfullscreen='true'></iframe>

                            </div>
                            <button style={adminView} onClick={() => this.updateState(val.title, val.embedded_link, val.category, val.id)}>Edit</button>
                        </div>
                    })}

                </div>
                <div className='input'>
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
                    <button style={adminView} onClick={() => this.editSelectedVideo()}>submit changes</button>
                </div>

                <div>
                    <ReactModal
                        isOpen={this.state.showModal}
                        contentLabel="onRequestClose Example"
                        onRequestClose={this.handleCloseModal}
                        className="Modal"
                        overlayClassName="Overlay">
                        <iframe src={`https://www.youtube.com/embed/${this.state.link}?color=white&showinfo=0&rel=0`} frameborder="0" allowfullscreen='true'></iframe>
                        <button onClick={this.handleCloseModal}>Close</button>
                    </ReactModal>
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

export default (connect(mapStatetoProps, { getLinks, updateVideo })(Wedding));