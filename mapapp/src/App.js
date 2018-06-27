import React, { Component } from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import './css/App.css';
import Map from './components/Map'

//Style for nav & footer
const style = {
  height: '10%',
};

//Div style
const stylediv = {
  height: '100%',
};

//Variable for footer
const Footer = ({title}) => (<footer style={style}>{title}</footer>);

class App extends Component {
  render() {
    //Retrieving props
    const {title, footer} = this.props;
    return (
      //Creating application elements
      <div style={stylediv}>
          <Navbar style={style} dark color="secondary">
            <div className="container mx-auto">
              <NavbarBrand href="http://www.mta.info" target="_blank">{title}</NavbarBrand>
            </div>
          </Navbar>
          <Map/>
          <Footer title={footer}/>
      </div>
    );
  }
}

export default App;
