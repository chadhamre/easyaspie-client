import React, { Component } from 'react';
import Button from 'react-native-button';
import Modal from 'react-native-modalbox';

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

var screen = Dimensions.get('window');

export default class RestaurantModal extends React.Component {

  constructor() {
    super();
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
      restaurantInfo: {},
    };
  }

  componentDidMount () {
    this.getRestaurant()
  }

  getRestaurant (data) {
   fetch('https://easy-as-pie-api.herokuapp.com/api/v1/places/ChIJuT9kTBKjpBIRNSy1Grt_ge4', {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json'
     }
   })
   .then(data => data.json())
   .then(data => {
     this.setState({restaurantInfo: data});
   })
  }


  render() {

    return (
      <View style={styles.wrapper}>
        <Button onPress={() => this.refs.modal1.open()} style={styles.btn}>ID TAP THAT</Button>
        <Modal
          style={[styles.modal]}
          ref={"modal1"}
          swipeToClose={this.state.swipeToClose}
          onClosed={this.onClose}
          swipeArea={300}
          onOpened={this.onOpen}
          onClosingState={this.onClosingState}>
  {/* ///////////////////////////MODAL LAYOUT STARTS HERE///////////////////////// */}
            {/* Restaurant bestPhoto */}
          <View style={styles.image__wrapper}>
            <Image style={styles.image}
              source={{uri: this.state.restaurantInfo.bestPhoto}}
            />
          </View>
          {/* Restaurant Information */}
          <View style={styles.infoList}>
            <Text style={styles.title}>{this.state.restaurantInfo.name}</Text>
            <Text style={styles.title}>{this.state.restaurantInfo.address}</Text>
          </View>
              {/* Restaurant Ratings */}
          <View style={styles.ratingsList}>
            <Text style={styles.easyRating}> EasyAsPie Rating: {this.state.restaurantInfo.rating}</Text>
          </View>
            {/* List of photos component */}
          <PhotoList
            pictures={this.state.restaurantInfo.photos}
          />
        </Modal>
      </View>
    );
  }

}



const styles = StyleSheet.create({

  wrapper: {
    paddingTop: 50,
    flex: 1
  },
  modal: {
    alignItems: 'center',
    backgroundColor: 'aquamarine'
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

  title: {
    fontSize: 16,
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
    alignItems: 'center'
  },
  easyRating: {
    fontSize: 24
  },
  infoList: {
    flexDirection: 'column',
    backgroundColor: 'lime',
    alignItems: 'center',
    flexWrap: 'nowrap'
  },
  image__wrapper: {
    position: 'relative',
    overflow: 'hidden',
    alignSelf: 'flex-start',
    height: 300,
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
