import React, { Component } from 'react';

import {
  StyleSheet,
  ScrollView,
  View,
  Image,
} from 'react-native';


export default class PhotoList extends Component {

  renderPictures () {
    if (this.props.pictures === undefined) return null;
    console.log("OBJ", this.props.pictures)
    let pics = this.props.pictures;
    return pics.map((pic) => {
      return (
        <View
          // style={{marginTop: 10, width: '100%'}}
          key={pic.uri}>
          <Image
            style={{width: 300, height: 300}}
            source={pic}
          />
        </View>
      )
    })
  }



  render() {
    console.log(this.props.pictures, "here");
    return (

      <View style={styles.scrollview}>
        <ScrollView style={styles.scrollview}>
          {this.renderPictures()}
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  scrollview: {
    height: 400
  },
});
