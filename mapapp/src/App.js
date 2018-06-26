import React, { Component } from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import './App.css';
import Map from './components/Map'



const style = {
  height: '10%',
};

const stylediv = {
  height: '100%',
};

const Footer = ({title}) => (<footer style={style}>{title}</footer>);

class App extends Component {


  render() {
    const {title, footer} = this.props;
    return (
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
