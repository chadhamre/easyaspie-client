import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Landing from './components/LandingComponent.js'
import { MapView } from 'expo';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logocontainer}>
          <Image style={styles.logo} source={require('./assets/logo__easyaspie.png')} />
        </View>
        <Landing />
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
  }
});
