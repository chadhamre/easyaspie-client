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
          key={el.name}
          title={el.name}
          coordinate={latlong}
          pinColor='fuchsia'
          />
        )
      }) : <View></View>
    return (
        list
    )
  }
}