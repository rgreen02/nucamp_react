import React, { Component } from 'react';
import './App.css';
import Directory from './components/DirectoryComponents';
import {CAMPSITES} from './shared/campsites';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {campsites: CAMPSITES};
    };

    render() {
        return ( 
            <Directory campsites={this.state.campsites}/>
        );
    }
}
export default App