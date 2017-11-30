import React, { Component } from 'react';

import {View, Button, Text, StyleSheet} from 'react-native';

import { MapView, Location, Permissions }  from 'expo';
import call from 'react-native-phone-call';

import getDirections from 'react-native-google-maps-directions'

export default class GmapsDirections extends Component {
  constructor(props){
    super(props)
    state = {
      location: null
    }
  }

  componentWillMount = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    let location = await Location.getCurrentPositionAsync({}, (pos) => {})
    .then( pos => {
      this.setState({ location: pos })});
  }

  callThePlace = () =>  {
    call({number: `${this.props.phone}`})
  }


  handleGetDirections = () => {
    let ourPositionLat = this.state.location.coords.latitude;
    let ourPositionLon = this.state.location.coords.longitude;
    let restaurantLat = this.props.destination.lat;
    let restaurantLong = this.props.destination.lng;

    const data = {
       source: {
        latitude: ourPositionLat,
        longitude: ourPositionLon
      },
      destination: {
        latitude: restaurantLat,
        longitude: restaurantLong
      },
      params: [
        {
          key: "dirflg",
          value: "w"
        }
      ]
    }

    getDirections(data)
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Button onPress={this.handleGetDirections} title="Get Directions" />
        <Text>WRITING THIS TO SPACE OUT THE BUTTONS</Text>
        <Button onPress={this.callThePlace} title="call the place" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 12
  }
});
