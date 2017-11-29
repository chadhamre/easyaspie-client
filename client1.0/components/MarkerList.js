import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MapView, Location, Permissions }  from 'expo';

export default class MarkerList extends React.Component {
  render() {
    let list = this.props.restaurants ?
      this.props.restaurants.results.map(el => {
        let latlong = {latitude: el.geometry.location.lat, longitude: el.geometry.location.lng};
        if(el.opening_hours && el.opening_hours.open_now) {
          description = 'Open Now!'
        } else if (el.opening_hours) {
          description = 'Closed!'
        }
        return (
          <MapView.Marker
          identifier={el.place_id}
          key={el.id}
          title={el.name}
          coordinate={latlong}
          pinColor='fuchsia'
          onPress={(e) => this.showCallout}
          >
            <MapView.Callout
              style={{width: 100}}
              onPress={(e) => this.props.handelMarkerPress(e)}
            >
              <Text>{el.name}</Text>
              <Text>{description}</Text>
            </MapView.Callout>
          </MapView.Marker>
        )
      }) : <View></View>
    return (
        list
    )
  }
}
