import React, {Component} from 'react';


class Background extends React.Component{
  constructor(){
    super();
    this.state={
      markers:[]
    };
  }

  componentDidMount(){
    fetch('http://localhost:3001/stops')
    .then(results =>{
      return results.json();
    }).then(data => {
      let pictures = 0;
      console.log(data);
      this.setState({markers: pictures});
      console.log("state",this.state.markers);
    })
  }

  render() {
    return <div id="map2"></div>
  }
}

export default Background;
