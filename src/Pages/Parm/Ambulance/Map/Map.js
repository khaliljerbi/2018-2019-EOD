/* eslint-disable no-restricted-syntax */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */

/* ********************** TO FINISH WHEN THEY RELEASE MAPBOX V4 *********************** */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import Card from '../../../../Components/Card/Card';
import { getAmbulances } from '../../../../Actions/Admin/Actions';
import TrafficLayers from './TrafficLayers';
// import { addData } from './MapData';


const defaultLocation = [10.6346, 35.8245];

class Map extends Component {
  state = {
    lat: null,
    lng: null,
    destination: {
      lat: '36.8510',
      lng: '10.4912',
    },
  }

  componentDidMount() {
    // get all amublances
    this.props.getAmbulances();
    mapboxgl.accessToken = process.env.REACT_APP_MAP_TOKEN;
    // creating the map
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [...defaultLocation],
      zoom: 8,
    });
    this.map.addControl(new MapboxLanguage({ defaultLanguage: 'fr' }));
    this.map.on('load', () => {
      //  adding traffic layer to show traffic
      this.map.addSource('trafficSource', {
        type: 'vector',
        url: 'mapbox://mapbox.mapbox-traffic-v1',
      });
      const firstPOILabel = this.map.getStyle().layers.filter(obj => obj['source-layer'] === 'poi_label');

      for (let i = 0; i < TrafficLayers.length; i += 1) {
        this.map.addLayer(TrafficLayers[i], firstPOILabel[0].id);
      }
    });
    // direction controller
    this.direction = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      alternatives: true,
      interactive: false,
      controls: {
        inputs: false,
        instructions: false,
      },
    });
    // ADD navigation controller (zoom in , zoom out, map rotation)
    this.map.addControl(new mapboxgl.NavigationControl());
    // direction.
    // direction.on('route', (data) => {
    //   this.setState({ distance: format.metric(data.route[0].distance), time: format.duration(data.route[0].duration) });
    // });
    this.map.addControl(this.direction, 'top-left');


    // aloglia search API
    const placesAutocomplete = places({
      appId: process.env.REACT_APP_ALGOLIA_APP_ID,
      apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
      container: document.querySelector('#searchContainer'),
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({ lat: position.coords.latitude, lng: position.coords.longitude });
      });
    }
    // handleChange of input
    placesAutocomplete.on('change', (e) => {
      new mapboxgl.Marker()
        .setLngLat([e.suggestion.latlng.lng, e.suggestion.latlng.lat])
        .addTo(this.map);
    });

    this.onPositionChangeHandler();
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.remove();
    }
    // clear timer
    clearInterval(this.interval);
  }

  // position check handler
  onPositionDisplayHandler = (ambulances) => {
    if (this.map) {
      // for (const ambulance of ambulances) {
      //   // create popup
      //   const popup = new mapboxgl.Popup({ closeOnClick: false }).setText(ambulance.name);
      //   // create Marker
      //   new mapboxgl.Marker()
      //     .setLngLat([ambulance.location.lon, ambulance.location.lat])
      //     .setPopup(popup)
      //     .addTo(this.map);
      // }
    }
  }

  onPositionChangeHandler = () => {
    // use watchPoisition of navigator later
    // for now we are just simulating the movements of users
    this.interval = setInterval(() => {
      this.setState(prevState => ({ lng: 0.001 + (+prevState.lng), lat: 0.001 + (+prevState.lat) }));
      this.direction.actions.setDestinationFromCoordinates([this.state.destination.lng, this.state.destination.lat]);
      this.direction.actions.setOriginFromCoordinates([this.state.lng, this.state.lat]);
    }, 5000);
  }

  render() {
    const { ambulances } = this.props.ambulances;
    if (ambulances.length) {
      const inMission = ambulances.filter(ambulance => ambulance.inMission);
      this.onPositionDisplayHandler(inMission);
    }
    return (
      <Card header="Map des ambulances: ">
        <Row>
          <Col xs={12}>
            <input
              type="search"
              id="searchContainer"
              placeholder="Rechercher..."
            />
            <div
              style={{ height: '70vh', width: '100%', top: 10, bottom: 0 }}
              id="map"
            />
          </Col>
        </Row>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  ambulances: state.ambulance,
});
export default connect(mapStateToProps, { getAmbulances })(Map);
