import React from 'react';
import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';

//Map style
const style = {
  width: '100%',
  height: '80%',
  paddingLeft:'20px',
  paddingRight:'20px',
};

class Map extends React.Component {

  //Invoked after component is mounted
  componentDidMount() {
    //Create Leaflet Map
    this.map = L.map('map', {
      //Centered in NYC
      center: [40.7128, -74.0060],
      zoom: 9,
    });

    //Add basemaps
    //Customized Mapbox map to delete train stations
    L.tileLayer('https://api.mapbox.com/styles/v1/mpadillaruiz/cjiv6fgvn4rs72so4mzo3vh74/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXBhZGlsbGFydWl6IiwiYSI6IjVNdEo5ZHcifQ.hOJnD_xBxWNwY0YoK978wg', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
    }).addTo(this.map);

    //OpenRailWayMap to include subway lines as base map
    L.tileLayer("http://{s}.tiles.openrailwaymap.org/signals/{z}/{x}/{y}.png", {
        opacity: 0.9,
        minZoom:13
    }).addTo(this.map)

    //Marker group to store markers and render the cluster
    this.markersCluster = L.markerClusterGroup({
      	spiderfyOnMaxZoom: false,
        disableClusteringAtZoom:15,
        polygonOptions:{ weight: 3, color: '#222', opacity: 0.5 }
    });

    this.map.addLayer(this.markersCluster);

    //Legend component to add to the map
    this.legend = L.control({position: 'bottomright'});

    this.legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
        //Adding subway lines
        div.innerHTML +='<i style="background:#000000"></i><span>Subway Line</span><br>';
        //Adding subway stops
        div.innerHTML +='<img src="assets/images/icon.png" alt="subway" height="20" width="20"><span>Subway Stop</span><br>';
        return div;
    };

    this.legend.addTo(this.map);

    //Icon representing a subway stop
    var subwayStop = L.icon({
        iconUrl: 'assets/images/icon.png',
        iconSize:     [20, 20], // size of the icon
        popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
    });

    //Getting the stops data from the node API
    fetch('/stops')
        .then(results =>{
            return results.json();
        }).then(data => {
          for ( var i=0; i < data.length; ++i ){
              //As realized analyzing the data, each station is triplicated (N/S)
              //Only parent stops will be added (stops without a parent_station or location type 1)
              if(data[i].location_type===1){
                  //Construct a marker with the stops properties
                  var m= L.marker( [data[i].stop_lat, data[i].stop_lon],{icon: subwayStop}).bindTooltip(data[i].stop_name,{direction:'left',offset:L.point(-10,0),permanent:false})
                  .bindPopup( '<span>ID: ' + data[i].stop_id + '<br>Name: ' + data[i].stop_name + '<br>Coordinates: ' + data[i].stop_lat + ', '+data[i].stop_lon+'</span>' );
                  //Add individual marker to the cluster group
                  this.markersCluster.addLayer(m);
            }
          }
        })
  }

  render() {
    //Render the map
    return <div id="map" style={style}></div>
  }
}

export default Map;
