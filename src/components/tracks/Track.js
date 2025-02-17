import React from 'react';
import { Link } from 'react-router-dom';

 const Track = (props) => {
     const {track} = props;
    return (
        <div className="col-md-12">
            <div className="card1 mb-4 shadow-sm">
                <div className="card-body">
                    <h3>{track.track_name}</h3>
                    <p className="card-text">
                        <strong><i className="fas fa-headphones"></i> Artist</strong>: {track.artist_name}
                        <br/>
                        <strong><i className="fas fa-music"></i> Album</strong>: {track.album_name}
                    </p>
                    <Link to={`lyrics/track/${track.track_id}`} className="btn btn-dark btn-block">
                        <i className="fas fa-eye"></i> View Lyrics
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Track;
