import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { MapView, Location, Permissions } from "expo";
import List from "./ListComponent";
import MarkerList from "./MarkerList";
import RestaurantModal from "./modal";

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      initial: true,
      restaurants: null,
      pagetoken: null,
      locationChange: null
    };
  }

  componentWillMount = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    let location = await Location.getCurrentPositionAsync({}, pos => {}).then(
      pos => {
        this.getPlaces(pos.coords.latitude, pos.coords.longitude, 0.005);
        this.setState({ location: pos });
      }
    );
  };

  handleButtonClick = async moved => {
    //|| !this.state.page token below, might be useful?
    if (moved) {
      await this.setState({
        location: this.state.locationChange,
        initial: true
      });
      this.props.triggerLogoChange(false);
      this.getPlaces(
        this.state.location.coords.latitude,
        this.state.location.coords.longitude,
        this.state.location.coords.latitudeDelta
      );
    } else {
      this.getPlaces(
        this.state.location.coords.latitude,
        this.state.location.coords.longitude,
        this.state.location.coords.latitudeDelta,
        this.state.pagetoken
      );
    }
  };

  getPlaces = async (lat, long, delta, pagetoken) => {
    if (!delta) delta = 0.005;
    if (!pagetoken && this.state.initial) {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
        lat
      },${long}&radius=${delta *
        50000}&type=restaurant&key=AIzaSyCDpYpbNtmuNr3SMNtuDZDfjaYFdE7tVkk`;
      fetch(url, { method: "GET" })
        .then(data => data.json())
        .then(data => {
          this.setState({
            restaurants: data,
            pagetoken: data.next_page_token,
            initial: false
          });
        });
    } else {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
        lat
      },${long}&radius=${delta * 50000}&pagetoken=${
        pagetoken
      }&type=restaurant&key=AIzaSyCDpYpbNtmuNr3SMNtuDZDfjaYFdE7tVkk`;
      fetch(url, { method: "GET" })
        .then(data => data.json())
        .then(data => {
          if (data.results.length !== 0) {
            let old = this.state.restaurants.results;
            this.setState({
              restaurants: { results: [...old, ...data.results] },
              pagetoken: data.next_page_token
            });
          } else {
            this.props.triggerLogoChange(false, true);
          }
        });
    }
  };

  handleRegionChangeComplete = async e => {
    const pos = this.state.location;
    if (
      Math.floor(pos.coords.latitude * 500) !== Math.floor(e.latitude * 500) ||
      Math.floor(pos.coords.longitude * 500) !== Math.floor(e.longitude * 500)
    ) {
      this.props.triggerLogoChange(true);
      this.setState({ locationChange: { coords: e } });
    } else {
      this.props.triggerLogoChange(false);
    }
  };
  handelMarkerPress = id => {
    this.refs.modal.getId(id);
    this.refs.modal.refs.modal1.open();
  };
  renderMapOrList() {
    if (this.props.renderWhat === true) {
      return (
        <MapView
          provider="google"
          style={styles.map}
          initialRegion={{
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
          onRegionChangeComplete={this.handleRegionChangeComplete.bind(this)}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <MarkerList
            restaurants={this.state.restaurants}
            handelMarkerPress={this.handelMarkerPress}
          />
        </MapView>
      );
    } else {
      return (
        <List
          restaurants={this.state.restaurants}
          location={this.state.location}
          handelPress={this.handelMarkerPress}
        />
      );
    }
  }
  // final render --------------------------------------------------------------
  render() {
    console.log(this.state.location);
    let map = this.state.location ? (
      this.renderMapOrList()
    ) : (
      <Text> Loading </Text>
    );
    return (
      <View style={styles.container}>
        {map}
        <RestaurantModal ref={"modal"} triggerModal={this.props.triggerModal} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%"
  },
  map: {
    flex: 1,
    alignSelf: "flex-end",
    width: "100%",
    height: "100%"
  },
  loader: {
    flex: 1,
    alignSelf: "stretch"
  },
  list: {
    flex: 1,
    width: "100%",
    paddingTop: 100
  }
});
