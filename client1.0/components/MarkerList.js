import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MapView, Location, Permissions }  from 'expo';

export default class MarkerList extends React.Component {
  render() {
    let list = this.props.restaurants ?
      this.props.restaurants.results.map(el => {
        let latlong = {latitude: el.geometry.location.lat, longitude: el.geometry.location.lng};
        return (
          <MapView.Marker
          key={el.id}
          title={el.name}
          coordinate={latlong}
          pinColor='fuchsia'
          /* onPress={() => console.log(this.props.key)} */
          />
        )
      }) : <View></View>
    return (
        list
    )
  }
}