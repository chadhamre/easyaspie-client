import React, { Component } from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

import PercentageCircle from 'react-native-percentage-circle';


export default class Ratings extends Component {

  renderIcons () {
    let providers = Object.keys(this.props.ratings.ratings);
    return providers.map((el, i) => {
      if (el === "facebook"){
        return (
          <View key={i}>
          <Image style={{width: 35, height: 35, marginLeft: 6}} source={{uri: 'https://facebookbrand.com/wp-content/themes/fb-branding/prj-fb-branding/assets/images/fb-art.png'}}/>
          </View>
        )
      }
      if (el === "foursquare"){
        return (
          <View key={i}>
          <Image style={{width: 35, height: 35, marginLeft: 6}} source={{uri: 'https://images.vexels.com/media/users/3/137279/isolated/preview/e489b2b3639a9179cf9caa168ca24911-foursquare-icon-logo-by-vexels.png'}}/>
          </View>
        )
      }
      if (el === "google"){
        return (
          <View key={i}>
          <Image style={{width: 35, height: 35, marginLeft: 6}} source={{uri: 'https://avatars2.githubusercontent.com/u/12502296?s=400&v=4'}}/>
          </View>
        )
      }
      if (el === "happycow"){
        return (
          <View key={i}>
          <Image style={{width: 35, height: 35, marginLeft: 6}} source={{uri: 'https://www.worldwideinsure.com/travel-blog/wp-content/uploads/2016/02/happy-cow-logo.png'}}/>
          </View>
        )
      }
      if (el === "tripadvisor"){
        return (
          <View key={i}>
          <Image style={{width: 35, height: 35, marginLeft: 6}} source={{uri: 'http://www.ritmanlibrary.com/wp-content/uploads/2015/06/tripadvisor.png'}}/>
          </View>
        )
      }
      if (el === "yelp"){
        return (
          <View key={i}>
          <Image style={{width: 30, height: 30, marginLeft: 6}} source={{uri: 'https://s3-media2.fl.yelpcdn.com/assets/srv0/styleguide/1ea40efd80f5/assets/img/brand_guidelines/yelp_fullcolor.png'}}/>
          </View>
        )
      }


    })

  }

  render() {
    return (
      <View style={styles.ratingsList}>
        <View style={styles.sources}>
          <Text style={styles.title}>Our sources</Text>
            <View style={styles.logos}>
              {this.renderIcons()}
            </View>
        </View>
        <View style={styles.rating}>
          <Text style={styles.title}>Easy as pie rating</Text>
          <PercentageCircle  style={styles.roundthingy} radius={50} borderWidth={7} percent={this.props.ratings.rating} color={"#5C91CA"}>
              <Text style={styles.easyRatingNumber}>{this.props.ratings.rating / 10}</Text>
          </PercentageCircle>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  roundthingy: {
    marginTop: 12
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'raleway-blackitalic',
    marginBottom: 12
  },
  rating: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24

  },
  sources: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 24
  },
  ratingsList: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  easyRating: {
    fontSize: 24
  },
  easyRatingNumber: {
    color: '#5C91CA',
    fontSize: 30,
    fontFamily: 'raleway-blackitalic',
    marginBottom: 8
  },
  logos: {
    flexDirection: 'row',
    paddingHorizontal: 2,
    marginBottom: 12
  }
});
