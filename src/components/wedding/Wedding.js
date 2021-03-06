import React, { Component } from 'react';
import './Wedding.css';
import Nav from '../nav/Nav.js'
import { getLinks, updateVideo, getFeatured} from './../../ducks/reducer.js';
import { connect } from 'react-redux';
import Login from '../login/Login.js'
import ReactModal from 'react-modal';
import axios from 'axios'
import swal from 'sweetalert'


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
            link: ''
        }

        this.updateState = this.updateState.bind(this);
        this.editSelectedVideo = this.editSelectedVideo.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

    }

    editSelectedVideo() {
        this.props.updateVideo(this.state.title, this.state.embedded_link, this.state.category, this.state.id)
    }

    addNewVideo(){
        axios.post('api/new/video', this.state).then(res => this.props.getLinks('wedding'))
    }

    deleteVideo(){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this video",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.delete(`/api/delete/video/${this.state.id}/${this.state.category}`).then(res => this.props.getLinks('wedding'))
              swal("Video has been deleted", {
                icon: "success",
              });
            } else {
              swal("Your video is safe");
            }
          });
        
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
        window.scrollTo(0, 0);
        
        this.props.getLinks('wedding');
        this.props.getFeatured('featured');
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

        const hideModal = this.state.hideModal ? { 'display': 'none' } : null
        // console.log('this.props.video', this.props.video)
        // console.log('this.props.featured', this.props.featured)
        // console.log('state', this.state)
        return (
            <div className='Wedding'>
                <Nav />
                <div className='top_wedding'>
                    {this.props.featured.map((val, i, arr) => {
                        return <div className='top_content' key={i}>
                            <div className='featured_title'>{val.title}</div>
                            <iframe title={val.id} src={`https://www.youtube.com/embed/${val.embedded_link}?color=white&showinfo=0&rel=0`} frameBorder="0" allowFullScreen='true'></iframe>
                            <button style={adminView} onClick={() => this.updateState(val.title, val.embedded_link, val.category, val.id)}>Edit</button>
                        </div>
                    })}
                    <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                         Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero
                          sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
                         Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, </p>
                </div>

                <div className='videos'>
                    {this.props.video.map((val, i, arr) => {
                        return <div className='videos_content' key={i}>
                            <div className='title'>{val.title}</div>
                            <div className='modal_btn'>
                                <div className='catch' style={hideModal} onClick={() => this.handleOpenModal(val.embedded_link)} ></div>
                                <iframe title={val.id} src={`https://www.youtube.com/embed/${val.embedded_link}?color=white&showinfo=0&rel=0`} frameBorder="0" allowFullScreen='true'></iframe>

                            </div>
                            <button style={adminView} onClick={() => this.updateState(val.title, val.embedded_link, val.category, val.id)}>Edit</button>
                        </div>
                    })}

                </div>

                <div className='input'>
                <div className='edit'>
                    <input style={adminView} type='text' placeholder='Change title' value={this.state.title} onChange={(e) => {
                        this.setState({
                            title: e.target.value
                        })
                    }} />
                    <input style={adminView} type='text' placeholder='Edit link ID' value={this.state.embedded_link} onChange={(e) => {
                        this.setState({
                            embedded_link: e.target.value
                        })
                    }} />
                    <button style={adminView} onClick={() => this.editSelectedVideo()}>submit changes</button>
                    <button style={adminView} onClick={() => this.deleteVideo()}>Delete Video</button>

                </div>


                <div className='add'>
                    <button style={adminView} onClick={() => this.addNewVideo()}>Add New Video</button>
                </div>
                </div>

                <div>
                    <ReactModal
                        isOpen={this.state.showModal}
                        contentLabel="onRequestClose Example"
                        onRequestClose={this.handleCloseModal}
                        className="Modal"
                        overlayClassName="Overlay">
                        <iframe title={this.state.id} src={`https://www.youtube.com/embed/${this.state.link}?color=white&showinfo=0&rel=0`} frameBorder="0" allowFullScreen='true'></iframe>
                        {/* <button onClick={this.handleCloseModal}>Close</button> */}
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
        user: state.user,
        featured: state.featured
    }
}

export default (connect(mapStatetoProps, { getLinks, updateVideo, getFeatured })(Wedding));