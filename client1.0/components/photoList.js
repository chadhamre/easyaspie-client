import React, { Component } from 'react';

import {
  StyleSheet,
  ScrollView,
  View,
  Image,
} from 'react-native';


export default class PhotoList extends Component {

  renderPictures () {
    if (!this.props.pictures) return null;
    let pics = this.props.pictures.slice(1,21);
    return pics.map((pic) => {
      return (
        <View
          // style={{marginTop: 10, width: '100%'}}
          key={pic.uri}>
          <Image
            style={styles.listImage}
            source={pic}
          />
        </View>
      )
    })
  }



  render() {
    return (
      <View>
        {this.renderPictures()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listImage: {
    width: '100%',
    height: 300,
    marginTop: 6,
  },
});
