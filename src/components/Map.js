import React from 'react';
import L from 'leaflet';
import markerClusterGroup from 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';

const style = {
  width: '100%',
  height: '500px',
};

class Map extends React.Component {
  componentDidMount() {

    var greenIcon = L.icon({
       iconUrl: 'assets/images/icon.png',


       iconSize:     [20, 20], // size of the icon
       //shadowSize:   [50, 64], // size of the shadow
       //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],  // the same for the shadow
       popupAnchor:  [-5, -15] // point from which the popup should open relative to the iconAnchor
   });
    // create map
    this.map = L.map('map', {
      center: [40.7128, -74.0060],
      zoom: 9,

    });

    // add marker
    //this.marker = L.marker([49.8419, 24.0315],{icon: greenIcon}).addTo(this.map);
    //console.log(this.marker)
    /*L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
        opacity: 1  }).addTo(this.map)*/

        L.tileLayer('https://api.mapbox.com/styles/v1/mpadillaruiz/cjiv6fgvn4rs72so4mzo3vh74/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXBhZGlsbGFydWl6IiwiYSI6IjVNdEo5ZHcifQ.hOJnD_xBxWNwY0YoK978wg', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
}).addTo(this.map);

        L.tileLayer("http://{s}.tiles.openrailwaymap.org/signals/{z}/{x}/{y}.png", {
            opacity: 0.8, minZoom:14 }).addTo(this.map)


          var markersCluster = L.markerClusterGroup({
      	spiderfyOnMaxZoom: false,
        disableClusteringAtZoom:15,
      polygonOptions:{ weight: 3, color: '#222', opacity: 0.5 }
      });

      this.map.addLayer(markersCluster);
        fetch('http://localhost:3001/stops')
        .then(results =>{
          return results.json();
        }).then(data => {

          for ( var i=0; i < data.length; ++i )
          {
            if(data[i].parent_station===""){

             var m= L.marker( [data[i].stop_lat, data[i].stop_lon],{icon: greenIcon}).bindTooltip(data[i].stop_name,{direction:'top',permanent:false})
                .bindPopup( '<p>' + data[i].stop_id + '</p>' );

              markersCluster.addLayer(m);
            }
            this.map.addLayer(markersCluster);
          }
        })
  }

  render() {
    return <div id="map" style={style}></div>
  }
}

export default Map;

/*

class Map extends React.Component {

  componentDidMount() {
    // create map
    this.map = L.map('map', {
      center: [49.8419, 24.0315],
      zoom:5 ,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });

    // add marker
   this.marker = L.marker([40.7128, -74.0060]).addTo(this.map);

  //  L.marker( ).bindPopup( '<p>Marta mola</p>' ).addTo(this.map);

    fetch('http://localhost:3001/stops')
    .then(results =>{
      return results.json();
    }).then(data => {

      for ( var i=0; i < data.length; ++i )
      {
        if(data[i].parent_station===""){

         L.marker( [data[i].stop_lat, data[i].stop_lon]).bindTooltip(data[i].stop_name,{direction:'top',permanent:false})
            .bindPopup( '<p>' + data[i].stop_id + '</p>' ).addTo(this.map);
        }
      }



      //this.setState({markers: data});
      //console.log("state",this.state.markers);
    })

  }

  render() {
    return (
      <div>
      <div id="map" style={style}></div>
      </div>
    )
  }
}

export default Map;*/
