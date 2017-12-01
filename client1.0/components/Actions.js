import React, { Component } from "react";

import {
  View,
  Image,
  TouchableOpacity,
  Button,
  Text,
  StyleSheet
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

import { MapView, Location, Permissions } from "expo";
import call from "react-native-phone-call";

import getDirections from "react-native-google-maps-directions";

export default class GmapsDirections extends Component {
  constructor(props) {
    super(props);
    state = {
      location: null
    };
  }

  componentWillMount = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    let location = await Location.getCurrentPositionAsync({}, pos => {}).then(
      pos => {
        this.setState({ location: pos });
      }
    );
  };

  callThePlace = () => {
    call({ number: `${this.props.phone}` });
  };

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
    };

    getDirections(data);
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.opacities} onPress={this.callThePlace}>
          <Icon
            name="ios-call"
            size={30}
            style={{
              paddingRight: 10,
              color: "grey",
              backgroundColor: "transparent"
            }}
          />
          <Text>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.opacities}
          onPress={this.handleGetDirections}
        >
          <Icon
            name="ios-map"
            size={30}
            style={{
              paddingRight: 10,
              color: "grey",
              backgroundColor: "transparent"
            }}
          />
          <Text>Directions</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#e9e9e9",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    padding: 10
  },
  opacities: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    margin: 5,
    backgroundColor: "white",
    width: "45%",
    borderColor: "#888888",
    borderWidth: 1
  }
});
