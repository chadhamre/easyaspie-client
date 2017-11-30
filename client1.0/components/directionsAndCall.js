import React, { Component } from 'react';

import {View, Image, TouchableOpacity, Button, Text, StyleSheet} from 'react-native';

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
        <TouchableOpacity style={styles.opacities} onPress={this.callThePlace}>
          <Image source={{uri: 'http://freevector.co/wp-content/uploads/2011/01/88447-phone-call.png'}}  style={{width: 50, height: 50}}/>
          <Text>Call Now!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.opacities} onPress={this.handleGetDirections}>
          <Image source={{uri: 'https://lh3.googleusercontent.com/58TrfmPMd69WnW6hVs5LJALlfUsATZogysNg7ck8jNIPfeOBu4mtEXfz79pLsoU64Zg=w300'}}  style={{width: 50, height: 50}}/>
          <Text>Get Directions</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  opacities: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
