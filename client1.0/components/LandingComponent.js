import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MapView, Location, Permissions }  from 'expo';

import MarkerList from './MarkerList'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      initial: true,
      restaurants: null,
    }
  }

  componentWillMount = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let location = await Location.getCurrentPositionAsync({}, (pos) => {})
    .then( pos => {
      this.getPlaces(pos.coords.latitude, pos.coords.longitude, 0.005)
      this.setState({ location: pos })});
  }

  handleButtonClick = (bool) => {
    if (bool) {
      this.props.triggerLogoChange(false);
      this.getPlaces(this.state.location.coords.latitude, this.state.location.coords.longitude, this.state.location.coords.latitudeDelta);
    } else {
      this.getPlaces(this.state.location.coords.latitude, this.state.location.coords.longitude, this.state.location.coords.latitudeDelta, this.state.restaurants.next_page_token);
    }
  }

  getPlaces = async (lat, long, delta, pagetoken) => {
    console.log(pagetoken)
    if (!pagetoken) {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${delta*50000}&type=restaurant&key=AIzaSyCDpYpbNtmuNr3SMNtuDZDfjaYFdE7tVkk`
      fetch(url, {method: 'GET',})
        .then( data => data.json())
        .then(data => {
          this.setState({restaurants: data})
        })
    } else {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${delta*50000}&pagetoken=${pagetoken}&type=restaurant&key=AIzaSyCDpYpbNtmuNr3SMNtuDZDfjaYFdE7tVkk`
      fetch(url, {method: 'GET',})
        .then( data => data.json())
        .then(data => {
          this.setState({restaurants: data})
        })
    }
  }

  handleRegionChangeComplete = async (e) => {
    const location = await Location.getCurrentPositionAsync( {}, (pos) => {
    }).then(pos => {
      if ((Math.floor(pos.coords.latitude * 500) !== Math.floor(e.latitude * 500)) ||
         (Math.floor(pos.coords.longitude * 500) !== Math.floor(e.longitude * 500))) {
           this.props.triggerLogoChange(true);
           this.setState({location: {coords: e}})
         }
      else {
        this.props.triggerLogoChange(false);
      }
    });
  }
  render() {
    let map = this.state.location ?
        <MapView
          provider="google"
          style={styles.map}
          initialRegion={{
          latitude: this.state.location.coords.latitude,
          longitude: this.state.location.coords.longitude,
          latitudeDelta: .005,
          longitudeDelta: .005
          }}
          onRegionChangeComplete = {this.handleRegionChangeComplete.bind(this)}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <MarkerList restaurants={this.state.restaurants}/>
        </MapView> : <Text> Loading </Text>
    return (
      <View style = {styles.container}>
        {map}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  map: {
    flex: 1,
    alignSelf: 'flex-end',
    width: '100%',
    height: '100%',
  },
  loader: {
    flex: 1,
    alignSelf: 'stretch',
  }
});
