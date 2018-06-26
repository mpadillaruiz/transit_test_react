import React, { Component } from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import './App.css';
import Menu from './components/MenuComponent';
import Map from './components/Map'

class App extends Component {
  render() {
    return (
      <div>
          <Navbar dark color="secondary">
            <div className="container">
              <NavbarBrand href="/">Subway Stops NYC</NavbarBrand>
            </div>
          </Navbar>
          <Map/>
      </div>
    );
  }
}

export default App;
