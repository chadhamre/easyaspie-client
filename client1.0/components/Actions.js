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
        <View style={styles.container}>
        <View style={styles.first}>
        <TouchableOpacity style={styles.opacities} onPress={this.callThePlace}>
          <Icon
            name="ios-call"
            size={30}
            style={{
              // paddingRight: 10,
              color: "black",
              backgroundColor: "transparent"
            }}
          />

        </TouchableOpacity>
        </View>
        <View style={styles.second}>
        <TouchableOpacity
          style={styles.opacities}
          onPress={this.handleGetDirections}
        >
          <Icon
            name="ios-navigate-outline"
            size={30}
            style={{
              // paddingRight: 10,
              color: "black",
              backgroundColor: "transparent"
            }}
          />

        </TouchableOpacity>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  first: {
    justifyContent: "space-around",
    alignItems: "center",
    width: "50%",
    borderStyle: "solid",
    borderRightWidth: 2,
    borderColor: "#48B9D0"
  },
  second: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "50%"
  },
  container: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#48B9D0",
    borderRadius: 5,
    flexDirection: "row",
    width: "80%",
    height: "100%",
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 5,
    shadowOpacity: 0.3
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 20,

  },
  opacities: {
    flexDirection: "row",
    alignItems: "center"
  }
  // opacities: {
  //   flexDirection: "row",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   width: "50%"
  //   // borderColor: "#4eb9ce",
  //   // borderWidth: 2,
  //   // borderRadius: 5
  // }
});
