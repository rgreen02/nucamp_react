import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
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
            /*<div className = "App">
                <Navbar dark color = "primary" >
                    <div className = "container" >
                        <NavbarBrand href= "/" > NuCamp </NavbarBrand>     
                    </div> 
                    <Directory />
                </Navbar>   
            </div>*/
        );
    }
}
export default App