import React, { Component } from 'react';
import { Consumer } from '../../context';
import Spinner from '../layout/Spinner';
import Track from './Track';

class Tracks extends Component {
    render() {
        return (
           <Consumer>
               {value => {
                   const { track_list, heading } = value;
                   if(track_list === undefined || track_list.length === 0){
                        return <Spinner/>
                   }else{
                        return(
                            <React.Fragment>
                                <h2 className="text-center text-gradient mb-4">{heading}</h2>
                                <div className="row">
                                    {track_list.map(item =>(
                                        <Track key={item.track.track_id} track={item.track}/>
                                    ))}
                                </div>
                            </React.Fragment>
                            
                        )
                   }
               }}
           </Consumer>
        )
    }
}

export default Tracks;
