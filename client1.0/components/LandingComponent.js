import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MapView, Location, Permissions }  from 'expo';

import MarkerList from './MarkerList'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      restaurants: null,
    }
  }

  componentWillMount() {
    this.getLocation();
    this.getPlaces();
  }


  getLocation = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let location = await Location.watchPositionAsync({}, (pos) => {
      this.setState({ location: pos });
    }).then(this.getPlaces())
  }
  getPlaces = async () => {
    //DO MULTIPLE CALLS FOR THE PLACES, TRIANGLE
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41.39502262758671,2.1979764103889465&radius=1000&type=restaurant&key=AIzaSyCDpYpbNtmuNr3SMNtuDZDfjaYFdE7tVkk`
    fetch(url, {method: 'GET',})
      .then( data => data.json())
      .then(data => {
        this.setState({restaurants: data})
      })
  }

  handleRegionChangeComplete(e) {
    setTimeout(() =>console.log('changed', e), 3000);
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
          onRegionChangeComplete = {this.handleRegionChangeComplete}
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
