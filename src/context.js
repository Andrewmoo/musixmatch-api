import React, { Component } from 'react';
import axios from 'axios';

//Create Context
//Provider wraps around every other thing so that whatever state we put in the provider will be accessible through all the 
//other components as long as a consumer is used
const Context = React.createContext();

const reducer = (state, action) => {
    //Evaluates action type
    switch(action.type){
        //If the case is SEARCH_TRACKS returns the state and changes the track list to whatever was searched
        case 'SEARCH_TRACKS':
            return{
                ...state,
                track_list: action.payload,
                heading: 'Search Results'
            };
            default:
                return state;
    }
}

export class Provider extends Component {
    state = {
        track_list: [],
        //Heading is in the state because it changes once we search for a track
        heading: 'In The Charts',
        //Set state to a reducer function
        dispatch: action => this.setState(state => reducer(state, action))
    };

    //Lifecycle method that runs when the component mounts
    componentDidMount(){
        //API request
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=uk&f_has_lyrics=1&apikey=a6b2f0e1a94ca0d01545accc81b08b64`)
        .then(res => {
            //console.log(res.data);
            this.setState({track_list: res.data.message.body.track_list});
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            //Makes the entire state accesible through every other component
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}


//Consumer exported, this is what is imported into the components
export const Consumer = Context.Consumer;
