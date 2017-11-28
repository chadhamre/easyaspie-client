import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import Button from 'react-native-button';
import { MapView, Font } from 'expo';

import Landing from './components/LandingComponent.js'
import RestaurantModal from './components/modal'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bool: false,
      fontLoaded: false,
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      'raleway': require('./assets/fonts/Raleway/Raleway-Regular.ttf')
    })
    this.setState({fontLoaded: true});
  }

  triggerLogoChange = (bool, end) => {
    this.setState({bool, end})
  }
  triggerRerender = () => {
    this.refs.map.handleButtonClick(this.state.bool);
  }
  renderLogo(bool, end){
    let text;
    if (bool) {
      text = 'Search This Area'
    } else if (end) {
      text = 'No More Results';
    } else {
      text = 'Load More Restaurants'
    }
    //IF BROKEN, check text below
    return ((this.state.fontLoaded && text)
      ? <View style={styles.image_text_container}>
          {/* <Image style={styles.logo}
                source={require('./assets/logo__easyaspie.png')}
          /> */}
          <Text style={styles.text}> {text} </Text>
        </View>
      : <View></View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logocontainer}>
          <TouchableHighlight onPress={this.triggerRerender}>
            {this.renderLogo(this.state.bool, this.state.end)}
          </TouchableHighlight>
        </View>
        <Landing ref='map' triggerLogoChange={this.triggerLogoChange}/>
        <RestaurantModal/>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    height: 85,
    width: 85,
    zIndex: 2,
    // tintColor: 'yellow',
  },
  logocontainer: {
    backgroundColor: '#48B9D0',
    position: 'absolute',
    marginTop: 40,
    zIndex: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: .3,
    borderRadius: 20,
  },
  image_text_container: {
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  text: {
    color: 'white',
    fontFamily: 'raleway',
  }
});
