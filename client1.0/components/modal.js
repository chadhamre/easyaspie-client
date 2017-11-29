import React, { Component } from 'react';
import Button from 'react-native-button';
import Modal from 'react-native-modalbox';
import {LinearGradient} from 'expo';

import PhotoList from './photoList';

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
  TouchableHighlight,
} from 'react-native';

import * as Animatable from 'react-native-animatable';


var screen = Dimensions.get('window');

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
    };
  }

  onOpened = () => {
    this.props.triggerModal();
    this.getRestaurant(this.state.id);
  }
  onClosed = () => {
    this.setState({restaurantInfo: null})
    this.props.triggerModal();
  }
  getId = (id) => {
    this.setState({id});
  }
  // fetch(`http://192.168.0.83:4000/api/v1/places/${id}`
  // fetch(`https://easy-as-pie-api.herokuapp.com/api/v1/places/${id}`
  getRestaurant (id) {
    console.log('getRest', id);
    fetch(`https://easy-as-pie-api.herokuapp.com/api/v1/places/${id}` ,{
    method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(data => {
        if (data.ok) {
          return data.json();
        }
        else {
          return placeHolderData;
        }
      })
      .then(data => {
        this.setState({restaurantInfo: data});
      })
  }

  renderModal = () => {
    return (
      this.state.restaurantInfo
      ?
      <View style={styles.main__wrapper}>
        <View style={styles.image__wrapper}>
          <Image style={styles.image}
            source={{uri: this.state.restaurantInfo.bestPhoto === null ?
              "http://chcdigital.com/wp-content/uploads/2015/02/Screen-Shot-2015-02-09-at-10.49.57.png" :
              this.state.restaurantInfo.bestPhoto}}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']}
            style={styles.infoList}>
            <Text style={styles.title}>{this.state.restaurantInfo.name}</Text>
            <Text style={styles.address}>{this.state.restaurantInfo.address}</Text>
          </LinearGradient>
        </View>
        <ScrollView style={styles.scrollview}>
          <View style={styles.ratingsList}>
            <Text style={styles.easyRating}> Easy as pie rating:</Text>
            <Text style={styles.easyRatingNumber}>{this.state.restaurantInfo.rating}</Text>
          </View>
            {/* List of photos component */}
          <PhotoList
            pictures={this.state.restaurantInfo.photos}
          />
        </ScrollView>
      </View>
      :
      <View style={styles.loader__wrap}>
        <Animatable.View
          animation={{
            0: {
              opacity: 1,
              bottom: 0,
            },
            1: {
              opacity: 0,
              bottom: 10,
            },
          }}
          iterationCount="infinite"
          direction="alternate">
          <Image style={styles.loader__image__smoke} source={require('../assets/loader_smoke.png')}/>
        </Animatable.View>
        <Image style={styles.loader__image} source={require('../assets/loader_pie.png')}/>
        <Text style={styles.loader__text}>Baking ...</Text>
      </View>
    )
  }

  render() {

    return (
        <Modal
          style={styles.modal}
          ref={"modal1"}
          swipeToClose={this.state.swipeToClose}
          onClosed={this.onClosed}
          swipeArea={250}
          onOpened={this.onOpened}
          onClosingState={this.onClosingState}>
          {this.renderModal()}
        </Modal>
    );
  }

}

const styles = StyleSheet.create({
  loader__wrap: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  loader__image: {
    width: 150,
    height: 75,
  },
  loader__image__smoke: {
    width: 30,
    height: 29,
    marginBottom: 6,
  },
  loader__text: {
    marginTop: 12,
    fontFamily: "raleway"
  },
  easyRatingNumber: {
    color: '#5C91CA',
    fontSize: 30,
    paddingTop: 6,
    fontFamily: 'raleway-blackitalic'
  },
  infoList: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: 36,
    paddingBottom: 12,
    paddingHorizontal: 12
  },
  title: {
    color: "#fff",
    backgroundColor: 'transparent',
    fontSize: 25,
    // fontFamily: 'raleway'
    fontFamily: 'raleway-blackitalic'
  },
  address: {
    color: "#fff",
    backgroundColor: 'transparent',
    fontFamily: 'raleway',
  },
  infoListAddress: {
    backgroundColor: "#3B5998",
  },
  scrollview: {
    height: 400,
    width: '100%'
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    zIndex: 3,
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
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    color: 'white'
  },
  button__wrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  ratingsList: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 36,
  },
  easyRating: {
    fontSize: 24
  },
  image__wrapper: {
    position: 'relative',
    overflow: 'hidden',
    alignSelf: 'flex-start',
    height: '35%',
    width: '100%',
    borderBottomWidth: 5,
    borderBottomColor: '#FFF',
  },
  main__wrapper: {
    height: '100%',
    width: '100%',
  },
  image: {
    position: 'absolute',
    maxHeight: 300,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
});

const placeHolderData = {
    "address": "Not Available!",
    "bestPhoto": "https://memegenerator.net/img/instances/500x/67453856/you-know-what-really-grinds-our-gears-too-muchtoo-little-information.jpg",
    "categories": [
      "none",
    ],
    "counts": {},
    "hours": [
      "never",
    ],
    "location": {
      "lat": 0,
      "lng": 0,
    },
    "name": "Unknown",
    "names": {
      "foursquare": "",
      "google": "",
    },
    "phone": "+66 66 66 66",
    "photos": [
      {
        "checkin": {
          "createdAt": 0,
          "id": "0",
          "timeZoneOffset": 0,
          "type": "none",
        },
        "suffix": "/12013472_j0-aWZubfISESmExbsVFpBWX8GMUupXDghjVJj70Duc.jpg",
        "user": {
          "firstName": "Dan",
          "gender": "male",
          "id": "12013472",
          "lastName": "Ciocoiu",
          "photo": {
            "prefix": "https://igx.4sqi.net/img/user/",
            "suffix": "/ZQJNY12VTHWG4D1M.jpg",
          },
        },
        "width": 720,
      },
    ],
    "place_id": "None",
    "price": 0,
    "prices": {
      "foursquare": 9999,
    },
    "rating": 11,
    "ratings": {
      "google": 0,
    },
  }
