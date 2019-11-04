import React, { Component } from 'react'
import axios from 'axios'
import {Consumer} from '../../context'

export class Navbar extends Component {
    state={
        trackTitle: ''
    };

    findTrack = (dispatch, e) => {
        e.preventDefault()

        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=a6b2f0e1a94ca0d01545accc81b08b64`)
        .then(res => {
            //console.log(res.data);
            dispatch({
                type: 'SEARCH_TRACKS',
                payload: res.data.message.body.track_list
            });

            this.setState({trackTitle: ''})
        })
        .catch(err => console.log(err));
    }

    onChange= (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            
                <Consumer>
                {value => {
                    const{ dispatch } = value;
                    return (
                        <React.Fragment>
                            <nav className="navbar navbar-dark bg-dark mb-5">
                                <p className="navbar-brand text-white mb-0 text-gradient">MusixmatchAPI</p>
                                <form className="form-inline" onSubmit={this.findTrack.bind(this, dispatch)}>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className="form-control noBR" 
                                        placeholder="Song title..." 
                                        name="trackTitle" 
                                        value={this.state.trackTitle}
                                        onChange={this.onChange}/>
                                        <button className="btn btn-2 noBR text-white" type="submit">Search</button>
                                </div>
                            </form>
                            </nav>

                            
                        </React.Fragment>
                            
                        
                    )
                }}
            </Consumer>
            
        )
    }
}

export default Navbar
