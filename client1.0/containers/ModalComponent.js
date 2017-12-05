import React, { Component } from "react";
import Button from "react-native-button";
import Modal from "react-native-modalbox";
import { LinearGradient } from "expo";
import Icon from "react-native-vector-icons/Ionicons";
import { GOOGLE_PLACES_API_KEY } from "react-native-dotenv";

import Ratings from "../components/Ratings";
import Timetable from "../components/Timetable";
import GmapsDirections from "../components/Actions";
import PhotoList from "../components/PhotoList";
import Price from "../components/Price";
import Categories from "../components/Categories";
import OpenNow from "../components/OpenNow";

import {
  Slider,
  AppRegistry,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TextInput,
  Image,
  TouchableHighlight
} from "react-native";

import * as Animatable from "react-native-animatable";

var screen = Dimensions.get("window");

export default class RestaurantModal extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
      restaurantInfo: null,
      id: null,
      open: false
    };
  }

  onOpened = () => {
    this.props.triggerModal();
    this.getRestaurant(this.state.id);
  };
  onClosed = () => {
    this.setState({ restaurantInfo: null });
    this.props.triggerModal();
  };
  getId = (id, open) => {
    this.setState({ id, open });
  };

  getRestaurant(id) {
    fetch(`https://easy-as-pie-api.herokuapp.com/api/v1/places/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => {
        if (data.ok) {
          return data.json();
        } else {
          return placeHolderData;
        }
      })
      .then(data => {
        this.setState({ restaurantInfo: data });
      });
  }

  getModalPhoto(data) {
    if (
      data.google_photos &&
      data.google_photos.length > 0 &&
      data.google_photos[0]
    ) {
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
        data.google_photos[0].photo_reference
      }&key=${GOOGLE_PLACES_API_KEY}`;
    }
    if (data.bestPhoto) return data.bestPhoto;
    if (data.cover) return data.cover;
    return "http://chcdigital.com/wp-content/uploads/2015/02/Screen-Shot-2015-02-09-at-5.49.57.png";
  }

  getPhotoList(data) {
    if (data.photos && data.photos.length > 3) return data.photos;
    if (data.google_photos.length > 0) {
      let photosArray = [];
      data.google_photos.forEach(item =>
        photosArray.push({
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
            item.photo_reference
          }&key=${GOOGLE_PLACES_API_KEY}`
        })
      );
      return photosArray;
    }
  }

  renderModal = () => {
    return this.state.restaurantInfo ? (
      <View style={styles.main__wrapper}>
        <View style={styles.image__wrapper}>
          <Image
            style={styles.image}
            source={{
              uri: this.getModalPhoto(this.state.restaurantInfo)
            }}
          />
          <LinearGradient
            colors={["rgba(0,0,0,0.0)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.8)"]}
            style={styles.infoList}
          >
            <Text style={styles.title}>{this.state.restaurantInfo.name}</Text>
            <Text style={styles.address}>
              {this.state.restaurantInfo.address}
            </Text>
          </LinearGradient>
        </View>
        <ScrollView style={styles.scrollview}>
          <OpenNow open={this.state.open} />
          <Ratings ratings={this.state.restaurantInfo} />
          <Price price={this.state.restaurantInfo.price} />
          <Categories categories={this.state.restaurantInfo.categories} />
          <View>
            <GmapsDirections
              phone={this.state.restaurantInfo.phone}
              destination={this.state.restaurantInfo.location}
            />
          </View>
          {/* <Timetable hours={this.state.restaurantInfo.hours} /> */}
          {/* List of photos component */}
          <PhotoList pictures={this.getPhotoList(this.state.restaurantInfo)} />
        </ScrollView>
      </View>
    ) : (
      <View style={styles.loader__wrap}>
        <Animatable.View
          animation={{
            0: {
              opacity: 1,
              bottom: 0
            },
            1: {
              opacity: 0,
              bottom: 10
            }
          }}
          iterationCount="infinite"
          direction="alternate"
        >
          <Image
            style={styles.loader__image__smoke}
            source={require("../assets/loader_smoke.png")}
          />
        </Animatable.View>
        <Image
          style={styles.loader__image}
          source={require("../assets/loader_pie.png")}
        />
        <Text style={styles.loader__text}>baking ...</Text>
      </View>
    );
  };

  render() {
    return (
      <Modal
        style={styles.modal}
        ref={"modal1"}
        swipeToClose={this.state.swipeToClose}
        onClosed={this.onClosed}
        swipeArea={250}
        onOpened={this.onOpened}
        onClosingState={this.onClosingState}
      >
        {this.renderModal()}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  loader__wrap: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  loader__image: {
    width: 150,
    height: 75
  },
  loader__image__smoke: {
    width: 30,
    height: 29,
    marginBottom: 6
  },
  loader__text: {
    marginTop: 12,
    fontFamily: "raleway",
    color: "#4eb9ce"
  },
  easyRatingNumber: {
    color: "#5C91CA",
    fontSize: 15,
    paddingTop: 6,
    fontFamily: "raleway-blackitalic"
  },
  infoList: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingTop: 36,
    paddingBottom: 12,
    paddingHorizontal: 12
  },
  title: {
    color: "#fff",
    backgroundColor: "transparent",
    fontSize: 25,
    // fontFamily: 'raleway'
    fontFamily: "raleway-blackitalic"
  },
  address: {
    color: "#fff",
    backgroundColor: "transparent",
    fontFamily: "raleway"
  },
  infoListAddress: {
    backgroundColor: "#3B5998"
  },
  scrollview: {
    height: 400,
    width: "100%"
  },
  modal: {
    flex: 1,
    alignItems: "center",
    position: "absolute",
    zIndex: 3
  },
  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },
  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },
  text: {
    color: "black",
    fontSize: 22
  },
  modalButton: {
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    color: "white"
  },
  button__wrapper: {
    alignItems: "center",
    justifyContent: "center"
  },
  image__wrapper: {
    position: "relative",
    overflow: "hidden",
    alignSelf: "flex-start",
    height: "35%",
    width: "100%",
    borderBottomWidth: 5,
    borderBottomColor: "#FFF"
  },
  main__wrapper: {
    height: "100%",
    width: "100%"
  },
  image: {
    position: "absolute",
    maxHeight: 300,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

const placeHolderData = {
  address: "Not Available!",
  bestPhoto:
    "https://memegenerator.net/img/instances/500x/67453856/you-know-what-really-grinds-our-gears-too-muchtoo-little-information.jpg",
  categories: ["none"],
  counts: {},
  hours: ["never"],
  location: {
    lat: 0,
    lng: 0
  },
  name: "Unknown",
  names: {
    foursquare: "",
    google: ""
  },
  phone: "+66 66 66 66",
  photos: [
    {
      checkin: {
        createdAt: 0,
        id: "0",
        timeZoneOffset: 0,
        type: "none"
      },
      suffix: "/12013472_j0-aWZubfISESmExbsVFpBWX8GMUupXDghjVJj70Duc.jpg",
      user: {
        firstName: "Dan",
        gender: "male",
        id: "12013472",
        lastName: "Ciocoiu",
        photo: {
          prefix: "https://igx.4sqi.net/img/user/",
          suffix: "/ZQJNY12VTHWG4D1M.jpg"
        }
      },
      width: 720
    }
  ],
  place_id: "None",
  price: 0,
  prices: {
    foursquare: 9999
  },
  rating: 11,
  ratings: {
    google: 0
  }
};
